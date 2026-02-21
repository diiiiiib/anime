// ==========================================
// ANIME_DIIB - ملف جافاسكريبت لصفحة المشاهدة
// ==========================================

// تهيئة صفحة المشاهدة عند تحميلها
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة الوضع الداكن
  initTheme();

  // تهيئة التنقل السفلي
  initBottomNav();

  // تحميل بيانات المشاهدة
  loadWatchData();
});

// تحميل بيانات المشاهدة
function loadWatchData() {
  // الحصول على معرف الأنمي ورقم الحلقة من الرابط
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id');
  const episodeNumber = urlParams.get('ep');

  if (!animeId || !episodeNumber) {
    showError('لم يتم تحديد معرف الأنمي أو رقم الحلقة');
    return;
  }

  // الحصول على بيانات الأنمي
  const anime = getAnimeById(animeId);

  if (!anime) {
    showError('لم يتم العثور على الأنمي المطلوب');
    return;
  }

  // الحصول على بيانات الحلقة
  const episode = getEpisode(animeId, episodeNumber);

  if (!episode) {
    showError('لم يتم العثور على الحلقة المطلوبة');
    return;
  }

  // عرض بيانات المشاهدة
  displayWatchData(anime, episode);
  
  // تهيئة تحسينات الأداء
  if (typeof performanceUtils !== 'undefined' && performanceUtils.initVideoOptimizations) {
    performanceUtils.initVideoOptimizations();
  }
  
  if (typeof performanceUtils !== 'undefined' && performanceUtils.initMobileOptimizations) {
    performanceUtils.initMobileOptimizations();
  }
}

// عرض بيانات المشاهدة
function displayWatchData(anime, episode) {
  // تحديث عنوان الصفحة
  document.title = `${anime.title} - الحلقة ${episode.number} - ANIME_DIIB`;

  // عرض الفيديو
  const videoPlayer = document.getElementById('video-player');
  if (videoPlayer) {
    // تحسين تحميل الفيديو
    videoPlayer.preload = 'metadata'; // تحميل البيانات الوصفية فقط في البداية
    videoPlayer.src = episode.video;
    videoPlayer.load();

    // إضافة مستمعي أحداث لتحسين التحميل
    videoPlayer.addEventListener('loadstart', function() {
      this.classList.add('loading');
    });

    videoPlayer.addEventListener('canplay', function() {
      this.classList.remove('loading');
    });

    videoPlayer.addEventListener('waiting', function() {
      this.classList.add('loading');
    });

    videoPlayer.addEventListener('playing', function() {
      this.classList.remove('loading');
    });

    // تشغيل الفيديو تلقائياً
    videoPlayer.play().catch(error => {
      // فشل التشغيل التلقائي
    });
  }

  // عرض عنوان الحلقة
  const episodeTitle = document.getElementById('episode-title');
  if (episodeTitle) {
    episodeTitle.textContent = `${anime.title} - الحلقة ${episode.number}: ${episode.title}`;
  }

  // عرض قائمة الحلقات الجانبية
  const episodesList = document.getElementById('episodes-list');
  if (episodesList && anime.episodes) {
    episodesList.innerHTML = '';

    anime.episodes.forEach(ep => {
      const episodeItem = document.createElement('div');
      episodeItem.className = 'episode-item';

      if (ep.number === parseInt(episode.number)) {
        episodeItem.classList.add('active');
      }

      episodeItem.addEventListener('click', function() {
        loadEpisode(anime.id, ep.number);
      });

      const episodeNumberSmall = document.createElement('span');
      episodeNumberSmall.className = 'episode-number-small';
      episodeNumberSmall.textContent = ep.number;

      const episodeTitleSmall = document.createElement('span');
      episodeTitleSmall.className = 'episode-title-small';
      episodeTitleSmall.textContent = ep.title;

      episodeItem.appendChild(episodeNumberSmall);
      episodeItem.appendChild(episodeTitleSmall);
      episodesList.appendChild(episodeItem);
    });
  }

  // إعداد أزرار المشاركة
  setupShareButtons(anime, episode);
}

// تحميل حلقة محددة
function loadEpisode(animeId, episodeNumber) {
  window.location.href = `watch.html?id=${animeId}&ep=${episodeNumber}`;
}

// إعداد أزرار المشاركة
function setupShareButtons(anime, episode) {
  const shareUrl = window.location.href;
  const shareTitle = `${anime.title} - الحلقة ${episode.number}: ${episode.title}`;

  const facebookBtn = document.getElementById('share-facebook');
  if (facebookBtn) {
    facebookBtn.addEventListener('click', function() {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    });
  }

  const twitterBtn = document.getElementById('share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', function() {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
    });
  }

  const whatsappBtn = document.getElementById('share-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`, '_blank');
    });
  }

  const copyLinkBtn = document.getElementById('share-copy');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(shareUrl).then(function() {
        // إظهار رسالة نجاح
        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'تم النسخ!';
        setTimeout(function() {
          copyLinkBtn.textContent = originalText;
        }, 2000);
      }).catch(function() {
        // في حالة فشل النسخ، نستخدم طريقة بديلة
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const originalText = copyLinkBtn.textContent;
        copyLinkBtn.textContent = 'تم النسخ!';
        setTimeout(function() {
          copyLinkBtn.textContent = originalText;
        }, 2000);
      });
    });
  }
}

// عرض رسالة خطأ
function showError(message) {
  const container = document.querySelector('.container');
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h2>خطأ</h2>
        <p>${message}</p>
        <a href="index.html" class="action-btn">العودة للرئيسية</a>
      </div>
    `;
  }
}
