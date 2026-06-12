/* ==============================================
   PETROGOLD – main.js
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

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


  // ─── STICKY HEADER ───────────────────────────
  const topHeader = document.querySelector('.top-header');
  const mainNav   = document.querySelector('.main-nav');

  if (topHeader && mainNav) {
    const headerHeight = topHeader.offsetHeight + mainNav.offsetHeight;

    window.addEventListener('scroll', () => {
      if (window.scrollY > headerHeight) {
        topHeader.classList.add('sticky');
        mainNav.classList.add('sticky');
      } else {
        topHeader.classList.remove('sticky');
        mainNav.classList.remove('sticky');
      }
    });
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
