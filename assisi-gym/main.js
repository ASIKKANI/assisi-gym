/* ==========================================================================
   ASSISI GYM - INTERACTIVE LOGIC & INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navbar & Scroll Effects ---
  const navbar = document.getElementById('navbar');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- 2. Mobile Menu Navigation Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    // Toggle body scroll when menu is open to prevent background scrolling
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });


  // --- 3. Active Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNavLink = () => {
    const scrollPos = window.scrollY + 100; // Offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);


  // --- 4. Interactive BMI Calculator ---
  const bmiForm = document.getElementById('bmiForm');
  const bmiHeight = document.getElementById('bmiHeight');
  const bmiWeight = document.getElementById('bmiWeight');
  const bmiResult = document.getElementById('bmiResult');
  const bmiValue = document.getElementById('bmiValue');
  const bmiStatus = document.getElementById('bmiStatus');
  const bmiAdvice = document.getElementById('bmiAdvice');
  const bmiProgress = document.getElementById('bmiProgress');
  const chartItems = document.querySelectorAll('.bmi-chart-item');

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(bmiHeight.value) / 100; // Convert to meters
    const weight = parseFloat(bmiWeight.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) return;

    // Calculate BMI score
    const bmi = (weight / (height * height)).toFixed(1);

    // Update Result UI text & display result card
    bmiValue.textContent = bmi;
    bmiResult.classList.remove('hidden');

    let statusText = '';
    let adviceText = '';
    let progressWidth = 0;
    let categoryClass = '';

    // Clear previous active states in the chart
    chartItems.forEach(item => item.classList.remove('active'));

    // Determine status, advice, progress width, and highlight corresponding row
    if (bmi < 18.5) {
      statusText = 'Underweight';
      adviceText = 'Focus on calorie surplus and Hypertrophy training to build muscle mass safely.';
      progressWidth = 25;
      categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      statusText = 'Normal Weight';
      adviceText = 'You are in a healthy weight range! Maintain this with our Strength & Cardio programs.';
      progressWidth = 50;
      categoryClass = 'normal';
    } else if (bmi >= 25 && bmi <= 29.9) {
      statusText = 'Overweight';
      adviceText = 'Adopt a combination of caloric deficit, resistance training, and endurance cardio.';
      progressWidth = 75;
      categoryClass = 'overweight';
    } else {
      statusText = 'Obese';
      adviceText = 'Focus on structured weight loss, low-impact cardio, and core conditioning work.';
      progressWidth = 100;
      categoryClass = 'obese';
    }

    bmiStatus.textContent = statusText;
    bmiAdvice.textContent = adviceText;
    
    // Set custom colors for result text based on status
    if (categoryClass === 'underweight') bmiValue.style.color = '#3b82f6';
    if (categoryClass === 'normal') bmiValue.style.color = '#10b981';
    if (categoryClass === 'overweight') bmiValue.style.color = '#f59e0b';
    if (categoryClass === 'obese') bmiValue.style.color = '#ef4444';

    // Animate progress bar width
    setTimeout(() => {
      bmiProgress.style.width = `${progressWidth}%`;
    }, 100);

    // Highlight row in side table
    const targetItem = document.querySelector(`.bmi-chart-item.${categoryClass}`);
    if (targetItem) {
      targetItem.classList.add('active');
    }

    // Scroll slightly to view result on small devices
    bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });


  // --- 5. Package Selection Shortcut ---
  const planSelectButtons = document.querySelectorAll('.select-plan-btn');
  const contactPlanDropdown = document.getElementById('contactPlan');

  planSelectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedPlan = btn.getAttribute('data-plan');
      
      // Update contact form dropdown selection
      if (contactPlanDropdown) {
        contactPlanDropdown.value = selectedPlan;
      }
      
      // Smooth scroll to the contact form section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        e.preventDefault();
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // --- 6. Form Submission Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect data (simulation)
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const phone = document.getElementById('contactPhone').value;
      const plan = document.getElementById('contactPlan').value;
      const message = document.getElementById('contactMessage').value;

      console.log('Sending Member Trial Request:', { name, email, phone, plan, message });

      // Hide the form fields
      contactForm.classList.add('hidden');
      
      // Show custom success card
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
      }
    });
  }

  // --- 7. Intersection Observer for Scroll Reveals ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
});
