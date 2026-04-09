// ========================================
// DARK/LIGHT THEME TOGGLE - ADDED
// ========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeIcon(true);
  } else {
    body.classList.remove('dark-mode');
    updateThemeIcon(false);
  }
}

function updateThemeIcon(isDark) {
  const icon = themeToggle.querySelector('i');
  if (isDark) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

themeToggle.addEventListener('click', () => {
  const isDarkMode = body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateThemeIcon(isDarkMode);
});

document.addEventListener('DOMContentLoaded', loadTheme);

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

// Close overlay when clicking anywhere
menuOverlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  menuOverlay.classList.remove('active');
});

const btn = document.getElementById("backToTop");
const progress = document.getElementById("progress");
const circumference = 2 * Math.PI * 28; // circle radius = 28

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollPercent = scrollTop / scrollHeight;

  // Show button after some scrolling
  btn.style.display = scrollTop > 200 ? "flex" : "none";

  // Update circular progress
  progress.style.strokeDashoffset = circumference * (1 - scrollPercent);
});

btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Animate unloading effect
  let unload = setInterval(() => {
    let currentOffset = parseFloat(progress.style.strokeDashoffset);
    if (currentOffset >= circumference) {
      clearInterval(unload);
    } else {
      progress.style.strokeDashoffset = currentOffset + 5;
    }
  }, 20);
});


// Contact form submission with success/error feedback
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault(); // stop default redirect
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.textContent = "✅ Message sent successfully!";
          status.className = "success";
          status.style.display = "block";
          form.reset();
        } else {
          status.textContent = "❌ Oops! Something went wrong.";
          status.className = "error";
          status.style.display = "block";
        }
      } catch (error) {
        status.textContent = "❌ Network error. Please try again.";
        status.className = "error";
        status.style.display = "block";
      }
    });
  }

  // Sermon filter + search
  const filterSelect = document.getElementById("filter");
  const searchInput = document.getElementById("searchFilter");

  if (filterSelect && searchInput) {
    filterSelect.addEventListener("change", function () {
      const filterValue = this.value.toUpperCase();
      const sermons = document.querySelectorAll('.sermon-item');

      sermons.forEach(sermon => {
        const category = sermon.getAttribute('data-category').toUpperCase();
        if (filterValue === 'ALL' || filterValue === category) {
          sermon.style.display = 'flex';
        } else {
          sermon.style.display = 'none';
        }
      });
    });

    // Search sermons live
    searchInput.addEventListener("keyup", function () {
      const searchTerm = this.value.toUpperCase();
      const sermons = document.querySelectorAll('.sermon-item');

      sermons.forEach(sermon => {
        const title = sermon.querySelector('h3').textContent.toUpperCase();
        if (title.includes(searchTerm)) {
          sermon.style.display = 'flex';
        } else {
          sermon.style.display = 'none';
        }
      });
    });
  }
});
// Ensure only one sermon plays at a time
const sermonAudios = document.querySelectorAll('.sermon-audio');

sermonAudios.forEach(audio => {
  audio.addEventListener('play', () => {
    // Pause all other audios
    sermonAudios.forEach(otherAudio => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.currentTime = 0; // optional: reset to start
      }
    });
  });
});

// ========================================
// EVENT CALENDAR - ADDED
// ========================================

const events = [
  { date: '2026-04-05', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-04-10', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-04-11', title: 'Victory Night', time: '5:00 PM' },
  { date: '2026-04-12', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-04-17', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-04-19', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-04-24', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-04-26', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-05-01', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-05-03', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-05-08', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-05-10', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-05-15', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-05-17', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-05-22', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-05-24', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-05-29', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-05-31', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-06-05', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-06-07', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-06-12', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-06-14', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-06-19', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-06-21', title: 'Sunday Service', time: '5:00 PM' },
    { date: '2026-06-26', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-06-28', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-07-03', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-07-05', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-07-10', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-07-12', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-07-17', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-07-19', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-07-24', title: 'School of Prayer', time: '7:00 PM' },
  { date: '2026-07-26', title: 'Sunday Service', time: '5:00 PM' },
  { date: '2026-07-31', title: 'School of Prayer', time: '7:00 PM' },
];

let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  document.getElementById('currentMonth').textContent = 
    currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  const calendarGrid = document.getElementById('calendarGrid');
  calendarGrid.innerHTML = '';
  
  // Day headers
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayHeaders.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.textContent = day;
    dayHeader.style.fontWeight = 'bold';
    dayHeader.style.color = '#ffcc00';
    dayHeader.style.padding = '10px';
    calendarGrid.appendChild(dayHeader);
  });
  
  // Empty cells before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarGrid.appendChild(document.createElement('div'));
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    dayCell.textContent = day;
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasEvent = events.some(e => e.date === dateStr);
    
    if (hasEvent) {
      dayCell.classList.add('event');
    }
    
    const today = new Date();
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dayCell.classList.add('today');
    }
    
    calendarGrid.appendChild(dayCell);
  }
  
  renderEventsList();
}

function renderEventsList() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';
  
  if (monthEvents.length === 0) {
    eventsList.innerHTML = '<p style="color: #999;">No events this month</p>';
    return;
  }
  
  monthEvents.forEach(event => {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    eventDiv.innerHTML = `
      <div class="event-date">${dateStr}</div>
      <div class="event-title">${event.title}</div>
      <div class="event-time">⏰ ${event.time}</div>
    `;
    
    eventsList.appendChild(eventDiv);
  });
}

document.getElementById('prevMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initialize calendar
if (document.getElementById('calendarGrid')) {
  renderCalendar();
}
// ========================================
// FADE-IN ON SCROLL - ADDED
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  fadeElements.forEach(el => observer.observe(el));
});
