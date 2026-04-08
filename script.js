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


