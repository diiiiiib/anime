// ==========================================
// ANIME_DIIB - ملف جافاسكريبت لصفحة التفاصيل
// ==========================================

// تهيئة صفحة التفاصيل عند تحميلها
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة الوضع الداكن
  initTheme();

  // تهيئة التنقل السفلي
  initBottomNav();

  // تهيئة زر العودة للأعلى
  initBackToTop();

  // تحميل تفاصيل الأنمي
  loadAnimeDetails();
});

// تحميل تفاصيل الأنمي
function loadAnimeDetails() {
  // الحصول على معرف الأنمي من الرابط
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get('id');

  if (!animeId) {
    showError('لم يتم تحديد معرف الأنمي');
    return;
  }

  // الحصول على بيانات الأنمي
  const anime = getAnimeById(animeId);

  if (!anime) {
    showError('لم يتم العثور على الأنمي المطلوب');
    return;
  }

  // عرض تفاصيل الأنمي
  displayAnimeDetails(anime);
  
  // تهيئة lazy loading للصور
  if (typeof performanceUtils !== 'undefined' && performanceUtils.initLazyLoading) {
    performanceUtils.initLazyLoading();
  }
}

// عرض تفاصيل الأنمي
function displayAnimeDetails(anime) {
  // تحديث عنوان الصفحة
  document.title = `${anime.title} - ANIME_DIIB`;

  // عرض الخلفية
  const background = document.getElementById('anime-background');
  if (background) {
    background.setAttribute('data-src', anime.background);
    background.alt = `${anime.title} خلفية`;
    background.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"%3E%3Crect width="1920" height="1080" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23999"%3Eتحميل الصورة...%3C/text%3E%3C/svg%3E';
  }

  // عرض الغلاف
  const cover = document.getElementById('anime-cover');
  if (cover) {
    cover.setAttribute('data-src', anime.cover);
    cover.alt = `${anime.title} غلاف`;
    cover.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect width="200" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3Eتحميل الصورة...%3C/text%3E%3C/svg%3E';
  }

  // عرض العنوان
  const title = document.getElementById('anime-title');
  if (title) {
    title.textContent = anime.title;
  }

  // عرض السنة والنوع
  const year = document.getElementById('anime-year');
  if (year) {
    year.textContent = anime.year || '';
  }

  const type = document.getElementById('anime-type');
  if (type) {
    type.textContent = anime.type === 'series' ? 'مسلسل' : 'فيلم';
  }

  // عرض التقييم
  const rating = document.getElementById('anime-rating');
  if (rating) {
    rating.textContent = anime.rating;
  }

  // عرض التصنيفات
  const genresContainer = document.getElementById('anime-genres');
  if (genresContainer) {
    genresContainer.innerHTML = '';
    anime.genre.forEach(genre => {
      const genreTag = document.createElement('span');
      genreTag.className = 'genre-tag';
      genreTag.textContent = genre;
      genresContainer.appendChild(genreTag);
    });
  }

  // عرض الوصف
  const description = document.getElementById('anime-description');
  if (description) {
    description.textContent = anime.description;
  }

  // عرض قائمة الحلقات
  const episodesContainer = document.getElementById('episodes-container');
  if (episodesContainer) {
    episodesContainer.innerHTML = '';

    if (anime.episodes && anime.episodes.length > 0) {
      const episodesTitle = document.createElement('h3');
      episodesTitle.className = 'section-title';
      episodesTitle.textContent = 'الحلقات';
      episodesContainer.appendChild(episodesTitle);

      const episodesGrid = document.createElement('div');
      episodesGrid.className = 'episodes-grid';

      anime.episodes.forEach(episode => {
        const episodeCard = createEpisodeCard(anime.id, episode);
        episodesGrid.appendChild(episodeCard);
      });

      episodesContainer.appendChild(episodesGrid);
    } else {
      const noEpisodes = document.createElement('div');
      noEpisodes.className = 'error-message';
      noEpisodes.textContent = 'لا توجد حلقات متاحة حالياً';
      episodesContainer.appendChild(noEpisodes);
    }
  }
}

// إنشاء بطاقة حلقة
function createEpisodeCard(animeId, episode) {
  const card = document.createElement('div');
  card.className = 'episode-card';
  card.addEventListener('click', function() {
    window.location.href = `watch.html?id=${animeId}&ep=${episode.number}`;
  });

  const episodeNumber = document.createElement('span');
  episodeNumber.className = 'episode-number';
  episodeNumber.textContent = episode.number;

  const episodeTitle = document.createElement('span');
  episodeTitle.className = 'episode-title';
  episodeTitle.textContent = episode.title;

  card.appendChild(episodeNumber);
  card.appendChild(episodeTitle);

  return card;
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
