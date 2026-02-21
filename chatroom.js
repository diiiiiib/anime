// Chatroom logic: requires Firebase Auth and Firestore

function parseQuery() {
  const qs = location.search.replace(/^\?/, '');
  return Object.fromEntries(qs.split('&').filter(Boolean).map(p => p.split('=').map(decodeURIComponent)));
}

document.addEventListener('DOMContentLoaded', async () => {
  if (window.firebaseReady) await window.firebaseReady;
  const params = parseQuery();
  const chatId = params.conv || params.user || 'global';
  const chatName = params.name || 'الدردشة';
  document.getElementById('chatroom-title').textContent = chatName;
  const messagesWindow = document.getElementById('messages-window');
  const input = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');

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
  let unsubscribe = null;

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

  async function showAuthIfNeeded() {
    const user = await currentUser();
    if (!user) {
      authModal.style.display = 'flex';
      authModal.setAttribute('aria-hidden', 'false');
    } else {
      authModal.style.display = 'none';
      authModal.setAttribute('aria-hidden', 'true');
    }
  }

  // Auth mode state
  let authMode = 'login'; // 'login' or 'register'

  // Handle auth tab switching
  const authTabs = document.querySelectorAll('.auth-tab');
  const registerFields = document.getElementById('register-fields');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (authTabs.length > 0 && registerFields && submitBtn) {
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
      const password = document.getElementById('auth-password').value;
      const displayName = document.getElementById('auth-displayname').value.trim();
      const avatarUrlInput = document.getElementById('auth-avatar-url');
      const avatarUrl = avatarUrlInput && avatarUrlInput.value.trim() ? avatarUrlInput.value.trim() : null;

      if (!email || !password) {
        showAuthError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
        return;
      }

      try {
        if (window.firebaseInitialized && window.firebaseAuth) {
          if (authMode === 'login') {
            // Sign in mode
            try {
              const userCredential = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
              const user = userCredential.user;

              // Save to localStorage
              const localUser = { 
                id: user.uid, 
                name: user.displayName || email.split('@')[0], 
                email: user.email, 
                avatar: user.photoURL || 'https://placehold.co/80x80' 
              };
              localStorage.setItem('kk_user', JSON.stringify(localUser));
              showAuthError('');
              await showAuthIfNeeded();

              // Enable chat inputs
              input.disabled = false;
              input.placeholder = 'اكتب رسالة...';
              sendBtn.disabled = false;

              // Reload the page to start the chat
              location.reload();
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

              await user.updateProfile({ 
                displayName: displayName || email.split('@')[0], 
                photoURL: photoURL 
              });

              await window.firebaseDB.collection('users').doc(user.uid).set({
                name: displayName || email.split('@')[0],
                avatar: photoURL || 'https://placehold.co/80x80',
                email: user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });

              const localUser = { 
                id: user.uid, 
                name: displayName || email.split('@')[0], 
                email: user.email, 
                avatar: photoURL || 'https://placehold.co/80x80' 
              };
              localStorage.setItem('kk_user', JSON.stringify(localUser));
              showAuthError('');
              await showAuthIfNeeded();

              input.disabled = false;
              input.placeholder = 'اكتب رسالة...';
              sendBtn.disabled = false;

              location.reload();
            } catch (createErr) {
              console.error('Error creating user:', createErr);
              const code = createErr && createErr.code ? createErr.code : '';

              if (code === 'auth/email-already-in-use') {
                showAuthError('هذا البريد مستخدم مسبقاً. حاول تسجيل الدخول أو استخدام بريد آخر.');
              } else if (code === 'auth/invalid-email') {
                showAuthError('البريد الإلكتروني غير صالح.');
              } else if (code === 'auth/weak-password') {
                showAuthError('كلمة المرور ضعيفة جداً. يرجى استخدام كلمة مرور أقوى.');
              } else {
                showAuthError('خطأ أثناء إنشاء الحساب: ' + (createErr && createErr.message ? createErr.message : createErr));
              }
            }
          }
        } else {
          // Firebase not initialized - show error
          alert('يجب تهيئة Firebase للتسجيل. يرجى التأكد من إعدادات المشروع.');
        }
      } catch (err) {
        console.error('Auth error:', err);
        showAuthError('حدث خطأ: ' + (err.message || err));
      }
    });

    // Avatar preview
    const avatarUrlInputEl = document.getElementById('auth-avatar-url');
    const avatarPreviewEl = document.getElementById('auth-avatar-preview');
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

    // Forgot password
    const forgotBtn = document.getElementById('forgot-password');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', async () => {
        const emailEl = document.getElementById('auth-email');
        const email = emailEl ? emailEl.value.trim() : '';
        if (!email || email.indexOf('@') === -1) {
          alert('الرجاء إدخال بريد صالح في حقل البريد أولاً.');
          return;
        }
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
  }

  // Check if user is logged in
  (async () => {
    const user = await currentUser();
    if (!user) {
      await showAuthIfNeeded();
    // Disable chat inputs until user logs in
    input.disabled = true;
    input.placeholder = 'يجب تسجيل الدخول لإرسال الرسائل';
    sendBtn.disabled = true;
    }
  })();

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

  async function ensureConversationAndListen(convId, chatName, isPublicChat = false) {
    const me = await currentUser();
    if (!me) return;

    if (window.firebaseInitialized && window.firebaseDB) {
      try {
        const convRef = window.firebaseDB.collection('conversations').doc(convId);
        const convDoc = await convRef.get();
        if (!convDoc.exists) {
          // create a minimal conversation doc
          if (isPublicChat) {
            await convRef.set({ 
              type: 'public', 
              name: 'المحادثة العامة',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
              lastMessage: '' 
            });
          } else {
            await convRef.set({ 
              type: 'private',
              participants: [me.id], 
              createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
              lastMessage: '' 
            });
          }
        }

        // Fetch all users data to get avatars
        const usersSnapshot = await window.firebaseDB.collection('users').get();
        const usersData = {};
        usersSnapshot.forEach(doc => {
          usersData[doc.id] = doc.data();
        });

        // listen to messages
        unsubscribe = convRef.collection('messages').orderBy('createdAt').onSnapshot(snap => {
          messagesWindow.innerHTML = '';
          snap.forEach(d => {
            const m = d.data();
            const el = document.createElement('div');
            el.className = 'message ' + (m.authorId === me.id ? 'me' : 'you');

            // Add author name and avatar for all chats
            const isMyMessage = m.authorId === me.id;
            // Get user data from users collection
            const userData = usersData[m.authorId] || {};
            const authorAvatar = (m.authorAvatar && m.authorAvatar !== 'https://placehold.co/40x40') ? m.authorAvatar : (userData.avatar || 'https://placehold.co/40x40');
            const authorNameHtml = isPublicChat || !isMyMessage ? 
              `<div class="message-header">
                ${!isMyMessage ? 
                  `<img src="${authorAvatar}" class="message-avatar" data-author-id="${m.authorId}" />` : 
                  ''
                }
                <div class="message-author">${m.authorName || 'مستخدم'}</div>
              </div>` : '';

            el.innerHTML = `${authorNameHtml}<div class="message-text">${m.text}</div>`;
            messagesWindow.appendChild(el);
          });
          messagesWindow.scrollTop = messagesWindow.scrollHeight;

          // Add click handlers to avatars for profile navigation
          document.querySelectorAll('.message-avatar').forEach(avatar => {
            avatar.addEventListener('click', (e) => {
              e.stopPropagation();
              const authorId = avatar.dataset.authorId;
              if (authorId && authorId !== me.id) {
                // الحصول على بيانات المستخدم من usersData
                const userData = usersData[authorId] || {};
                const authorName = userData.name || 'مستخدم';
                const authorAvatar = userData.avatar || '';
                location.href = `profile.html?user=${encodeURIComponent(authorId)}&name=${encodeURIComponent(authorName)}&avatar=${encodeURIComponent(authorAvatar)}`;
              }
            });
          });
        });
      } catch (err) {
        console.error('Error ensuring conversation or listening for messages:', err);
        if (err.code === 'permission-denied' || err.message && err.message.includes('Missing or insufficient permissions')) {
          alert('خطأ في الصلاحيات: لا يمكن الوصول إلى المحادثة. يرجى التأكد من إعدادات قواعد الأمان في Firebase Console.');
          return;
        }
        alert('خطأ في تحميل المحادثة أو الاستماع للرسائل: ' + (err.message || err));
        return;
      }
    } else {
      // Firebase not initialized - show error
      alert('يجب تهيئة Firebase للتسجيل. يرجى التأكد من إعدادات المشروع.');
    }
  }

  async function sendMessageFirebase(convId, text, isPublicChat = false) {
    const me = await currentUser();
    if (!me) return;
    const convRef = window.firebaseDB.collection('conversations').doc(convId);
    const messagesRef = convRef.collection('messages');
    try {
      await messagesRef.add({ 
        text, 
        authorId: me.id, 
        authorName: me.name, 
        authorAvatar: me.avatar || 'https://placehold.co/40x40',
        createdAt: firebase.firestore.FieldValue.serverTimestamp() 
      });
      const updateData = { lastMessage: text, lastUpdated: firebase.firestore.FieldValue.serverTimestamp() };
      if (isPublicChat) {
        updateData.lastMessageAuthor = me.name;
      }
      await convRef.update(updateData);
    } catch (err) {
      console.error('Error sending message to Firestore:', err);
      if (err.code === 'permission-denied' || err.message && err.message.includes('Missing or insufficient permissions')) {
        alert('خطأ في الصلاحيات: لا يمكن إرسال الرسالة. يرجى التأكد من إعدادات قواعد الأمان في Firebase Console.');
        return;
      }
      alert('فشل إرسال الرسالة: ' + (err.message || err));
    }
  }

  // Decide conversation id: if param conv provided use it; if user param provided compute deterministic conv id
  (async () => {
    const me = await currentUser();
    let convId = null;
    let isPublicChat = false;

    // Check if this is a public chat
    if (params.public === 'true' || params.conv === 'public') {
      convId = 'public_chat';
      isPublicChat = true;
    } else if (params.conv) {
      convId = params.conv;
      // Fetch conversation data to get the other user's name
      if (window.firebaseInitialized && window.firebaseDB) {
        const convRef = window.firebaseDB.collection('conversations').doc(convId);
        const convDoc = await convRef.get();
        if (convDoc.exists) {
          const convData = convDoc.data();
          // Get the other user's ID and name from the conversation
          const otherId = (convData.participants || []).filter(p => p !== me.id)[0];
          if (otherId && convData.names && convData.names[otherId]) {
            params.name = convData.names[otherId];
          }
        }
      }
    } else if (params.user && me) {
      const otherId = params.user;
      const ids = [me.id, otherId].sort();
      convId = 'conv_' + ids.join('_');
      if (window.firebaseInitialized && window.firebaseDB) {
        const convRef = window.firebaseDB.collection('conversations').doc(convId);
        const convDoc = await convRef.get();
        if (!convDoc.exists) {
          const names = {}; const avatars = {};
          names[me.id] = me.name; avatars[me.id] = me.avatar || '';
          names[otherId] = params.name || '';
          await convRef.set({ 
              type: 'private',
              participants: [me.id, otherId], 
              createdAt: firebase.firestore.FieldValue.serverTimestamp(), 
              names, 
              avatars, 
              lastMessage: '' 
            });
        }
      }
    } else {
      convId = chatId; // will be 'global' fallback
    }

    if (convId) {
      const chatName = isPublicChat ? 'المحادثة العامة' : params.name;
      await ensureConversationAndListen(convId, chatName, isPublicChat);
    }

    sendBtn.addEventListener('click', async () => {
      const text = input.value.trim();
      if (!text) return;
      if (window.firebaseInitialized && window.firebaseDB) {
        await sendMessageFirebase(convId, text, isPublicChat);
        input.value = '';
      } else {
        // Firebase not initialized - show error
        alert('يجب تهيئة Firebase للتسجيل. يرجى التأكد من إعدادات المشروع.');
      }
    });

    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendBtn.click(); });
  })();
});
