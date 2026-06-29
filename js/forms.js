/* ============================================
   FORMS.JS — Form Validation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initLoginForm();
  initSignupForm();
  initNewsletterForms();
});

/* ---------- Utility: Validate Email ---------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ---------- Utility: Validate Phone ---------- */
function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]{7,15}$/.test(phone);
}

/* ---------- Utility: Show Error ---------- */
function showFieldError(input, errorEl, message) {
  input.classList.add('error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

/* ---------- Utility: Clear Error ---------- */
function clearFieldError(input, errorEl) {
  input.classList.remove('error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

/* ---------- Utility: Clear All Errors in Form ---------- */
function clearFormErrors(form) {
  form.querySelectorAll('.form-input').forEach(input => {
    input.classList.remove('error');
  });
  form.querySelectorAll('.form-error').forEach(err => {
    err.textContent = '';
    err.classList.remove('visible');
  });
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Real-time validation
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = input.parentElement.querySelector('.form-error');
      clearFieldError(input, errorEl);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors(form);

    let isValid = true;

    // Name
    const name = form.querySelector('#contact-name');
    const nameError = name?.parentElement.querySelector('.form-error');
    if (name && name.value.trim().length < 2) {
      showFieldError(name, nameError, 'Please enter your full name.');
      isValid = false;
    }

    // Email
    const email = form.querySelector('#contact-email');
    const emailError = email?.parentElement.querySelector('.form-error');
    if (email && !isValidEmail(email.value)) {
      showFieldError(email, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone
    const phone = form.querySelector('#contact-phone');
    const phoneError = phone?.parentElement.querySelector('.form-error');
    if (phone && !isValidPhone(phone.value)) {
      showFieldError(phone, phoneError, 'Please enter a valid phone number.');
      isValid = false;
    }

    // Subject
    const subject = form.querySelector('#contact-subject');
    const subjectError = subject?.parentElement.querySelector('.form-error');
    if (subject && subject.value.trim().length < 3) {
      showFieldError(subject, subjectError, 'Please enter a subject.');
      isValid = false;
    }

    // Message
    const message = form.querySelector('#contact-message');
    const messageError = message?.parentElement.querySelector('.form-error');
    if (message && message.value.trim().length < 10) {
      showFieldError(message, messageError, 'Message must be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      showToast('Your message has been sent successfully! ✨', 'success');
      form.reset();
    } else {
      showToast('Please fix the errors in the form.', 'error');
    }
  });
}

/* ---------- Login Form ---------- */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  // Real-time validation
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = input.parentElement.querySelector('.form-error') ||
                      input.closest('.form-group')?.querySelector('.form-error');
      if (errorEl) clearFieldError(input, errorEl);
    });
  });

  // Password visibility toggle
  const passwordToggle = form.querySelector('.password-toggle');
  const passwordInput = form.querySelector('#login-password');
  if (passwordToggle && passwordInput) {
    passwordToggle.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      passwordToggle.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors(form);

    let isValid = true;

    // Email
    const email = form.querySelector('#login-email');
    const emailError = email?.closest('.form-group')?.querySelector('.form-error');
    if (email && !isValidEmail(email.value)) {
      showFieldError(email, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // Password
    const password = form.querySelector('#login-password');
    const passwordError = password?.closest('.form-group')?.querySelector('.form-error');
    if (password && password.value.length < 6) {
      showFieldError(password, passwordError, 'Password must be at least 6 characters.');
      isValid = false;
    }

    if (isValid) {
      showToast('Login successful! Welcome back ✨', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showToast('Please fix the errors.', 'error');
    }
  });
}

/* ---------- Signup Form ---------- */
function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  // Real-time validation
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      const errorEl = input.closest('.form-group')?.querySelector('.form-error');
      if (errorEl) clearFieldError(input, errorEl);
    });
  });

  // Password visibility toggles
  form.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.parentElement.querySelector('.form-input');
      if (input) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        toggle.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors(form);

    let isValid = true;

    // Full Name
    const name = form.querySelector('#signup-name');
    const nameError = name?.closest('.form-group')?.querySelector('.form-error');
    if (name && name.value.trim().length < 2) {
      showFieldError(name, nameError, 'Please enter your full name.');
      isValid = false;
    }

    // Email
    const email = form.querySelector('#signup-email');
    const emailError = email?.closest('.form-group')?.querySelector('.form-error');
    if (email && !isValidEmail(email.value)) {
      showFieldError(email, emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone
    const phone = form.querySelector('#signup-phone');
    const phoneError = phone?.closest('.form-group')?.querySelector('.form-error');
    if (phone && !isValidPhone(phone.value)) {
      showFieldError(phone, phoneError, 'Please enter a valid phone number.');
      isValid = false;
    }

    // Password
    const password = form.querySelector('#signup-password');
    const passwordError = password?.closest('.form-group')?.querySelector('.form-error');
    if (password && password.value.length < 8) {
      showFieldError(password, passwordError, 'Password must be at least 8 characters.');
      isValid = false;
    }

    // Confirm Password
    const confirm = form.querySelector('#signup-confirm');
    const confirmError = confirm?.closest('.form-group')?.querySelector('.form-error');
    if (confirm && confirm.value !== password?.value) {
      showFieldError(confirm, confirmError, 'Passwords do not match.');
      isValid = false;
    }

    // Terms
    const terms = form.querySelector('#signup-terms');
    const termsError = form.querySelector('#terms-error');
    if (terms && !terms.checked) {
      if (termsError) {
        termsError.textContent = 'You must agree to the terms and conditions.';
        termsError.classList.add('visible');
      }
      isValid = false;
    }

    if (isValid) {
      showToast('Account created successfully! ✨', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } else {
      showToast('Please fix the errors.', 'error');
    }
  });
}

/* ---------- Newsletter Forms ---------- */
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;

      if (!isValidEmail(input.value)) {
        input.classList.add('error');
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      input.classList.remove('error');
      showToast('Subscribed successfully! Welcome to our cosmic community ✨', 'success');
      form.reset();
    });
  });
}
