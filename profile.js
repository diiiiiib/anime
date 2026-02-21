document.addEventListener('DOMContentLoaded', async () => {
  if (window.firebaseReady) await window.firebaseReady;
  // Read query to determine which profile to show
  const qs = location.search.replace(/^\?/, '');
  const params = Object.fromEntries(qs.split('&').filter(Boolean).map(p => p.split('=').map(decodeURIComponent)));
  const id = params.user || 'local_profile';
  const name = params.name || 'اسم المستخدم';
  const avatar = params.avatar || null;

  async function renderProfile() {
    if (window.firebaseInitialized && window.firebaseDB) {
      try {
        const doc = await window.firebaseDB.collection('users').doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          document.getElementById('profile-name').textContent = data.name || name;
          document.getElementById('profile-avatar').src = data.avatar || 'https://placehold.co/120x120';
          return;
        }
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    }
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-avatar').src = avatar || 'https://placehold.co/120x120';
  }

  renderProfile();

  document.getElementById('msg-btn').addEventListener('click', () => {
    location.href = `chatroom.html?user=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}`;
  });
});
