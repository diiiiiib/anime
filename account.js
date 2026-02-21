document.addEventListener('DOMContentLoaded', async () => {
    if (window.firebaseReady) await window.firebaseReady;
    const avatarEl = document.getElementById('account-avatar');
    const nameEl = document.getElementById('account-name');
    const logoutBtn = document.getElementById('logout');
    const editBtn = document.getElementById('edit-profile');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editNameInput = document.getElementById('edit-name');
    const editAvatarUrl = document.getElementById('edit-avatar-url');
    const editAvatarPreview = document.getElementById('edit-avatar-preview');
    const editCancel = document.getElementById('edit-cancel');

    function getCurrentUser() {
        // Always check localStorage first for local user
        const u = localStorage.getItem('kk_user');
        if (u) {
            return JSON.parse(u);
        }
        // Fallback to Firebase if available
        if (window.firebaseInitialized && window.firebaseAuth) {
            const u = window.firebaseAuth.currentUser;
            if (!u) return null;
            return { id: u.uid, name: u.displayName || u.email, avatar: (u.photoURL || 'https://placehold.co/120x120') };
        }
        return null;
    }

    function render() {
        const u = getCurrentUser();
        const emailEl = document.getElementById('account-email');
        const joinedEl = document.getElementById('account-joined');
        const chatsEl = document.getElementById('account-chats');

        if (!u) {
            nameEl.textContent = 'زائر - قم بتسجيل الدخول';
            avatarEl.src = 'https://placehold.co/120x120';
            if (emailEl) emailEl.textContent = 'user@example.com';
            if (joinedEl) joinedEl.textContent = 'تاريخ التسجيل';
            if (chatsEl) chatsEl.textContent = '0 محادثة';
            logoutBtn.style.display = 'none';
            // Show edit button to allow registration
            if (editBtn) {
                editBtn.style.display = '';
                editBtn.textContent = 'تسجيل الدخول';
            }
            return;
        }

        // If Firebase is available, fetch user doc for richer data
        if (window.firebaseInitialized && window.firebaseDB) {
            window.firebaseDB.collection('users').doc(u.id).get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    nameEl.textContent = data.name || u.name || 'اسم المستخدم';
                    avatarEl.src = data.avatar || u.avatar || 'https://placehold.co/120x120';

                    // Display email
                    if (emailEl && u.email) {
                        emailEl.textContent = u.email;
                    }

                    // Display join date
                    if (joinedEl && data.createdAt) {
                        const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
                        joinedEl.textContent = `انضم في ${date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}`;
                    }

                    // Display chat count (placeholder for now)
                    if (chatsEl) {
                        chatsEl.textContent = '0 محادثة';
                    }
                } else {
                    nameEl.textContent = u.name || 'اسم المستخدم';
                    avatarEl.src = u.avatar || 'https://placehold.co/120x120';
                    if (emailEl && u.email) emailEl.textContent = u.email;
                    if (joinedEl) joinedEl.textContent = 'تاريخ التسجيل';
                    if (chatsEl) chatsEl.textContent = '0 محادثة';
                }
            }).catch(() => {
                nameEl.textContent = u.name || 'اسم المستخدم';
                avatarEl.src = u.avatar || 'https://placehold.co/120x120';
                if (emailEl && u.email) emailEl.textContent = u.email;
                if (joinedEl) joinedEl.textContent = 'تاريخ التسجيل';
                if (chatsEl) chatsEl.textContent = '0 محادثة';
            });
        } else {
            nameEl.textContent = u.name || 'اسم المستخدم';
            avatarEl.src = u.avatar || 'https://via.placeholder.com/120';
            if (emailEl && u.email) emailEl.textContent = u.email;
            if (joinedEl) joinedEl.textContent = 'تاريخ التسجيل';
            if (chatsEl) chatsEl.textContent = '0 محادثة';
        }
        logoutBtn.style.display = '';
        if (editBtn) {
            editBtn.style.display = '';
            editBtn.textContent = 'تعديل الملف';
        }
    }

    logoutBtn.addEventListener('click', async () => {
        // Show confirmation dialog before logout
        const confirmed = confirm('هل أنت متأكد من أنك تريد تسجيل الخروج؟');
        if (!confirmed) return;

        if (window.firebaseInitialized && window.firebaseAuth) {
            await window.firebaseAuth.signOut();
        }
        localStorage.removeItem('kk_user');
        location.href = 'index.html';
    });

    // Edit profile handlers
    if (editBtn && editModal && editForm) {
        editBtn.addEventListener('click', () => {
            const u = getCurrentUser();
            const titleEl = document.getElementById('edit-modal-title');
            editNameInput.value = (u && u.name) ? u.name : '';
            editAvatarPreview.src = (u && u.avatar) ? u.avatar : 'https://placehold.co/120x120';

            // Update modal title based on user state
            if (titleEl) {
                titleEl.textContent = u ? 'تعديل الملف الشخصي' : 'تسجيل الدخول';
            }

            editModal.style.display = 'flex';
            editModal.setAttribute('aria-hidden', 'false');
        });

        editCancel.addEventListener('click', () => {
            editModal.style.display = 'none';
            editModal.setAttribute('aria-hidden', 'true');
        });

        if (editAvatarUrl && editAvatarPreview) {
            editAvatarUrl.addEventListener('input', () => {
                const url = editAvatarUrl.value.trim();
                if (!url) { 
                    editAvatarPreview.src = 'https://placehold.co/120x120'; 
                    return; 
                }
                editAvatarPreview.src = url;
            });
        }

        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newName = editNameInput.value.trim();
            const avatarUrl = editAvatarUrl.value.trim() || null;
            const u = getCurrentUser();

            // Validate name
            if (!newName || newName.length < 2) {
                alert('الرجاء إدخال اسم صالح (حرفين على الأقل).');
                return;
            }

            // If no user exists, create a new one
            if (!u) {
                try {
                    let avatarData = 'https://placehold.co/120x120';
                    if (avatarUrl) {
                        avatarData = avatarUrl; 
                         
                         
                         
                    
                    }
                    const local = { 
                        id: 'local_' + Date.now(), 
                        name: newName, 
                        email: '', 
                        avatar: avatarData, 
                        local: true 
                    };
                    localStorage.setItem('kk_user', JSON.stringify(local));
                    nameEl.textContent = local.name;
                    avatarEl.src = local.avatar;
                    editModal.style.display = 'none';
                    editModal.setAttribute('aria-hidden', 'true');
                    alert('تم تسجيل الدخول بنجاح! مرحباً ' + newName);
                    render(); // Refresh the UI
                    return;
                } catch (err) {
                    console.error('Registration failed:', err);
                    alert('فشل التسجيل: ' + (err && err.message ? err.message : err));
                    return;
                }
            }

            // If Firebase available, attempt to upload avatar and update both auth profile and users doc
            if (window.firebaseInitialized && window.firebaseAuth && window.firebaseDB) {
                try {
                    let photoURL = u.avatar || null;
                    if (avatarUrl) {
                        photoURL = avatarUrl;
                    }
                    // update auth profile if signed-in user matches
                    const current = window.firebaseAuth.currentUser;
                    if (current && current.uid === u.id) {
                        await current.updateProfile({ displayName: newName || current.displayName, photoURL: photoURL || current.photoURL });
                    }
                    // update users collection
                    await window.firebaseDB.collection('users').doc(u.id).set({ name: newName || u.name, avatar: photoURL || u.avatar }, { merge: true });

                    // persist local copy
                    const local = { id: u.id, name: newName || u.name, email: (u.email || ''), avatar: photoURL || u.avatar };
                    localStorage.setItem('kk_user', JSON.stringify(local));

                    // update UI
                    nameEl.textContent = local.name;
                    avatarEl.src = local.avatar || 'https://placehold.co/120x120';
                    editModal.style.display = 'none';
                    editModal.setAttribute('aria-hidden', 'true');
                    alert('تم حفظ التغييرات.');
                } catch (err) {
                    console.error('Error updating profile:', err);
                    alert('فشل حفظ التغييرات: ' + (err && err.message ? err.message : err));
                }
                return;
            }

            // Local fallback: save to localStorage
            try {
                let avatarData = u.avatar || 'https://placehold.co/120x120';
                if (avatarUrl) {
                    avatarData = avatarUrl; 
                     
                     
                     
                
                }
                const local = { 
                    id: u.id || ('local_' + Date.now()), 
                    name: newName || u.name, 
                    email: (u.email || ''), 
                    avatar: avatarData, 
                    local: true 
                };
                localStorage.setItem('kk_user', JSON.stringify(local));
                nameEl.textContent = local.name;
                avatarEl.src = local.avatar;
                editModal.style.display = 'none';
                editModal.setAttribute('aria-hidden', 'true');
                alert('تم حفظ التغييرات محلياً.');
            } catch (err) {
                console.error('Local save failed:', err);
                alert('فشل حفظ التغييرات محلياً.');
            }
        });
    }

    render();
});
