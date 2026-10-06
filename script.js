document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const starsLayer = document.getElementById('starsLayer');
  if (starsLayer) {
    const starsCount = 28;

    for (let i = 0; i < starsCount; i += 1) {
      const star = document.createElement('span');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDuration = `${10 + Math.random() * 18}s`;
      star.style.animationDelay = `${Math.random() * 12}s`;
      star.style.opacity = `${0.2 + Math.random() * 0.8}`;
      star.style.transform = `scale(${0.4 + Math.random() * 1.4})`;
      starsLayer.appendChild(star);
    }
  }

  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('themeMode');

  if (savedTheme === 'light') {
    localStorage.setItem('themeMode', 'dark');
  }

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-theme', isDark);

    if (themeToggle) {
      themeToggle.innerHTML = isDark ? '<i class="bi bi-moon-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
    }
  };

  const initialTheme = 'dark';
  applyTheme(initialTheme);
  localStorage.setItem('themeMode', 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
      localStorage.setItem('themeMode', nextTheme);
      applyTheme(nextTheme);
    });
  }

  const certificateInput = document.getElementById('certificateUpload');
  const certificateImage = document.getElementById('certificateImage');
  const certificateUploadButton = document.getElementById('certificateUploadButton');

  if (certificateUploadButton && certificateInput) {
    certificateUploadButton.addEventListener('click', () => {
      certificateInput.click();
    });
  }

  if (certificateInput && certificateImage) {
    const savedCertificate = localStorage.getItem('certificateImage');
    if (savedCertificate) {
      certificateImage.src = savedCertificate;
    }

    certificateInput.addEventListener('change', (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        certificateImage.src = imageData;
        localStorage.setItem('certificateImage', imageData);
      };

      reader.readAsDataURL(file);
    });
  }

  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add('active');
      }
    });
  };

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const setActiveLink = () => {
    let currentSection = 'home';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink);
});
