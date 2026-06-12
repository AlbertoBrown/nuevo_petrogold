/* ==============================================
   PETROGOLD – main.js
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── REVIEWS CAROUSEL ────────────────────────
  const track    = document.getElementById('reviewsTrack');
  const btnPrevR = document.getElementById('reviewsPrev');
  const btnNextR = document.getElementById('reviewsNext');

  if (track) {
    const scrollAmount = () => {
      const card = track.querySelector('.review-card');
      return card ? card.offsetWidth + 20 : 300;
    };

    if (btnPrevR) btnPrevR.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    if (btnNextR) btnNextR.addEventListener('click', () => track.scrollBy({ left:  scrollAmount(), behavior: 'smooth' }));

    // Drag to scroll
    let isDragging = false, startX = 0, scrollLeft = 0;

    track.addEventListener('mousedown', e => {
      isDragging = true;
      track.classList.add('dragging');
      startX    = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDragging = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup',    () => { isDragging = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove',  e => {
      if (!isDragging) return;
      e.preventDefault();
      const x    = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      track.scrollLeft = scrollLeft - walk;
    });
  }


  // ─── HAMBURGER MENU ──────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const siteNav    = document.querySelector('.main-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', open);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!menuToggle.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('open');
        menuToggle.classList.remove('open');
      }
    });
  }


  // ─── HEADER TABS (Particulares / Empresas) ───
  const tabs = document.querySelectorAll('.header-tabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });


  // ─── HERO SLIDER ─────────────────────────────
  const slider = document.getElementById('heroSlider');
  if (slider) {
    const slides     = slider.querySelectorAll('.slide');
    const btnPrev    = document.getElementById('heroPrev');
    const btnNext    = document.getElementById('heroNext');
    const elCurrent  = document.getElementById('heroCurrent');
    const elTotal    = document.getElementById('heroTotal');

    let current    = 0;
    let autoTimer  = null;
    const INTERVAL = 5000; // ms between auto-advances

    if (elTotal) elTotal.textContent = slides.length;

    function goTo(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (elCurrent) elCurrent.textContent = current + 1;
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        goTo(current - 1);
        startAuto(); // restart timer after manual action
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        goTo(current + 1);
        startAuto();
      });
    }

    // Pause on hover
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    // Keyboard navigation when slider is focused
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
    });

    startAuto();
  }


  // ─── SCROLL: transparent ↔ white header ─────
  const topHeader  = document.querySelector('.top-header');
  const mainNav    = document.querySelector('.main-nav');
  const logoImg    = document.getElementById('siteLogoImg');
  const isHeroPage = document.body.classList.contains('hero-page');

  if (topHeader) {
const THRESHOLD = 30;

    const onScroll = () => {
      const scrolled = window.scrollY > THRESHOLD;

      if (isHeroPage) {
        topHeader.classList.toggle('scrolled', scrolled);
        if (mainNav) mainNav.classList.toggle('scrolled', scrolled);
        if (logoImg) {
          logoImg.src = 'Img/logo_petrogold_sin_fondo.png';
        }
      } else {
        const headerH = topHeader.offsetHeight + (mainNav ? mainNav.offsetHeight : 0);
        const past = window.scrollY > headerH;
        topHeader.classList.toggle('sticky', past);
        if (mainNav) mainNav.classList.toggle('sticky', past);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ─── SMOOTH SCROLL para anclas internas ──────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
