// ========================================
// PORTFÓLIO - KAUAN MEDEIROS
// Script principal
// ========================================

// === TEMA ===
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Aplica tema antes do render para evitar flash
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', theme);
}

// Chama antes do DOM carregar
initTheme();

// Toggle de tema
function toggleTheme() {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// === MENU MOBILE ===
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');

function toggleMenu() {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isOpen);
  navList.classList.toggle('active');
}

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navList.classList.remove('active');
}

// Fecha menu ao clicar em link
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fecha menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header__nav') && !e.target.closest('.menu-toggle')) {
    closeMenu();
  }
});

// === SCROLL REVEAL ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

// === COPIAR E-MAIL ===
const emailCopyBtn = document.querySelector('.email-copy');

function copyEmail() {
  const email = 'kauanmm11.web@gmail.com';
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      showCopyFeedback();
    }).catch(() => {
      fallbackCopyEmail(email);
    });
  } else {
    fallbackCopyEmail(email);
  }
}

function fallbackCopyEmail(email) {
  const textArea = document.createElement('textarea');
  textArea.value = email;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Erro ao copiar:', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopyFeedback() {
  const originalText = emailCopyBtn.innerHTML;
  emailCopyBtn.classList.add('copied');
  emailCopyBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    Copiado!
  `;
  
  setTimeout(() => {
    emailCopyBtn.classList.remove('copied');
    emailCopyBtn.innerHTML = originalText;
  }, 2000);
}

// === RENDER PROJETOS ===
function renderProjects() {
  const projectsGrid = document.querySelector('.projects__grid');
  
  if (!projectsGrid || !projectsData) return;
  
  projectsGrid.innerHTML = projectsData.map(project => {
    const isDemo = project.description.includes('[PROJETO DEMONSTRATIVO]');
    const cleanDescription = project.description.replace('[PROJETO DEMONSTRATIVO]', '').trim();
    
    return `
    <article class="project-card reveal">
      <div class="project-card__header">
        <h3 class="project-card__title">${project.title}</h3>
        ${isDemo ? '<span class="project-badge">Projeto Demonstrativo</span>' : ''}
      </div>
      <p class="project-card__description">${cleanDescription}</p>
      <div class="project-card__tags">
        ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
      </div>
      <div class="project-card__links">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver código no GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Código
        </a>
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver projeto ao vivo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          Demo
        </a>
      </div>
    </article>
  `;
  }).join('');
}

// === RENDER SKILLS ===
function renderSkills() {
  const skillsGrid = document.querySelector('.skills__grid');
  
  if (!skillsGrid || !skillsData) return;
  
  skillsGrid.innerHTML = Object.values(skillsData).map(category => `
    <div class="skills__category reveal">
      <h3 class="skills__category-title">${category.title}</h3>
      <div class="skills__list">
        ${category.skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// === FOOTER ANO ===
function updateFooterYear() {
  const yearElement = document.querySelector('.footer__year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
  // Event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', copyEmail);
  }
  
  // Render dinâmico
  renderProjects();
  renderSkills();
  updateFooterYear();
  
  // Scroll reveal
  initScrollReveal();
});