/* =========================================================
   HEALORA — HERO SECTION SCRIPT
   Handles: navbar glass-on-scroll, mobile menu toggle,
   and the hero headline typing animation.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- 1. Navbar glassmorphism on scroll ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const SCROLL_THRESHOLD = 40;
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial state on load
  }

  /* ---------- 2. Mobile menu toggle ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
      burgerBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 3. Headline typing animation ---------- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = ['a conversation', 'a quick chat', 'checking the weather'];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Respect reduced-motion: show the primary phrase statically
      typewriterEl.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      const TYPE_SPEED = 55;
      const DELETE_SPEED = 30;
      const PAUSE_AFTER_TYPE = 1800;
      const PAUSE_AFTER_DELETE = 300;

      const tick = () => {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
          charIndex++;
          typewriterEl.textContent = currentPhrase.slice(0, charIndex);

          if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(tick, PAUSE_AFTER_TYPE);
            return;
          }
          setTimeout(tick, TYPE_SPEED);
        } else {
          charIndex--;
          typewriterEl.textContent = currentPhrase.slice(0, charIndex);

          if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(tick, PAUSE_AFTER_DELETE);
            return;
          }
          setTimeout(tick, DELETE_SPEED);
        }
      };

      // Kick off after the headline's own entrance animation settles
      setTimeout(tick, 500);
    }
  }
});


/* =========================================================
   HEALORA — FEATURES SECTION SCRIPT
   Handles: scroll-reveal for the header and each feature card.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('#features [data-reveal], .features [data-reveal]');
  if (!revealTargets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealTargets.forEach((el) => observer.observe(el));
});


/* =========================================================
   HEALORA — HOW IT WORKS SECTION SCRIPT
   Handles: scroll-reveal for steps, the SVG line "draw-on"
   animation, and sequential arrow activation.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('how-it-works');
  if (!section) return;

  const steps = section.querySelectorAll('.step');
  const revealTargets = section.querySelectorAll('[data-reveal]');
  const trackPath = document.getElementById('trackPath');
  const arrowheads = section.querySelectorAll('.timeline__arrowhead');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reduced motion: reveal everything instantly ---------- */
  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
    if (trackPath) trackPath.classList.add('is-drawn');
    arrowheads.forEach((a) => a.classList.add('is-active'));
    return;
  }

  /* ---------- Prepare the SVG path length for the draw animation ---------- */
  if (trackPath) {
    const length = trackPath.getTotalLength();
    trackPath.style.strokeDasharray = String(length);
    trackPath.style.strokeDashoffset = String(length);
  }

  let hasAnimated = false;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;

          if (trackPath) {
            requestAnimationFrame(() => {
              trackPath.classList.add('is-drawn');
              trackPath.style.strokeDashoffset = '0';
            });
          }

          arrowheads.forEach((arrow, i) => {
            setTimeout(() => arrow.classList.add('is-active'), 500 + i * 400);
          });

          sectionObserver.unobserve(section);
        }
      });
    },
    { threshold: 0.25 }
  );

  sectionObserver.observe(section);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
});


/* =========================================================
   HEALORA — STATISTICS SECTION SCRIPT
   Handles: scroll-reveal for cards and the animated
   count-up for each stat number. No external libraries.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.getElementById('statistics'); // Adjust ID if needed
  const counters = document.querySelectorAll('.js-counter');
  if (!counters.length) return;
  
  const revealTargets = document.querySelectorAll('.statistics [data-reveal], #statistics [data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400; 
    const startTime = performance.now();

    if (prefersReducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    const easeOutQuad = (t) => t * (2 - t);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.floor(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix; 
      }
    };

    requestAnimationFrame(step);
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const counterEl = entry.target.querySelector('.js-counter');
          if (counterEl) {
            animateCounter(counterEl);
          }
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  counters.forEach((counter) => {
    if (!counter.closest('[data-reveal]')) {
      const singleObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              singleObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      singleObserver.observe(counter);
    }
  });
});


/* =========================================================
   HEALORA — TESTIMONIALS SECTION SCRIPT
   Handles: sliding carousel (arrows + drag/swipe), dot
   navigation, and scroll-reveal. No external libraries.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.getElementById('viewport');
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');
  
  if (!viewport || !track || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = Array.from(track.children);
  if (!cards.length) return;

  let currentIndex = 0;
  let cardStep = 0; 

  const dots = cards.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  const measure = () => {
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    const cardWidth = cards[0].getBoundingClientRect().width;
    cardStep = cardWidth + gap;
  };

  const visibleCount = () => {
    const viewportWidth = viewport.getBoundingClientRect().width;
    return Math.max(1, Math.round(viewportWidth / cardStep));
  };

  const maxIndex = () => Math.max(0, cards.length - visibleCount());

  const render = () => {
    const clamped = Math.min(Math.max(currentIndex, 0), maxIndex());
    currentIndex = clamped;
    track.style.transform = `translateX(${-clamped * cardStep}px)`;

    prevBtn.disabled = clamped === 0;
    nextBtn.disabled = clamped === maxIndex();

    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === clamped));
  };

  const goTo = (index) => {
    currentIndex = index;
    render();
  };

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  window.addEventListener('resize', () => {
    measure();
    render();
  });

  let isDragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;

  track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    track.classList.add('is-dragging');
    track.setPointerCapture(e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    dragDeltaX = e.clientX - dragStartX;
    const base = -currentIndex * cardStep;
    track.style.transform = `translateX(${base + dragDeltaX}px)`;
  });

  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    const SWIPE_THRESHOLD = 60; 
    if (dragDeltaX < -SWIPE_THRESHOLD) {
      currentIndex += 1;
    } else if (dragDeltaX > SWIPE_THRESHOLD) {
      currentIndex -= 1;
    }
    render(); 
  };

  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);
  track.addEventListener('pointerleave', () => {
    if (isDragging) endDrag();
  });

  viewport.setAttribute('tabindex', '0');
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
  });

  const revealTargets = document.querySelectorAll('.testimonials [data-reveal], #testimonials [data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }
  
  measure();
  render();
}); // THIS WAS MISSING!


/* =========================================================
   HEALORA — FAQ SECTION SCRIPT
   Handles: accordion expand/collapse, keyboard navigation
   (per the WAI-ARIA accordion pattern), and scroll-reveal.
   Vanilla JavaScript only — no libraries.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.getElementById('accordion');
  if (!accordion) return; // Added a safety check

  const triggers = Array.from(accordion.querySelectorAll('.accordion__trigger'));

  // Desktop allows multiple panels open at once; narrow/mobile viewports
  // close others automatically when one opens, to avoid an overwhelming
  // long scroll (matches the approved wireframe behavior).
  const isSingleOpenMode = () => window.matchMedia('(max-width: 639px)').matches;

  const getPanel = (trigger) =>
    document.getElementById(trigger.getAttribute('aria-controls'));

  /* ---------- Open / close a single panel ---------- */
  const setExpanded = (trigger, expand) => {
    const panel = getPanel(trigger);
    trigger.setAttribute('aria-expanded', String(expand));
    panel.classList.toggle('is-open', expand);
  };

  const toggleTrigger = (trigger) => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    const willExpand = !isExpanded;

    if (willExpand && isSingleOpenMode()) {
      // Close every other panel first (single-open behavior on mobile)
      triggers.forEach((t) => {
        if (t !== trigger) setExpanded(t, false);
      });
    }

    setExpanded(trigger, willExpand);
  };

  /* ---------- Click handling ---------- */
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => toggleTrigger(trigger));
  });

  /* ---------- Keyboard navigation (WAI-ARIA accordion pattern) ----------
     - Enter / Space: handled natively by <button>, toggles the panel
     - Down / Up arrow: moves focus to the next / previous trigger
     - Home / End: moves focus to the first / last trigger
     Focus wraps from the last trigger to the first and vice versa. */
  accordion.addEventListener('keydown', (e) => {
    const currentIndex = triggers.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;

    switch (e.key) {
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = triggers.length - 1;
        break;
      default:
        return; // let all other keys behave normally
    }

    e.preventDefault();
    triggers[targetIndex].focus();
  });

  /* ---------- Scroll reveal for header + accordion block ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }
}); // THIS WAS MISSING!


/* =========================================================
   HEALORA — FOOTER SCRIPT
   Handles: newsletter form validation/submit feedback and
   auto-filling the current year in the copyright line.
   No external libraries.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Auto-fill copyright year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const msgEl = document.getElementById('newsletterMsg');
  
  if (!form || !emailInput || !msgEl) return; // Added safety check

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showMessage = (text, type) => {
    msgEl.textContent = text;
    msgEl.classList.remove('is-success', 'is-error');
    msgEl.classList.add(type === 'success' ? 'is-success' : 'is-error');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!EMAIL_PATTERN.test(email)) {
      showMessage('Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    // No backend wired up here — this simply confirms receipt client-side.
    showMessage(`Thanks! We'll send updates to ${email}.`, 'success');
    form.reset();
  });
}); // THIS WAS MISSING!


/* =========================================================================
   HEALORA — Premium Footer Behaviour
   Vanilla JS, no dependencies.
   ========================================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Auto-update copyright year
  --------------------------------------------------------------------- */
  var yearEl = document.getElementById("pfYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------------
     Scroll-to-top button: show after scrolling, smooth-scroll on click
  --------------------------------------------------------------------- */
  var toTopBtn = document.getElementById("pfToTop");
  if (toTopBtn) {
    toTopBtn.hidden = false; // control visibility via the is-visible class instead

    var toggleToTop = function () {
      toTopBtn.classList.toggle("is-visible", window.scrollY > 480);
    };
    toggleToTop();
    window.addEventListener("scroll", toggleToTop, { passive: true });

    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      // Move focus to a sensible landmark for keyboard/screen-reader users
      var topAnchor = document.getElementById("top") || document.body;
      topAnchor.setAttribute("tabindex", "-1");
      topAnchor.focus({ preventScroll: true });
    });
  }

  /* ---------------------------------------------------------------------
     Newsletter form (client-side only — no backend in this deliverable)
  --------------------------------------------------------------------- */
  var form = document.getElementById("pfNewsletterForm");
  var msg = document.getElementById("pfNewsletterMsg");

  if (form && msg) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("pfEmail");
      var email = input.value.trim();
      var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        msg.textContent = "Please enter a valid email address.";
        msg.classList.add("is-error");
        input.setAttribute("aria-invalid", "true");
        input.focus();
        return;
      }

      msg.classList.remove("is-error");
      msg.textContent = "You're subscribed — thanks for joining.";
      input.removeAttribute("aria-invalid");
      form.reset();
    });
  }
})();


/* =========================================================================
   HEALORA — Premium Login Page Behaviour
   Vanilla JS, no dependencies. No backend in this deliverable — the
   submit handler simulates a network call so the loading/success states
   are demonstrable; swap runFakeLogin() for a real fetch() call.
   ========================================================================= */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Floating particles (left panel)
  --------------------------------------------------------------------- */
  var particlesEl = document.getElementById("particles");
  if (particlesEl && !prefersReducedMotion) {
    var count = window.innerWidth < 700 ? 14 : 26;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("span");
      p.className = "particle";
      var size = 2 + Math.random() * 4;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
      p.style.animationDuration = (10 + Math.random() * 10) + "s";
      p.style.animationDelay = (Math.random() * 12) + "s";
      particlesEl.appendChild(p);
    }
  }

  /* ---------------------------------------------------------------------
     Password visibility toggle
  --------------------------------------------------------------------- */
  var passwordInput = document.getElementById("password");
  var toggleBtn = document.getElementById("passwordToggle");
  if (passwordInput && toggleBtn) {
    var eyeOpen = toggleBtn.querySelector(".eye-open");
    var eyeClosed = toggleBtn.querySelector(".eye-closed");

    toggleBtn.addEventListener("click", function () {
      var wasShown = passwordInput.type === "text";
      var nowShown = !wasShown;
      passwordInput.type = nowShown ? "text" : "password";
      toggleBtn.setAttribute("aria-pressed", String(nowShown));
      toggleBtn.setAttribute("aria-label", nowShown ? "Hide password" : "Show password");
      eyeOpen.hidden = nowShown;
      eyeClosed.hidden = !nowShown;
    });
  }

  /* ---------------------------------------------------------------------
     Field validation helpers
  --------------------------------------------------------------------- */
  function setFieldState(fieldEl, state, message) {
    fieldEl.classList.remove("is-valid", "is-invalid");
    var errorEl = fieldEl.querySelector(".field__error");
    var input = fieldEl.querySelector("input");

    if (state === "valid") {
      fieldEl.classList.add("is-valid");
      input.setAttribute("aria-invalid", "false");
      if (errorEl) errorEl.textContent = "";
    } else if (state === "invalid") {
      // Force reflow so the shake animation re-triggers on repeated errors
      fieldEl.classList.remove("is-invalid");
      // eslint-disable-next-line no-unused-expressions
      void fieldEl.offsetWidth;
      fieldEl.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = message || "This field is required.";
    } else {
      input.removeAttribute("aria-invalid");
      if (errorEl) errorEl.textContent = "";
    }
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  var emailField = document.getElementById("email") ? document.getElementById("email").closest(".field") : null;
  var passwordField = document.getElementById("password") ? document.getElementById("password").closest(".field") : null;
  var emailInput = document.getElementById("email");

  if (emailInput && emailField) {
    emailInput.addEventListener("blur", function () {
      if (!emailInput.value.trim()) return; // don't nag before they've typed anything
      if (validateEmail(emailInput.value)) {
        setFieldState(emailField, "valid");
      } else {
        setFieldState(emailField, "invalid", "Enter a valid email address.");
      }
    });
    emailInput.addEventListener("input", function () {
      if (emailField.classList.contains("is-invalid") && validateEmail(emailInput.value)) {
        setFieldState(emailField, "valid");
      }
    });
  }

  if (passwordInput && passwordField) {
    passwordInput.addEventListener("blur", function () {
      if (!passwordInput.value) return;
      if (passwordInput.value.length >= 8) {
        setFieldState(passwordField, "valid");
      } else {
        setFieldState(passwordField, "invalid", "Password must be at least 8 characters.");
      }
    });
    passwordInput.addEventListener("input", function () {
      if (passwordField.classList.contains("is-invalid") && passwordInput.value.length >= 8) {
        setFieldState(passwordField, "valid");
      }
    });
  }

  /* ---------------------------------------------------------------------
     Form submit — validation + simulated loading/success button states
  --------------------------------------------------------------------- */
  var form = document.getElementById("loginForm");
  var loginBtn = document.getElementById("loginBtn");
  var status = document.getElementById("formStatus");

  function runFakeLogin() {
    // Simulates a network round trip. Replace with a real fetch() to your
    // auth endpoint; resolve/reject accordingly.
    return new Promise(function (resolve) {
      setTimeout(resolve, 1400);
    });
  }

  if (form && loginBtn && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var emailValid = validateEmail(emailInput.value);
      var passwordValid = passwordInput.value.length >= 8;

      setFieldState(emailField, emailValid ? "valid" : "invalid",
        emailInput.value.trim() ? "Enter a valid email address." : "Email is required.");
      setFieldState(passwordField, passwordValid ? "valid" : "invalid",
        passwordInput.value ? "Password must be at least 8 characters." : "Password is required.");

      if (!emailValid || !passwordValid) {
        status.textContent = "Please fix the highlighted fields.";
        status.classList.add("is-error");
        (emailValid ? passwordInput : emailInput).focus();
        return;
      }

      status.classList.remove("is-error");
      status.textContent = "";
      loginBtn.classList.add("is-loading");
      loginBtn.disabled = true;

      runFakeLogin().then(function () {
        loginBtn.classList.remove("is-loading");
        loginBtn.classList.add("is-success");
        loginBtn.querySelector(".btn__label").textContent = "Logged in";
        status.textContent = "Welcome back — redirecting to your dashboard...";
      });
    });
  }

  /* ---------------------------------------------------------------------
     OAuth buttons (visual only — wire these up to real providers)
  --------------------------------------------------------------------- */
  ["googleBtn", "appleBtn"].forEach(function (id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (status) {
        status.classList.remove("is-error");
        status.textContent = "Redirecting to " + (id === "googleBtn" ? "Google" : "Apple") + "...";
      }
    });
  });
})();