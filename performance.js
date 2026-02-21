// ==========================================
// ANIME_DIIB - تحسينات الأداء
// ==========================================

// تهيئة تحسينات الأداء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة Lazy Loading للصور
  initLazyLoading();

  // تهيئة تحسينات الفيديو
  initVideoOptimizations();

  // تهيئة تحسينات الأجهزة المحمولة
  initMobileOptimizations();
});

// ==========================================
// Lazy Loading للصور
// ==========================================
function initLazyLoading() {
  // استخدام Intersection Observer API لتحميل الصور عند ظهورها في الشاشة
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          loadImage(img);
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // تحميل الصور قبل 50px من ظهورها
      threshold: 0.01
    });

    // مراقبة جميع الصور التي لها سمة data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // دعم المتصفحات القديمة
    document.querySelectorAll('img[data-src]').forEach(img => {
      loadImage(img);
    });
  }
}

// تحميل الصورة
function loadImage(img) {
  const src = img.getAttribute('data-src');
  if (src) {
    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('loaded');
  }
}

// ==========================================
// تحسينات الفيديو
// ==========================================
function initVideoOptimizations() {
  const videoPlayer = document.getElementById('video-player');
  if (!videoPlayer) return;

  // إضافة مستمعي أحداث لتحسين تحميل الفيديو
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

  // تحسين التخزين المؤقت للفيديو
  videoPlayer.preload = 'metadata';
}

// ==========================================
// تحسينات الأجهزة المحمولة
// ==========================================
function initMobileOptimizations() {
  // التحقق من أن الجهاز هو جهاز محمول
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // تحسينات خاصة بالأجهزة المحمولة
    document.body.classList.add('mobile-device');

    // تقليل جودة الصور على الأجهزة المحمولة
    reduceImageQuality();

    // تحسين التمرير
    enableSmoothScrolling();
  }
}

// تقليل جودة الصور على الأجهزة المحمولة
function reduceImageQuality() {
  // إضافة سمة loading="lazy" لجميع الصور
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
}

// تفعيل التمرير السلس
function enableSmoothScrolling() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ==========================================
// تحسينات إضافية
// ==========================================

// تحسين أداء التمرير
let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // تحديث العناصر عند التمرير
      updateOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// تحديث العناصر عند التمرير
function updateOnScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // تحديث زر العودة للأعلى
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    if (scrollTop > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
}

// تحسين تحميل الصور باستخدام WebP إذا كان مدعوماً
function supportsWebP() {
  return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// تحسين تحميل الصور
function optimizeImageLoading() {
  if (supportsWebP()) {
    document.querySelectorAll('img[data-webp]').forEach(img => {
      const webpSrc = img.getAttribute('data-webp');
      if (webpSrc) {
        img.src = webpSrc;
      }
    });
  }
}

// تحسين أداء الرسوم المتحركة
function reduceAnimations() {
  // التحقق من تفضيلات المستخدم للرسوم المتحركة
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
  }
}

// تهيئة جميع التحسينات
function initAllOptimizations() {
  initLazyLoading();
  initVideoOptimizations();
  initMobileOptimizations();
  optimizeImageLoading();
  reduceAnimations();
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.performanceUtils = {
  initLazyLoading,
  initVideoOptimizations,
  initMobileOptimizations,
  loadImage,
  optimizeImageLoading,
  reduceAnimations,
  initAllOptimizations
};
