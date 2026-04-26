/* ============================================
   OCEAN PROPERTIES — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Mobile Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function revealOnScroll() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load

  // ---- Testimonial Slider ----
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  let currentSlide = 0;
  let totalSlides = 0;
  let autoSlideInterval;

  if (testimonialTrack) {
    totalSlides = testimonialTrack.children.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    testimonialDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoSlide();
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlide();
      });
    }

    // Auto-slide
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
        resetAutoSlide();
      }
    }, { passive: true });
  }

  // ---- Properties Filter (Properties Page) ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  const propertyCards = document.querySelectorAll('.property-card[data-category]');

  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        propertyCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- Contact Form Handling ----
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('.btn-submit');
      const messageDiv = document.getElementById('formMessage');
      
      // Get form values
      const name = formData.get('name')?.trim();
      const phone = formData.get('phone')?.trim();
      const email = formData.get('email')?.trim();

      // Validation
      if (!name || !phone) {
        showFormMessage(messageDiv, 'Please fill in your name and phone number.', 'error');
        return;
      }

      if (phone && !/^[6-9]\d{9}$/.test(phone)) {
        showFormMessage(messageDiv, 'Please enter a valid 10-digit Indian phone number.', 'error');
        return;
      }

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return;
      }

      // Show loading
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      submitBtn.disabled = true;

      // Build WhatsApp message with form details
      const propertyType = formData.get('propertyType') || 'Not specified';
      const preferredDate = formData.get('preferredDate') || 'Not specified';
      const budget = formData.get('budget') || 'Not specified';
      const message = formData.get('message') || 'No additional message';
      
      const whatsappMessage = encodeURIComponent(
        `Hi Ocean Properties! I submitted an inquiry via your website.\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Email:* ${email || 'Not provided'}\n` +
        `*Property Type:* ${propertyType}\n` +
        `*Budget:* ${budget}\n` +
        `*Preferred Date:* ${preferredDate}\n` +
        `*Message:* ${message}`
      );

      const whatsappURL = `https://wa.me/919911402454?text=${whatsappMessage}`;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showFormMessage(messageDiv, '✅ Thank you! Redirecting you to WhatsApp to confirm your inquiry...', 'success');
        contactForm.reset();

        // Open WhatsApp with pre-filled message
        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1500);
      }, 1500);
    });
  }

  function showFormMessage(element, message, type) {
    if (!element) return;
    element.className = `form-message ${type}`;
    element.textContent = message;
    element.style.display = 'block';
    
    setTimeout(() => {
      element.style.display = 'none';
    }, 6000);
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('.counter');

  function animateCounter(counter) {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';

    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = target / 60;
    const stepTime = 2000 / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  function checkCounters() {
    counters.forEach(counter => {
      const elementTop = counter.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 50) {
        animateCounter(counter);
      }
    });
  }

  window.addEventListener('scroll', checkCounters);
  checkCounters();

  // Fallback: animate counters after 3s even if scroll detection fails
  setTimeout(() => {
    counters.forEach(counter => animateCounter(counter));
  }, 3000);

  // ---- Parallax Effect for Hero ----
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    });
  }

  // ---- Navbar Active Link for Current Page ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      // Don't remove hash-based active states
      if (!href.startsWith('#')) {
        link.classList.add('active');
      }
    }
  });

});

// Fade in animation keyframe (for filter)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
