// Chats UI, auth and Firebase integration with robust error handling

document.addEventListener('DOMContentLoaded', async () => {
  let firebaseInitResult = null;
  if (window.firebaseReady) firebaseInitResult = await window.firebaseReady;
  if (firebaseInitResult && firebaseInitResult.error) {
    console.error('Firebase initialization error:', firebaseInitResult.error);
  }

  // Tabs
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
      const el = document.getElementById(target);
      if (el) el.style.display = 'block';
    });
  });

  // Public chat button
  const joinPublicChatBtn = document.getElementById('join-public-chat');
  if (joinPublicChatBtn) {
    joinPublicChatBtn.addEventListener('click', async () => {
      const me = await currentUser();
      if (!me) {
        alert('يجب تسجيل الدخول أولاً للانضمام للمحادثة العامة');
        await showAuthIfNeeded();
        return;
      }
      location.href = `chatroom.html?public=true&name=${encodeURIComponent('المحادثة العامة')}`;
    });
  }

  // Auth modal elements
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const authErrorEl = document.getElementById('auth-error');

  function showAuthError(msg) {
    try {
      if (authErrorEl) {
        authErrorEl.textContent = msg || '';
        authErrorEl.style.display = msg ? 'block' : 'none';
      } else if (msg) {
        alert(msg);
      }
    } catch (e) { console.warn(e); }
  }

  async function currentUser() {
    // First check localStorage for cached user data
    const cachedUser = localStorage.getItem('kk_user');
    if (cachedUser) {
      try {
        return JSON.parse(cachedUser);
      } catch (e) {
        console.warn('Failed to parse cached user data:', e);
        localStorage.removeItem('kk_user');
      }
    }

    // Then check Firebase Auth
    if (window.firebaseInitialized && window.firebaseAuth && window.firebaseAuth.currentUser) {
      const u = window.firebaseAuth.currentUser;
      let user = { id: u.uid, name: u.displayName || u.email, avatar: u.photoURL };

      // Fetch user data from Firestore to get updated avatar
      if (window.firebaseInitialized && window.firebaseDB) {
        try {
          const userDoc = await window.firebaseDB.collection('users').doc(u.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            user = {
              id: u.uid,
              name: data.name || u.displayName || u.email,
              email: u.email,
              avatar: data.avatar || u.photoURL || 'https://placehold.co/80x80'
            };
            // Cache the updated user data
            try {
              localStorage.setItem('kk_user', JSON.stringify(user));
            } catch (e) { console.warn('Failed to cache user data:', e); }
          }
        } catch (e) {
          console.warn('Failed to fetch user data from Firestore:', e);
        }
      }

      return user;
    }
    return null;
  }

  async function showAuthIfNeeded() {
    const user = await currentUser();
    if (!user) {
      authModal.style.display = 'flex';
      authModal.setAttribute('aria-hidden', 'false');
      // show backend status if init failed
      if (firebaseInitResult && firebaseInitResult.error) {
        let el = document.getElementById('auth-backend-error');
        if (!el) {
          el = document.createElement('div');
          el.id = 'auth-backend-error';
          el.style.cssText = 'background:#fee;border:1px solid #f99;padding:8px;margin:8px 0;color:#900;font-size:14px;';
          el.textContent = 'تحذير: لا يمكن الاتصال بقاعدة البيانات الخارجية الآن. سيتم حفظ الحساب محلياً إذا قمت بالتسجيل.';
          const container = authModal.querySelector('.modal-body') || authModal;
          container.insertBefore(el, container.firstChild);
        }
      }
    } else {
      authModal.style.display = 'none';
      authModal.setAttribute('aria-hidden', 'true');
      await loadChatsAndFriends();
      // after loading chats, check for any pending chat the user attempted to open
      setTimeout(async () => {
        try {
          const pending = sessionStorage.getItem('kk_pending_chat');
          if (pending) {
            const p = JSON.parse(pending);
            sessionStorage.removeItem('kk_pending_chat');
            if (p && p.id) await openChatRoom(p.id, p.name || 'دردشة');
          }
        } catch (e) { console.warn('check pending chat failed', e); }
      }, 200);
    }
  }

  // React to Firebase auth state changes
  if (window.firebaseInitialized && window.firebaseAuth) {
    window.firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        // User is signed in, cache their data
        const userData = { 
          id: user.uid, 
          name: user.displayName || user.email, 
          email: user.email, 
          avatar: user.photoURL 
        };
        try {
          localStorage.setItem('kk_user', JSON.stringify(userData));
        } catch (e) { console.warn('Failed to cache user data:', e); }
      } else {
        // User is signed out, clear cached data
        localStorage.removeItem('kk_user');
      }
      await showAuthIfNeeded();
    });
  }

  // Auth mode state
  let authMode = 'login'; // 'login' or 'register'

  // Handle auth tab switching
  const authTabs = document.querySelectorAll('.auth-tab');
  const registerFields = document.getElementById('register-fields');
  const submitBtn = document.getElementById('auth-submit-btn');

  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      authMode = tab.dataset.mode;

      // Toggle register fields visibility
      if (authMode === 'register') {
        registerFields.style.display = 'block';
        submitBtn.textContent = 'إنشاء حساب';
      } else {
        registerFields.style.display = 'none';
        submitBtn.textContent = 'تسجيل الدخول';
      }

      // Clear any previous errors
      showAuthError('');
    });
  });

  // Auth form handler
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const displayName = document.getElementById('auth-displayname').value.trim();
    const password = document.getElementById('auth-password').value;
    const avatarUrlInput = document.getElementById('auth-avatar-url');
    const avatarUrl = avatarUrlInput && avatarUrlInput.value.trim() ? avatarUrlInput.value.trim() : null;
    const avatarFallback = 'https://placehold.co/80x80';

    // clear previous inline errors
    showAuthError('');

    // simple validation
    if (!password || password.length < 6) {
      showAuthError('كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل.');
      return;
    }

    if (window.firebaseInitialized && window.firebaseAuth && window.firebaseDB) {
      try {
        // require a valid-looking email
        if (!email || email.indexOf('@') === -1) {
          alert('الرجاء إدخال بريد إلكتروني صالح.');
          return;
        }

        if (authMode === 'login') {
          // Sign in mode
          try {
            await window.firebaseAuth.signInWithEmailAndPassword(email, password);

            const signed = window.firebaseAuth.currentUser;
            // persist basic user info locally so account pages show name/avatar even if DB reads fail
            try {
              const local = { id: signed.uid, name: signed.displayName || email.split('@')[0], email: signed.email || email, avatar: signed.photoURL || null };
              localStorage.setItem('kk_user', JSON.stringify(local));
            } catch (e) { console.warn('Failed to write kk_user to localStorage:', e); }

            await showAuthIfNeeded();
          } catch (signInErr) {
            console.error('Sign-in failed:', signInErr);
            const code = signInErr && signInErr.code ? signInErr.code : '';

            if (code === 'auth/user-not-found') {
              showAuthError('المستخدم غير موجود. يرجى إنشاء حساب جديد.');
            } else if (code === 'auth/wrong-password' || code === 'auth/invalid-login-credentials') {
              showAuthError('كلمة المرور غير صحيحة.');
            } else if (code === 'auth/invalid-email') {
              showAuthError('البريد الإلكتروني غير صالح.');
            } else {
              showAuthError('حدث خطأ في تسجيل الدخول: ' + (signInErr && signInErr.message ? signInErr.message : signInErr));
            }
          }
        } else {
          // Register mode
          try {
            const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            let photoURL = null;

            if (avatarUrl) {
              photoURL = avatarUrl;
            }

            await user.updateProfile({ displayName: displayName || email.split('@')[0], photoURL: photoURL });
            await window.firebaseDB.collection('users').doc(user.uid).set({ 
              name: displayName || email.split('@')[0], 
              avatar: photoURL || avatarFallback, 
              email: user.email,
              createdAt: firebase.firestore.FieldValue.serverTimestamp() 
            });
            // persist local fallback copy
            try {
              const local = { id: user.uid, name: displayName || email.split('@')[0], email: user.email || email, avatar: photoURL || avatarFallback };
              localStorage.setItem('kk_user', JSON.stringify(local));
            } catch (e) { console.warn('Failed to write kk_user to localStorage:', e); }

            await showAuthIfNeeded();
          } catch (createErr) {
            console.error('Error creating user or writing user doc:', createErr);
            const code = createErr && createErr.code ? createErr.code : '';

            if (code === 'auth/email-already-in-use') {
              showAuthError('هذا البريد مستخدم مسبقاً. حاول تسجيل الدخول أو استخدام بريد آخر.');
            } else if (code === 'auth/invalid-email') {
              showAuthError('البريد الإلكتروني غير صالح.');
            } else if (code === 'auth/weak-password') {
              showAuthError('كلمة المرور ضعيفة جداً. يرجى استخدام كلمة مرور أقوى.');
            } else {
              showAuthError('خطأ أثناء إنشاء المستخدم: ' + (createErr && createErr.message ? createErr.message : createErr));
            }
          }
        }
      } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء التسجيل/تسجيل الدخول: ' + (err && err.message ? err.message : JSON.stringify(err)));
      }
    } else {
      // Firebase not initialized - show error
      alert('يجب تهيئة Firebase للتسجيل. يرجى التأكد من إعدادات المشروع.');
    }
  });

  // avatar preview
  const avatarUrlInputEl = document.getElementById('auth-avatar-url');
  const avatarPreviewEl = document.getElementById('auth-avatar-preview');
  const forgotBtn = document.getElementById('forgot-password');
  if (forgotBtn) {
    forgotBtn.addEventListener('click', async () => {
      const emailEl = document.getElementById('auth-email');
      const email = emailEl ? emailEl.value.trim() : '';
      if (!email || email.indexOf('@') === -1) { alert('الرجاء إدخال بريد صالح في حقل البريد أولاً.'); return; }
      if (!(window.firebaseInitialized && window.firebaseAuth)) {
        alert('ميزة إعادة الضبط غير متاحة الآن؛ Firebase غير مُهيأ.');
        return;
      }
      try {
        await window.firebaseAuth.sendPasswordResetEmail(email);
        alert('أُرسل رابط إعادة الضبط إلى بريدك. تحقق من صندوق الوارد.');
      } catch (err) {
        console.error('sendPasswordResetEmail failed:', err);
        alert('فشل إرسال رابط إعادة الضبط: ' + (err && err.message ? err.message : err));
      }
    });
  }
  if (avatarUrlInputEl && avatarPreviewEl) {
    avatarUrlInputEl.addEventListener('input', () => {
      const url = avatarUrlInputEl.value.trim();
      if (!url) {
        avatarPreviewEl.src = 'https://placehold.co/80x80';
        return;
      }
      avatarPreviewEl.src = url;
    });
  }

  // Load chats and friends
  async function loadChatsAndFriends() {
    const messagesList = document.querySelector('.messages-list');
    const friendsList = document.querySelector('.friends-list');
    messagesList.innerHTML = '';
    friendsList.innerHTML = '';

    const me = await currentUser();
    const isFirebaseUser = window.firebaseInitialized && window.firebaseAuth && window.firebaseAuth.currentUser;

    if (isFirebaseUser && window.firebaseDB && me && me.id && me.id === window.firebaseAuth.currentUser.uid) {
      try {
        // Test if we can access Firestore
        const testDoc = await window.firebaseDB.collection('users').limit(1).get();
        if (testDoc.empty) {
          // Fall through to local mode
        } else {
          // Load users from Firestore
          const usersSnapshot = await window.firebaseDB.collection('users').get();
          usersSnapshot.forEach(doc => {
            const f = { id: doc.id, ...(doc.data()) };
            if (f.id === me.id) return;
            const item = document.createElement('div');
            item.className = 'friend-item';
            item.style.cursor = 'pointer';
            item.innerHTML = `
              <img src="${f.avatar || 'https://placehold.co/80x80'}" class="friend-avatar" />
              <div class="friend-meta">
                <strong>${f.name || f.displayName || 'مستخدم'}</strong>
                <div class="friend-actions">
                  <button class="btn start-chat" data-id="${f.id}" data-name="${f.name || f.displayName || ''}">بدء المحادثة</button>
                </div>
              </div>
            `;

            // Add click handler for profile navigation
            item.addEventListener('click', (e) => {
              // Don't navigate if clicking on the start-chat button
              if (e.target.classList.contains('start-chat')) {
                e.stopPropagation();
                return;
              }
              // Navigate to profile page
              const userName = f.name || f.displayName || 'مستخدم';
              const userAvatar = f.avatar || '';
              location.href = `profile.html?user=${encodeURIComponent(f.id)}&name=${encodeURIComponent(userName)}&avatar=${encodeURIComponent(userAvatar)}`;
            });

            friendsList.appendChild(item);
          });

          // Load conversations from Firestore and display them in messages list (exclude public chat)
          const convs = await window.firebaseDB.collection('conversations')
            .where('participants', 'array-contains', me.id)
            .get();

          // Fetch all users data to get names and avatars
          // Remove the duplicate declaration and use the existing usersSnapshot
          const usersData = {};
          usersSnapshot.forEach(doc => {
            usersData[doc.id] = doc.data();
          });


          // Store conversations in an array
          const conversationsArray = [];
          convs.forEach(doc => {
            const data = doc.data();
            // Skip public chat
            if (data.type === 'public' || doc.id === 'public_chat') {
              return;
            }
            const otherId = (data.participants || []).filter(p => p !== me.id)[0];
            if (!otherId) {
              return;
            }

            // Get user data from users collection
            const userData = usersData[otherId] || {};
            let otherName = data.names && data.names[otherId] ? data.names[otherId] : (userData.name || userData.displayName || 'مستخدم');
            // إذا كان الاسم هو "مستخدم" أو "اسم المستخدم" و userData.name موجود، استخدم userData.name
            if ((otherName === 'مستخدم' || otherName === 'اسم المستخدم') && userData.name) {
              otherName = userData.name;
            }
            const otherAvatar = data.avatars && data.avatars[otherId] ? data.avatars[otherId] : (userData.avatar || 'https://placehold.co/80x80');

            conversationsArray.push({
              doc,
              data,
              otherId,
              otherName,
              otherAvatar
            });
          });

          // Sort conversations by lastMessage timestamp (if available) or createdAt
          conversationsArray.sort((a, b) => {
            const aTime = a.data.lastUpdated || a.data.lastMessageTime || a.data.createdAt || 0;
            const bTime = b.data.lastUpdated || b.data.lastMessageTime || b.data.createdAt || 0;
            return bTime - aTime; // Descending order (newest first)
          });

          // Display sorted conversations
          conversationsArray.forEach(({ doc, otherName, otherAvatar }) => {
            const data = doc.data();
            const convEl = document.createElement('div');
            convEl.className = 'chat-item';
            convEl.innerHTML = `
              <img src="${otherAvatar}" class="friend-avatar" />
              <div class="friend-meta">
                <strong>${otherName}</strong>
                <div class="friend-actions"><div class="last-msg">${data.lastMessage || ''}</div></div>
              </div>
            `;
            convEl.addEventListener('click', () => { location.href = `chatroom.html?conv=${doc.id}&name=${encodeURIComponent(otherName)}`; });
            messagesList.prepend(convEl);
          });

          // attach start chat buttons
          document.querySelectorAll('.start-chat').forEach(btn => {
            btn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const otherId = btn.dataset.id;
              const otherName = btn.dataset.name;
              const meNow = await currentUser();
              if (!meNow) {
                // save pending chat and prompt for auth
                try { sessionStorage.setItem('kk_pending_chat', JSON.stringify({ id: otherId, name: otherName })); } catch (e) { console.warn(e); }
                await showAuthIfNeeded();
                return;
              }
              await openChatRoom(otherId, otherName);
            });
          });
        }
      } catch (err) {
        console.error('Error loading friends/conversations', err);
        if (err.code === 'permission-denied' || err.message && err.message.includes('Missing or insufficient permissions')) {
          alert('خطأ في الصلاحيات: لا يمكن الوصول إلى قاعدة البيانات. يرجى التأكد من إعدادات قواعد الأمان في Firebase Console.');
          return;
        }
        alert('حدث خطأ أثناء جلب الأصدقاء أو المحادثات: ' + (err.message || err));
      }
      return;
    }

    // No local users - show message for unauthenticated users
    if (!isFirebaseUser || !window.firebaseInitialized || !window.firebaseDB) {
      friendsList.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">يجب تسجيل الدخول لرؤية الأصدقاء</div>';
      messagesList.innerHTML = '<div style="text-align:center;padding:20px;color:#666;">يجب تسجيل الدخول لرؤية المحادثات</div>';
    }
  }

  async function openChatRoom(otherId, otherName) {
    const me = await currentUser();
    const isFirebaseUser = window.firebaseInitialized && window.firebaseAuth && window.firebaseAuth.currentUser && me && me.id === window.firebaseAuth.currentUser.uid;
    if (isFirebaseUser && window.firebaseDB) {
      const ids = [me.id, otherId].sort();
      const convId = 'conv_' + ids.join('_');
      const convRef = window.firebaseDB.collection('conversations').doc(convId);
      const convDoc = await convRef.get();
      const names = {};
      const avatars = {};
      names[me.id] = me.name; avatars[me.id] = me.avatar || '';
      names[otherId] = otherName; avatars[otherId] = '';
      if (!convDoc.exists) {
        try {
          await convRef.set({ 
            type: 'private',
            participants: [me.id, otherId], 
            createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
            names, 
            avatars, 
            lastMessage: '' 
          });
        } catch (err) {
          if (err.code === 'permission-denied' || err.message && err.message.includes('Missing or insufficient permissions')) {
            alert('خطأ في الصلاحيات: لا يمكن إنشاء المحادثة. يرجى التأكد من إعدادات قواعد الأمان في Firebase Console.');
            return;
          }
          alert('خطأ أثناء إنشاء المحادثة: ' + (err.message || err));
        }
      }
      location.href = `chatroom.html?conv=${convId}&name=${encodeURIComponent(otherName)}`;
      return;
    }
    // If user is not signed-in with Firebase, open chatroom in local mode
    location.href = `chatroom.html?user=${encodeURIComponent(otherId)}&name=${encodeURIComponent(otherName)}`;
  }

  // Friend search
  const friendSearch = document.getElementById('friend-search');
  if (friendSearch) {
    friendSearch.addEventListener('input', () => {
      const q = friendSearch.value.trim().toLowerCase();
      document.querySelectorAll('.friend-item').forEach(item => {
        const name = item.querySelector('.friend-meta strong').textContent.toLowerCase();
        item.style.display = name.includes(q) ? '' : 'none';
      });
    });
  }

  // initial
  showAuthIfNeeded();
});
