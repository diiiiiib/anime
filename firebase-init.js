// Firebase Configuration
// This script will dynamically load Firebase SDK (compat) and initialize the app if config is provided.
// The config should be loaded from config.js before this script runs

// expose config so user can override before this script runs
if (!window.firebaseConfig) {
    console.warn('Firebase config not found. Using local fallback for auth/data.');
}

window.firebaseInitialized = false;

function _loadScript(url) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = url;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load ' + url));
        document.head.appendChild(s);
    });
}

// Promise that resolves when Firebase initialization attempt finishes
window.firebaseReady = (async function initFirebase() {
    if (!window.firebaseConfig || !window.firebaseConfig.apiKey) {
        console.warn('Firebase config not found. Using local fallback for auth/data.');
        return { initialized: false };
    }

    try {
        // Load compat libraries for simple migration
        await _loadScript('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
        await _loadScript('https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js');
        await _loadScript('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js');
        await _loadScript('https://www.gstatic.com/firebasejs/9.22.1/firebase-storage-compat.js');

        if (window.firebase && !window.firebase.apps.length) {
            window.firebaseApp = firebase.initializeApp(window.firebaseConfig);
            window.firebaseAuth = firebase.auth();
            window.firebaseDB = firebase.firestore();
            window.firebaseStorage = firebase.storage();
            window.firebaseInitialized = true;
            return { initialized: true };
        }
    } catch (err) {
        console.error('Error loading Firebase SDK:', err);
        return { initialized: false, error: err };
    }
    return { initialized: false };
})();

// sanity check for storage bucket string (helps catch mis-typed bucket names)
if (window.firebaseConfig && window.firebaseConfig.storageBucket) {
    const sb = window.firebaseConfig.storageBucket;
    if (!sb.includes('.') || sb.includes('firebasestorage.app')) {
        console.warn('Check `firebaseConfig.storageBucket` — value looks unusual:', sb);
    }
}
