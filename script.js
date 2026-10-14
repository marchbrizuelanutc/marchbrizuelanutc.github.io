// Marchie Brizuela - Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 2. Navbar Scrolled Shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Interactive ROAS & Lead Gen Calculator
  initCalculator();

  // 5. Stat Counter Animation
  initCounters();
});

// Calculator Logic
function initCalculator() {
  const budgetSlider = document.getElementById('budgetSlider');
  const cplSlider = document.getElementById('cplSlider');
  const roasSlider = document.getElementById('roasSlider');
  const leadCloseSlider = document.getElementById('leadCloseSlider');

  const budgetValue = document.getElementById('budgetValue');
  const cplValue = document.getElementById('cplValue');
  const roasValue = document.getElementById('roasValue');
  const leadCloseValue = document.getElementById('leadCloseValue');

  const calcRevenue = document.getElementById('calcRevenue');
  const calcRoasLabel = document.getElementById('calcRoasLabel');
  const calcSpendLabel = document.getElementById('calcSpendLabel');
  const calcLeads = document.getElementById('calcLeads');
  const calcClosed = document.getElementById('calcClosed');
  const calcNetProfit = document.getElementById('calcNetProfit');
  const calcRoi = document.getElementById('calcRoi');

  function updateCalculations() {
    const budget = parseFloat(budgetSlider.value);
    const cpl = parseFloat(cplSlider.value);
    const roas = parseFloat(roasSlider.value);
    const closeRate = parseFloat(leadCloseSlider.value) / 100;

    // Format input displays
    budgetValue.textContent = '£' + budget.toLocaleString();
    cplValue.textContent = '£' + cpl.toFixed(2);
    roasValue.textContent = roas.toFixed(1) + 'x';
    leadCloseValue.textContent = (closeRate * 100).toFixed(0) + '%';

    // Math calculations
    const revenue = budget * roas;
    const leads = Math.round(budget / cpl);
    const closed = Math.round(leads * closeRate);
    const netProfit = revenue - budget;
    const roi = Math.round((netProfit / budget) * 100);

    // Update Result elements
    calcRevenue.textContent = '£' + Math.round(revenue).toLocaleString();
    calcSpendLabel.textContent = '£' + budget.toLocaleString();
    calcRoasLabel.textContent = roas.toFixed(1) + 'x';
    calcLeads.textContent = leads.toLocaleString();
    calcClosed.textContent = closed.toLocaleString();
    calcNetProfit.textContent = '£' + Math.round(netProfit).toLocaleString();
    calcRoi.textContent = roi.toLocaleString() + '%';
  }

  if (budgetSlider && cplSlider && roasSlider && leadCloseSlider) {
    [budgetSlider, cplSlider, roasSlider, leadCloseSlider].forEach(slider => {
      slider.addEventListener('input', updateCalculations);
    });
    updateCalculations();
  }
}

// Copy to Clipboard with Toast
function copyText(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    if (buttonElement) {
      buttonElement.style.color = '#10b981';
      setTimeout(() => {
        buttonElement.style.color = '';
      }, 1800);
    }
  }).catch(err => {
    console.error('Clipboard copy failed:', err);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// Contact Form Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const business = document.getElementById('business').value || 'Not specified';
  const spend = document.getElementById('monthlySpend').value;
  const service = document.getElementById('servicesNeeded').value;
  const message = document.getElementById('message').value;

  const subject = encodeURIComponent(`Media Buying Inquiry from ${name} (${business})`);
  const body = encodeURIComponent(
`Hello Marchie,

I would like to discuss media buying and paid campaign services with you.

Name: ${name}
Email: ${email}
Company: ${business}
Current Monthly Ad Spend: ${spend}
Primary Objective: ${service}

Details:
${message}

Looking forward to connecting!
`
  );

  const mailtoUrl = `mailto:marchiebusiness@gmail.com?subject=${subject}&body=${body}`;

  const toastSuccess = document.getElementById('formSuccessToast');
  if (toastSuccess) {
    toastSuccess.classList.remove('hidden');
  }

  // Open email client
  window.location.href = mailtoUrl;
}

// Counter Animations
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const increment = target / 40;

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 25);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}
