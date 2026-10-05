/**
 * Le Decor Interior Design Bangalore
 * Interactive Logic: Before/After Slider, 3-Step Dynamic Estimator, Portfolio Filter, FAQs
 */

document.addEventListener('DOMContentLoaded', () => {
  // Prevent aggressive browser scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 0. Pinned Scroll Transformation Engine ---
  const heroScrollSection = document.getElementById('heroScrollSection');
  const heroWipeOverlay = document.getElementById('heroWipeOverlay');
  const heroDividerLine = document.getElementById('heroDividerLine');
  const heroProgressPercent = document.getElementById('heroProgressPercent');
  const heroPhaseDot = document.getElementById('heroPhaseDot');
  const heroPhaseText = document.getElementById('heroPhaseText');
  const heroDynamicHeading = document.getElementById('heroDynamicHeading');
  const heroDynamicSub = document.getElementById('heroDynamicSub');
  const heroScrollPrompt = document.getElementById('heroScrollPrompt');

  if (heroScrollSection && heroWipeOverlay && heroDividerLine) {
    let currentProgress = 0;
    let targetProgress = 0;
    let lastPhase = -1;

    const onScroll = () => {
      const rect = heroScrollSection.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / (totalScrollable > 0 ? totalScrollable : 1);
      progress = Math.max(0, Math.min(progress, 1));
      targetProgress = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    // Smooth Lerp Render Loop (60fps)
    const renderLoop = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;

      // Wipe from 100% (raw before) down to 0% (luxury after)
      const wipePercent = Math.max(0, Math.min(100, (1 - currentProgress) * 100));

      heroWipeOverlay.style.clipPath = `polygon(0 0, ${wipePercent}% 0, ${wipePercent}% 100%, 0 100%)`;
      heroDividerLine.style.left = `${wipePercent}%`;

      if (wipePercent <= 1.5 || wipePercent >= 98.5) {
        heroDividerLine.style.opacity = '0';
      } else {
        heroDividerLine.style.opacity = '1';
      }

      const displayPct = Math.round(currentProgress * 100);
      if (heroProgressPercent) heroProgressPercent.textContent = `${displayPct}%`;

      // Phase Text & HUD Updates
      let phase = currentProgress < 0.3 ? 0 : (currentProgress < 0.75 ? 1 : 2);
      if (phase !== lastPhase) {
        lastPhase = phase;
        if (phase === 0) {
          if (heroPhaseDot) heroPhaseDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse';
          if (heroPhaseText) heroPhaseText.textContent = 'Phase 01: Raw Builder Handover';
          if (heroDynamicHeading) heroDynamicHeading.innerHTML = 'From Raw Concrete to <span class="italic text-brand-gold">Bespoke Sanctuary</span>.';
          if (heroDynamicSub) heroDynamicSub.textContent = 'Scroll down to watch how Le Decor transforms unfinished builder apartments into turnkey luxury residences in 45 days.';
          if (heroScrollPrompt) heroScrollPrompt.innerHTML = '<span>Scroll to Transform Space</span><i data-lucide="arrow-down" class="w-4 h-4 text-brand-gold"></i>';
        } else if (phase === 1) {
          if (heroPhaseDot) heroPhaseDot.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse';
          if (heroPhaseText) heroPhaseText.textContent = 'Phase 02: In-House Joinery & Acoustic Paneling';
          if (heroDynamicHeading) heroDynamicHeading.innerHTML = 'Precision Modular Engineering <span class="italic text-cyan-300">In Progress</span>.';
          if (heroDynamicSub) heroDynamicSub.textContent = 'BWP grade marine plywood, concealed German hardware, and cove ambient lighting installed seamlessly.';
          if (heroScrollPrompt) heroScrollPrompt.innerHTML = '<span>Transforming Living Space...</span><i data-lucide="sparkles" class="w-4 h-4 text-brand-gold"></i>';
        } else {
          if (heroPhaseDot) heroPhaseDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
          if (heroPhaseText) heroPhaseText.textContent = 'Phase 03: Turnkey Sanctuary Delivered';
          if (heroDynamicHeading) heroDynamicHeading.innerHTML = 'Bespoke Luxury Living <span class="italic text-emerald-400">Delivered</span>.';
          if (heroDynamicSub) heroDynamicSub.textContent = 'Move-in ready in 45 days. 10-year structural warranty with zero compromises.';
          if (heroScrollPrompt) heroScrollPrompt.innerHTML = '<span>Explore Pricing & Portfolio Below ↓</span>';
        }
        if (window.lucide) window.lucide.createIcons();
      }

      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  // --- 1. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- 2. Interactive Before & After Slider ---
  const sliderWrapper = document.getElementById('sliderWrapper');
  const beforeOverlay = document.getElementById('beforeOverlay');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderWrapper && beforeOverlay && sliderHandle) {
    let isDragging = false;

    const setSliderPosition = (xPos) => {
      const rect = sliderWrapper.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      let percentage = (offsetX / rect.width) * 100;

      // Bound between 5% and 95%
      percentage = Math.max(5, Math.min(percentage, 95));

      beforeOverlay.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    };

    const onPointerDown = (e) => {
      isDragging = true;
      setSliderPosition(e.clientX || (e.touches && e.touches[0].clientX));
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX || (e.touches && e.touches[0].clientX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    sliderWrapper.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    sliderWrapper.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  // --- Transformation Mode Switcher (Slider vs 3D Video) ---
  const toggleSliderMode = document.getElementById('toggleSliderMode');
  const toggleVideoMode = document.getElementById('toggleVideoMode');
  const sliderContainer = document.getElementById('sliderContainer');
  const videoContainer = document.getElementById('videoContainer');
  const transformationVideo = document.getElementById('transformationVideo');

  if (toggleSliderMode && toggleVideoMode && sliderContainer && videoContainer) {
    toggleSliderMode.addEventListener('click', () => {
      toggleSliderMode.classList.add('bg-brand-noir', 'text-brand-gold', 'shadow-md');
      toggleSliderMode.classList.remove('bg-white', 'text-stone-600', 'border');

      toggleVideoMode.classList.remove('bg-brand-noir', 'text-brand-gold', 'shadow-md');
      toggleVideoMode.classList.add('bg-white', 'text-stone-600', 'border');

      sliderContainer.classList.remove('hidden');
      videoContainer.classList.add('hidden');
      if (transformationVideo) transformationVideo.pause();
    });

    toggleVideoMode.addEventListener('click', () => {
      toggleVideoMode.classList.add('bg-brand-noir', 'text-brand-gold', 'shadow-md');
      toggleVideoMode.classList.remove('bg-white', 'text-stone-600', 'border');

      toggleSliderMode.classList.remove('bg-brand-noir', 'text-brand-gold', 'shadow-md');
      toggleSliderMode.classList.add('bg-white', 'text-stone-600', 'border');

      sliderContainer.classList.add('hidden');
      videoContainer.classList.remove('hidden');
      if (transformationVideo) {
        transformationVideo.currentTime = 0;
        transformationVideo.play();
      }
    });
  }

  // --- 3. Interactive 3-Step Cost Estimator ---
  let selectedBase = 650000;
  let selectedPropertyLabel = '2 BHK Flat';
  let selectedMultiplier = 1.0;
  let selectedScopeLabel = 'Full Home Turnkey';

  const stepBadge1 = document.getElementById('stepBadge1');
  const stepBadge2 = document.getElementById('stepBadge2');
  const stepBadge3 = document.getElementById('stepBadge3');
  const stepLineProgress = document.getElementById('stepLineProgress');

  const stepContent1 = document.getElementById('stepContent1');
  const stepContent2 = document.getElementById('stepContent2');
  const stepContent3 = document.getElementById('stepContent3');

  const btnNext1 = document.getElementById('btnNext1');
  const btnBack2 = document.getElementById('btnBack2');
  const btnNext2 = document.getElementById('btnNext2');
  const btnBack3 = document.getElementById('btnBack3');

  const displayEstimatePrice = document.getElementById('displayEstimatePrice');
  const leadCaptureForm = document.getElementById('leadCaptureForm');

  // Step 1: Property Option Selection
  document.querySelectorAll('.property-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.property-option').forEach(el => {
        el.classList.remove('border-brand-gold', 'bg-brand-gold/5');
        el.classList.add('border-stone-200');
        const icon = el.querySelector('i');
        if (icon) icon.classList.remove('text-brand-gold');
      });

      option.classList.remove('border-stone-200');
      option.classList.add('border-brand-gold', 'bg-brand-gold/5');
      const icon = option.querySelector('i');
      if (icon) icon.classList.add('text-brand-gold');

      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedBase = parseInt(option.dataset.base, 10);
      selectedPropertyLabel = option.querySelector('.font-bold').textContent;
    });
  });

  // Step 2: Scope Option Selection
  document.querySelectorAll('.scope-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.scope-option').forEach(el => {
        el.classList.remove('border-brand-gold', 'bg-brand-gold/5');
        el.classList.add('border-stone-200');
        const icon = el.querySelector('[data-lucide="check-circle"]');
        if (icon) {
          icon.setAttribute('data-lucide', 'circle');
          icon.classList.remove('text-brand-gold');
          icon.classList.add('text-stone-300');
        }
      });

      option.classList.remove('border-stone-200');
      option.classList.add('border-brand-gold', 'bg-brand-gold/5');
      const icon = option.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'check-circle');
        icon.classList.remove('text-stone-300');
        icon.classList.add('text-brand-gold');
      }

      if (window.lucide) window.lucide.createIcons();

      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      selectedMultiplier = parseFloat(option.dataset.multiplier);
      selectedScopeLabel = option.querySelector('.font-bold span').textContent;
    });
  });

  // Navigate: 1 -> 2
  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      stepContent1.classList.add('hidden');
      stepContent2.classList.remove('hidden');

      stepBadge2.classList.remove('bg-stone-200', 'text-stone-600');
      stepBadge2.classList.add('bg-brand-noir', 'text-brand-gold');
      stepLineProgress.style.width = '50%';
    });
  }

  // Navigate: 2 -> 1
  if (btnBack2) {
    btnBack2.addEventListener('click', () => {
      stepContent2.classList.add('hidden');
      stepContent1.classList.remove('hidden');

      stepBadge2.classList.remove('bg-brand-noir', 'text-brand-gold');
      stepBadge2.classList.add('bg-stone-200', 'text-stone-600');
      stepLineProgress.style.width = '0%';
    });
  }

  // Navigate: 2 -> 3 (Calculate)
  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      stepContent2.classList.add('hidden');
      stepContent3.classList.remove('hidden');

      stepBadge3.classList.remove('bg-stone-200', 'text-stone-600');
      stepBadge3.classList.add('bg-brand-noir', 'text-brand-gold');
      stepLineProgress.style.width = '100%';

      // Calculate estimate
      const low = Math.round((selectedBase * selectedMultiplier) / 10000) * 10000;
      const high = Math.round((low * 1.25) / 10000) * 10000;

      const formatINR = (val) => '₹' + val.toLocaleString('en-IN');
      displayEstimatePrice.textContent = `${formatINR(low)} – ${formatINR(high)}`;
    });
  }

  // Navigate: 3 -> 2
  if (btnBack3) {
    btnBack3.addEventListener('click', () => {
      stepContent3.classList.add('hidden');
      stepContent2.classList.remove('hidden');

      stepBadge3.classList.remove('bg-brand-noir', 'text-brand-gold');
      stepBadge3.classList.add('bg-stone-200', 'text-stone-600');
      stepLineProgress.style.width = '50%';
    });
  }

  // Lead Form Submit -> Instant WhatsApp Dispatch to +91 96635 22917
  if (leadCaptureForm) {
    leadCaptureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName').value.trim();
      const phone = document.getElementById('leadPhone').value.trim();
      const location = document.getElementById('leadLocation').value.trim() || 'Bangalore';
      const estimateText = displayEstimatePrice.textContent;

      const message = `Hi Taj! 👋\n\nI just calculated an interior design estimate on your Le Decor website:\n\n` +
        `• *Client Name:* ${name}\n` +
        `• *Contact Phone:* ${phone}\n` +
        `• *Property Type:* ${selectedPropertyLabel}\n` +
        `• *Scope:* ${selectedScopeLabel}\n` +
        `• *Locality / Apartment:* ${location}\n` +
        `• *Estimated Investment:* ${estimateText}\n\n` +
        `Could we schedule a time for an on-site visit or a 3D floor plan walkthrough? Thank you!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/919663522917?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    });
  }

  // --- 4. Portfolio Filter Tabs ---
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-noir', 'text-white', 'active');
        b.classList.add('bg-white', 'text-stone-600');
      });

      btn.classList.add('bg-brand-noir', 'text-white', 'active');
      btn.classList.remove('bg-white', 'text-stone-600');

      const filter = btn.dataset.filter;

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. FAQ Accordions ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('i');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isHidden = answer.classList.contains('hidden');
        // Close others
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-question i').forEach(i => {
          i.style.transform = 'rotate(0deg)';
        });

        if (isHidden) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(45deg)';
        }
      });
    }
  });
});
