/* ============================================
   BOOKING.JS — Multi-Step Booking Flow
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBookingFlow();
});

function initBookingFlow() {
  const container = document.getElementById('booking-container');
  if (!container) return;

  const state = {
    currentStep: 1,
    totalSteps: 6,
    readingType: null,
    reader: null,
    date: null,
    time: null,
    calendarMonth: new Date().getMonth(),
    calendarYear: new Date().getFullYear()
  };

  const readingTypes = [
    { id: 'love', name: 'Love Reading', icon: 'fas fa-heart', desc: 'Uncover the mysteries of your love life and relationships.' },
    { id: 'career', name: 'Career Reading', icon: 'fas fa-briefcase', desc: 'Gain clarity on your professional path and opportunities.' },
    { id: 'general', name: 'General Guidance', icon: 'fas fa-star', desc: 'Receive comprehensive spiritual guidance for your life journey.' },
    { id: 'astrology', name: 'Astrology', icon: 'fas fa-moon', desc: 'Explore your cosmic blueprint through the stars.' },
    { id: 'chakra', name: 'Chakra Healing', icon: 'fas fa-yin-yang', desc: 'Balance your energy centers for holistic well-being.' }
  ];

  const readers = [
    { id: 1, name: 'Mystic Luna', specialty: 'Love & Relationships', exp: '12 years', rating: 4.9, price: '$45/session' },
    { id: 2, name: 'Sage Aurora', specialty: 'Career & Finance', exp: '8 years', rating: 4.8, price: '$40/session' },
    { id: 3, name: 'Oracle Celeste', specialty: 'Spiritual Growth', exp: '15 years', rating: 5.0, price: '$55/session' },
    { id: 4, name: 'Seer Artemis', specialty: 'Astrology & Zodiac', exp: '10 years', rating: 4.7, price: '$42/session' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  // Initial render
  renderStep();

  // Navigation buttons
  const prevBtn = document.getElementById('booking-prev');
  const nextBtn = document.getElementById('booking-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (state.currentStep > 1) {
        state.currentStep--;
        renderStep();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (validateStep()) {
        if (state.currentStep < state.totalSteps) {
          state.currentStep++;
          renderStep();
        }
      }
    });
  }

  function validateStep() {
    switch (state.currentStep) {
      case 1:
        if (!state.readingType) {
          showToast('Please select a reading type.', 'error');
          return false;
        }
        return true;
      case 2:
        if (!state.reader) {
          showToast('Please select a reader.', 'error');
          return false;
        }
        return true;
      case 3:
        if (!state.date) {
          showToast('Please select a date.', 'error');
          return false;
        }
        return true;
      case 4:
        if (!state.time) {
          showToast('Please select a time slot.', 'error');
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  function renderStep() {
    updateProgressIndicators();
    updateNavigationButtons();
    renderStepContent();
    // Scroll to content
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateProgressIndicators() {
    const indicators = document.querySelectorAll('.booking-step-indicator');
    const connectors = document.querySelectorAll('.step-connector');

    indicators.forEach((ind, i) => {
      const stepNum = i + 1;
      ind.classList.remove('active', 'completed');
      if (stepNum === state.currentStep) {
        ind.classList.add('active');
      } else if (stepNum < state.currentStep) {
        ind.classList.add('completed');
      }
    });

    connectors.forEach((con, i) => {
      con.classList.toggle('active', i + 1 < state.currentStep);
    });
  }

  function updateNavigationButtons() {
    if (prevBtn) {
      prevBtn.style.display = state.currentStep > 1 && state.currentStep < 6 ? 'inline-flex' : 'none';
    }
    if (nextBtn) {
      if (state.currentStep === 5) {
        nextBtn.textContent = 'Confirm Booking';
        nextBtn.style.display = 'inline-flex';
      } else if (state.currentStep >= 6) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.innerHTML = 'Next Step <i class="fas fa-arrow-right"></i>';
        nextBtn.style.display = 'inline-flex';
      }
    }
  }

  function renderStepContent() {
    const content = document.getElementById('booking-step-content');
    if (!content) return;

    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';

    setTimeout(() => {
      switch (state.currentStep) {
        case 1: renderReadingTypes(content); break;
        case 2: renderReaders(content); break;
        case 3: renderCalendar(content); break;
        case 4: renderTimeSlots(content); break;
        case 5: renderSummary(content); break;
        case 6: renderConfirmation(content); break;
      }

      requestAnimationFrame(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        content.style.transition = 'all 0.4s ease';
      });
    }, 200);
  }

  /* Step 1: Reading Types */
  function renderReadingTypes(container) {
    container.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-2" style="font-family: var(--font-heading); color: var(--white);">Choose Your Reading Type</h3>
      <p class="text-center mb-8" style="color: var(--moonlight);">Select the type of spiritual guidance you seek</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${readingTypes.map(rt => `
          <div class="booking-step-card ${state.readingType === rt.id ? 'selected' : ''}" data-reading="${rt.id}" id="reading-${rt.id}">
            <i class="${rt.icon} text-3xl mb-4" style="color: var(--lavender);"></i>
            <h4 class="text-lg font-bold mb-2" style="color: var(--white);">${rt.name}</h4>
            <p class="text-sm" style="color: var(--moonlight);">${rt.desc}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.booking-step-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.booking-step-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.readingType = card.dataset.reading;
      });
    });
  }

  /* Step 2: Choose Reader */
  function renderReaders(container) {
    container.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-2" style="font-family: var(--font-heading); color: var(--white);">Choose Your Reader</h3>
      <p class="text-center mb-8" style="color: var(--moonlight);">Select a spiritual guide for your session</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${readers.map(r => `
          <div class="booking-step-card ${state.reader?.id === r.id ? 'selected' : ''}" data-reader-id="${r.id}" id="reader-option-${r.id}">
            <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style="background: var(--gradient-glow);">
              <i class="fas fa-user" style="color: white;"></i>
            </div>
            <h4 class="text-lg font-bold mb-1" style="color: var(--white);">${r.name}</h4>
            <p class="text-sm mb-1" style="color: var(--lavender);">${r.specialty}</p>
            <p class="text-sm mb-2" style="color: var(--moonlight);">${r.exp} experience</p>
            <div class="flex items-center justify-center gap-1 mb-2">
              <span class="star-rating">${'★'.repeat(Math.floor(r.rating))}${r.rating % 1 ? '☆' : ''}</span>
              <span class="text-sm" style="color: var(--mystic-gold);">${r.rating}</span>
            </div>
            <p class="font-bold" style="color: var(--mystic-gold);">${r.price}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.booking-step-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.booking-step-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const id = parseInt(card.dataset.readerId);
        state.reader = readers.find(r => r.id === id);
      });
    });
  }

  /* Step 3: Calendar */
  function renderCalendar(container) {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const today = new Date();

    const firstDay = new Date(state.calendarYear, state.calendarMonth, 1).getDay();
    const daysInMonth = new Date(state.calendarYear, state.calendarMonth + 1, 0).getDate();

    let calendarHTML = days.map(d => `<div class="calendar-day header-day">${d}</div>`).join('');

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      calendarHTML += `<div class="calendar-day disabled"></div>`;
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(state.calendarYear, state.calendarMonth, d);
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isToday = dateObj.toDateString() === today.toDateString();
      const isSelected = state.date && dateObj.toDateString() === new Date(state.date).toDateString();

      const classes = ['calendar-day'];
      if (isPast) classes.push('disabled');
      if (isToday) classes.push('today');
      if (isSelected) classes.push('selected');

      calendarHTML += `<div class="${classes.join(' ')}" data-date="${dateObj.toISOString()}" ${isPast ? '' : `id="cal-day-${d}"`}>${d}</div>`;
    }

    container.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-2" style="font-family: var(--font-heading); color: var(--white);">Choose Your Date</h3>
      <p class="text-center mb-8" style="color: var(--moonlight);">Select a date for your reading session</p>
      <div class="max-w-md mx-auto glass-card-static p-6">
        <div class="flex items-center justify-between mb-4">
          <button class="text-lg px-3 py-1 rounded" style="color: var(--lavender);" id="cal-prev"><i class="fas fa-chevron-left"></i></button>
          <h4 class="text-lg font-bold" style="color: var(--white);">${months[state.calendarMonth]} ${state.calendarYear}</h4>
          <button class="text-lg px-3 py-1 rounded" style="color: var(--lavender);" id="cal-next"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid">${calendarHTML}</div>
      </div>
    `;

    // Calendar navigation
    document.getElementById('cal-prev')?.addEventListener('click', () => {
      state.calendarMonth--;
      if (state.calendarMonth < 0) {
        state.calendarMonth = 11;
        state.calendarYear--;
      }
      renderCalendar(container);
    });

    document.getElementById('cal-next')?.addEventListener('click', () => {
      state.calendarMonth++;
      if (state.calendarMonth > 11) {
        state.calendarMonth = 0;
        state.calendarYear++;
      }
      renderCalendar(container);
    });

    // Date selection
    container.querySelectorAll('.calendar-day:not(.disabled):not(.header-day)').forEach(cell => {
      cell.addEventListener('click', () => {
        container.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        state.date = cell.dataset.date;
      });
    });
  }

  /* Step 4: Time Slots */
  function renderTimeSlots(container) {
    container.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-2" style="font-family: var(--font-heading); color: var(--white);">Choose Your Time</h3>
      <p class="text-center mb-8" style="color: var(--moonlight);">Select an available time slot for your session</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
        ${timeSlots.map((slot, i) => `
          <div class="time-slot ${state.time === slot ? 'selected' : ''}" data-time="${slot}" id="time-slot-${i}">
            <i class="fas fa-clock mr-1 text-sm"></i> ${slot}
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.time-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        container.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        state.time = slot.dataset.time;
      });
    });
  }

  /* Step 5: Summary */
  function renderSummary(container) {
    const readingInfo = readingTypes.find(rt => rt.id === state.readingType);
    const dateFormatted = state.date ? new Date(state.date).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) : '';

    container.innerHTML = `
      <h3 class="text-2xl font-bold text-center mb-2" style="font-family: var(--font-heading); color: var(--white);">Booking Summary</h3>
      <p class="text-center mb-8" style="color: var(--moonlight);">Review your session details before confirming</p>
      <div class="max-w-lg mx-auto glass-card-static p-8">
        <div class="space-y-4">
          <div class="flex justify-between items-center py-3" style="border-bottom: 1px solid var(--glass-border);">
            <span style="color: var(--moonlight);">Reading Type</span>
            <span class="font-semibold" style="color: var(--white);">${readingInfo?.name || ''}</span>
          </div>
          <div class="flex justify-between items-center py-3" style="border-bottom: 1px solid var(--glass-border);">
            <span style="color: var(--moonlight);">Reader</span>
            <span class="font-semibold" style="color: var(--white);">${state.reader?.name || ''}</span>
          </div>
          <div class="flex justify-between items-center py-3" style="border-bottom: 1px solid var(--glass-border);">
            <span style="color: var(--moonlight);">Date</span>
            <span class="font-semibold" style="color: var(--white);">${dateFormatted}</span>
          </div>
          <div class="flex justify-between items-center py-3" style="border-bottom: 1px solid var(--glass-border);">
            <span style="color: var(--moonlight);">Time</span>
            <span class="font-semibold" style="color: var(--white);">${state.time || ''}</span>
          </div>
          <div class="flex justify-between items-center py-3">
            <span style="color: var(--moonlight);">Price</span>
            <span class="text-xl font-bold" style="color: var(--mystic-gold);">${state.reader?.price || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  /* Step 6: Confirmation */
  function renderConfirmation(container) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    container.innerHTML = `
      <div class="text-center py-8">
        <div class="success-checkmark">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="text-3xl font-bold mb-4" style="font-family: var(--font-heading); color: var(--white);">Booking Confirmed!</h3>
        <p class="text-lg mb-2" style="color: var(--moonlight);">Your session has been booked successfully.</p>
        <p class="mb-6" style="color: var(--lavender);">A confirmation email has been sent to your inbox.</p>
        <div class="glass-card-static p-6 max-w-md mx-auto mb-8">
          <p class="mb-2"><span style="color: var(--moonlight);">Booking ID:</span> <span class="font-bold" style="color: var(--mystic-gold);">#TR${Math.random().toString(36).substring(2, 8).toUpperCase()}</span></p>
          <p class="mb-2"><span style="color: var(--moonlight);">Reader:</span> <span class="font-semibold" style="color: var(--white);">${state.reader?.name || ''}</span></p>
          <p><span style="color: var(--moonlight);">Date & Time:</span> <span class="font-semibold" style="color: var(--white);">${state.date ? new Date(state.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''} at ${state.time || ''}</span></p>
        </div>
        <a href="index.html" class="btn-primary">
          <i class="fas fa-home"></i> Return Home
        </a>
      </div>
    `;
  }
}
