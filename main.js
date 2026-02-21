// ==========================================
// ANIME_DIIB - الملف الرئيسي للجافاسكريبت
// ==========================================

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة الوضع الداكن
  initTheme();

  // تهيئة التنقل السفلي
  initBottomNav();

  // تهيئة زر العودة للأعلى
  initBackToTop();

  // تهيئة زر الرجوع (تفاصيل)
  initBackButton();

  // تهيئة البحث
  initSearch();

  // تحميل المحتوى بناءً على الصفحة الحالية
  loadPageContent();
});

// تهيئة الوضع الداكن
function initTheme() {
  const toggles = document.querySelectorAll('.theme-toggle');
  if (!toggles || toggles.length === 0) return;

  // التحقق من التفضيل المحفوظ
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // تحديث أيقونة زر واحد
  function updateSingleToggleIcon(toggle, theme) {
    const icon = toggle.querySelector('i');
    if (!icon) return;
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
      toggle.setAttribute('aria-label', 'تبديل إلى الوضع الفاتح');
    } else {
      icon.className = 'fas fa-moon';
      toggle.setAttribute('aria-label', 'تبديل إلى الوضع الداكن');
    }
  }

  // اضبط الأيقونات عند التحميل
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
  toggles.forEach(t => updateSingleToggleIcon(t, initialTheme));

  // تبديل الوضع عند النقر لأي زر
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      toggles.forEach(t => updateSingleToggleIcon(t, newTheme));
    });
  });
}

// زر الرجوع داخل صفحات التفاصيل (يستخدم id="back-button")
function initBackButton() {
  const backBtn = document.getElementById('back-button');
  if (!backBtn) return;
  backBtn.addEventListener('click', function() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });
}

// تهيئة التنقل السفلي
function initBottomNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const currentPage = getCurrentPage();

  // تحديد العنصر النشط بناءً على الصفحة الحالية
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && (href === currentPage || 
       (currentPage === 'index.html' && href === 'index.html') ||
       (currentPage === 'anime.html' && href === 'anime.html') ||
       (currentPage === 'movie.html' && href === 'movie.html'))) {
      item.classList.add('active');
    }
  });
}

// الحصول على الصفحة الحالية
function getCurrentPage() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1);
  return fileName || 'index.html';
}

// تهيئة زر العودة للأعلى
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // إظهار/إخفاء الزر بناءً على التمرير
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // العودة للأعلى عند النقر
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// تهيئة البحث
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const query = this.value.trim();

    if (query.length > 0) {
      // البحث باستخدام محرك يتماشى مع الصفحة الحالية
      const currentPage = getCurrentPage();
      let results = [];
      if (currentPage === 'anime.html') {
        if (typeof searchSeries === 'function') {
          results = searchSeries(query);
        } else {
          results = searchAnime(query).filter(a => a.type === 'series');
        }
      } else if (currentPage === 'movie.html') {
        if (typeof searchMovies === 'function') {
          results = searchMovies(query);
        } else {
          results = searchAnime(query).filter(a => a.type === 'movie');
        }
      } else {
        results = searchAnime(query);
      }

      displaySearchResults(results);
    } else {
      // إعادة عرض المحتوى الأصلي
      loadPageContent();
    }
  });
}

// عرض نتائج البحث
function displaySearchResults(results) {
  // نبحث عن حاوية مناسبة لعرض النتائج (دعم صفحات مختلفة)
  const possibleIds = ['anime-container', 'latest-anime-container', 'movie-container', 'movies-container', 'series-container'];
  let container = null;
  for (let id of possibleIds) {
    container = document.getElementById(id);
    if (container) break;
  }

  // إن لم يوجد أي من الحاويات المتوقعة، ننشئ حاوية عرض مؤقتة في القسم الرئيسي
  if (!container) {
    const main = document.querySelector('main.container');
    if (main) {
      let sec = document.getElementById('search-results-container');
      if (!sec) {
        sec = document.createElement('div');
        sec.id = 'search-results-container';
        sec.className = 'cards-grid';
        main.prepend(sec);
      }
      container = sec;
    }
  }

  if (!container) return;

  // تفريغ الحاوية
  container.innerHTML = '';

  if (results.length === 0) {
    container.innerHTML = '<div class="error-message">لا توجد نتائج للبحث</div>';
    return;
  }

  // إنشاء بطاقات الأنميات
  results.forEach(anime => {
    const card = createAnimeCard(anime);
    container.appendChild(card);
  });

  // تطبيق التحميل البطيء للصور
  initLazyLoading();
}

// تحميل المحتوى بناءً على الصفحة الحالية
function loadPageContent() {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case 'index.html':
    case '':
      loadHomePage();
      break;
    case 'anime.html':
      loadAnimePage();
      break;
    case 'movie.html':
      loadMoviePage();
      break;
    case 'details.html':
      // يتم تحميل المحتوى في details.js
      break;
    case 'watch.html':
      // يتم تحميل المحتوى في watch.js
      break;
  }
}

// تحميل محتوى الصفحة الرئيسية
function loadHomePage() {
  // عرض أحدث الأنميات
  /*
  const latestContainer = document.getElementById('latest-anime-container');
  if (latestContainer) {
    const latestAnimes = [...animes].sort((a, b) => b.id - a.id).slice(0, 6);
    latestContainer.innerHTML = '';
    latestAnimes.forEach(anime => {
      const card = createAnimeCard(anime);
      latestContainer.appendChild(card);
    });
  }*/

  // عرض المسلسلات
  const seriesContainer = document.getElementById('series-container');
  if (seriesContainer) {
    const series = getSeries().slice(0, 10);
    seriesContainer.innerHTML = '';
    series.forEach(anime => {
      const card = createAnimeCard(anime);
      seriesContainer.appendChild(card);
    });
  }

  // عرض الأفلام
  const moviesContainer = document.getElementById('movies-container');
  if (moviesContainer) {
    const movies = getMovies().slice(0, 10);
    moviesContainer.innerHTML = '';
    movies.forEach(anime => {
      const card = createAnimeCard(anime);
      moviesContainer.appendChild(card);
    });
  }

  // تطبيق التحميل البطيء للصور
  initLazyLoading();
}

// تحميل محتوى صفحة المسلسلات
function loadAnimePage() {
  const container = document.getElementById('anime-container');
  if (!container) return;

  const series = getSeries();
  container.innerHTML = '';

  if (series.length === 0) {
    container.innerHTML = '<div class="error-message">لا توجد مسلسلات حالياً</div>';
    return;
  }

  series.forEach(anime => {
    const card = createAnimeCard(anime);
    container.appendChild(card);
  });

  // تطبيق التحميل البطيء للصور
  initLazyLoading();

  // تهيئة فلتر التصنيفات
  initGenreFilter('series');
}

// تحميل محتوى صفحة الأفلام
function loadMoviePage() {
  const container = document.getElementById('movie-container');
  if (!container) return;

  const movies = getMovies();
  container.innerHTML = '';

  if (movies.length === 0) {
    container.innerHTML = '<div class="error-message">لا توجد أفلام حالياً</div>';
    return;
  }

  movies.forEach(anime => {
    const card = createAnimeCard(anime);
    container.appendChild(card);
  });

  // تطبيق التحميل البطيء للصور
  initLazyLoading();

  // تهيئة فلتر التصنيفات
  initGenreFilter('movie');
}

// إنشاء بطاقة أنمي
function createAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'anime-card';
  card.addEventListener('click', function() {
    window.location.href = `details.html?id=${anime.id}`;
  });

  const cover = document.createElement('div');
  cover.className = 'anime-cover';

  const img = document.createElement('img');
  img.className = 'lazy-load';
  img.setAttribute('data-src', anime.cover);
  img.alt = anime.title;
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300"%3E%3Crect width="200" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3Eتحميل الصورة...%3C/text%3E%3C/svg%3E';

  cover.appendChild(img);
  card.appendChild(cover);

  const info = document.createElement('div');
  info.className = 'anime-info';

  const title = document.createElement('h3');
  title.className = 'anime-title';
  title.textContent = anime.title;

  const meta = document.createElement('div');
  meta.className = 'anime-meta';

  const type = document.createElement('span');
  type.textContent = anime.type === 'series' ? 'مسلسل' : 'فيلم';

  const rating = document.createElement('span');
  rating.className = 'anime-rating';
  rating.textContent = anime.rating;

  meta.appendChild(type);
  meta.appendChild(rating);

  info.appendChild(title);
  info.appendChild(meta);
  card.appendChild(info);

  return card;
}

// تهيئة فلتر التصنيفات
function initGenreFilter(type) {
  const filterContainer = document.getElementById('genre-filter');
  if (!filterContainer) return;

  // التحقق من أن الحاوية لم تتم تهيئتها بنفس النوع
  if (filterContainer.hasAttribute('data-initialized') && filterContainer.getAttribute('data-type') === type) return;
  
  // وضع علامة أن الحاوية تمت تهيئتها مع نوع الصفحة
  filterContainer.setAttribute('data-initialized', 'true');
  filterContainer.setAttribute('data-type', type);

  // تأكد من تفريغ الحاوية قبل إنشاء أزرار جديدة لتجنب التكرار
  filterContainer.innerHTML = '';

  // الحصول على جميع التصنيفات الفريدة
  const allGenres = new Set();
  animes.forEach(anime => {
    if (anime.type === type) {
      anime.genre.forEach(g => allGenres.add(g.trim()));
    }
  });

  // تحويل Set إلى مصفوفة مرتبة
  const sortedGenres = Array.from(allGenres).sort();

  // إنشاء أزرار الفلتر
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.textContent = 'الكل';
  allBtn.addEventListener('click', function() {
    filterByGenre(type, null);
    updateActiveFilter(this);
  });

  filterContainer.appendChild(allBtn);

  sortedGenres.forEach(genre => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = genre;
    btn.addEventListener('click', function() {
      filterByGenre(type, genre);
      updateActiveFilter(this);
    });

    filterContainer.appendChild(btn);
  });
}

// فلترة الأنميات حسب التصنيف
function filterByGenre(type, genre) {
  let filteredAnimes;

  if (type === 'series') {
    filteredAnimes = getSeries();
  } else {
    filteredAnimes = getMovies();
  }

  if (genre) {
    filteredAnimes = filteredAnimes.filter(anime => 
      anime.genre.includes(genre)
    );
  }

  // تحديث العرض
  const containerId = type === 'series' ? 'anime-container' : 'movie-container';
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (filteredAnimes.length === 0) {
    container.innerHTML = '<div class="error-message">لا توجد أنميات بهذا التصنيف</div>';
    return;
  }

  filteredAnimes.forEach(anime => {
    const card = createAnimeCard(anime);
    container.appendChild(card);
  });

  // تطبيق التحميل البطيء للصور
  initLazyLoading();
}

// تحديث الزر النشط في الفلتر
function updateActiveFilter(activeBtn) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}

// تهيئة التحميل البطيء للصور
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('.lazy-load');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          if (src) {
            img.src = src;
            img.onload = function() {
              img.classList.add('loaded');
            };
            img.removeAttribute('data-src');
          }

          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // للمتصفحات القديمة
    lazyImages.forEach(img => {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.classList.add('loaded');
      }
    });
  }
}
