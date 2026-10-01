/**
 * CaféBinario - JavaScript Principal
 * Desarrollado por The KernelGarden para Vonsai
 * Armenia, Quindío - Colombia
 */

// ===================== CONFIGURACIÓN GLOBAL =====================
const CONFIG = {
  darkModeKey: 'cafebinario-dark-mode',
  menuOpenClass: 'menu-open',
  darkModeClass: 'dark-mode',
  animationDuration: 300
};

// ===================== MENÚ MÓVIL =====================
class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('menuToggle');
    this.navLinks = document.querySelector('.nav-links');
    this.body = document.body;
    
    this.init();
  }

  init() {
    if (!this.menuToggle || !this.navLinks) return;

    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.navLinks.setAttribute('aria-hidden', 'true');

    this.menuToggle.addEventListener('click', () => this.toggle());
    
    // Cerrar menú al hacer click en un enlace
    this.navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      const clickedInsideNavbar = e.target.closest('.navbar');
      if (!clickedInsideNavbar) {
        this.close();
      }
    });

    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  toggle() {
    const isOpen = this.body.classList.contains(CONFIG.menuOpenClass);
    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.body.classList.add(CONFIG.menuOpenClass);
    this.navLinks.classList.add('active');
    this.navLinks.setAttribute('aria-hidden', 'false');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.menuToggle.innerHTML = '✕';
  }

  close() {
    this.body.classList.remove(CONFIG.menuOpenClass);
    this.navLinks.classList.remove('active');
    this.navLinks.setAttribute('aria-hidden', 'true');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.innerHTML = '☰';
  }
}

// ===================== MODO OSCURO =====================
class DarkMode {
  constructor() {
    this.toggle = null;
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    this.init();
  }

  init() {
    // Crear toggle si no existe
    this.createToggle();
    
    // Aplicar modo guardado o preferencia del sistema
    const savedMode = localStorage.getItem(CONFIG.darkModeKey);
    if (savedMode === 'true') {
      this.enable();
    } else if (savedMode === 'false') {
      this.disable();
    } else if (this.prefersDark.matches) {
      this.enable();
    }

    // Escuchar cambios en la preferencia del sistema
    this.prefersDark.addEventListener('change', (e) => {
      if (localStorage.getItem(CONFIG.darkModeKey) === null) {
        e.matches ? this.enable() : this.disable();
      }
    });
  }

  createToggle() {
    // Crear botón de modo oscuro en el navbar
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    this.toggle = document.createElement('button');
    this.toggle.className = 'btn btn-icon dark-mode-toggle';
    this.toggle.innerHTML = '🌙';
    this.toggle.setAttribute('aria-label', 'Alternar modo oscuro');
    this.toggle.addEventListener('click', () => this.toggleMode());
    
    navActions.insertBefore(this.toggle, navActions.firstChild);
  }

  toggleMode() {
    if (document.body.classList.contains(CONFIG.darkModeClass)) {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable() {
    document.body.classList.add(CONFIG.darkModeClass);
    if (this.toggle) this.toggle.innerHTML = '☀️';
    localStorage.setItem(CONFIG.darkModeKey, 'true');
  }

  disable() {
    document.body.classList.remove(CONFIG.darkModeClass);
    if (this.toggle) this.toggle.innerHTML = '🌙';
    localStorage.setItem(CONFIG.darkModeKey, 'false');
  }
}

// ===================== NAVEGACIÓN SUAVE =====================
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navbarHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Actualizar URL sin hacer scroll
          history.pushState(null, null, href);
        }
      });
    });
  }
}

// ===================== NAVBAR STICKY =====================
class StickyNavbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScroll = 0;
    
    this.init();
  }

  init() {
    if (!this.navbar) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Agregar sombra cuando hay scroll
      if (currentScroll > 0) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Ocultar navbar al hacer scroll hacia abajo
      if (currentScroll > this.lastScroll && currentScroll > 100) {
        this.navbar.classList.add('navbar-hidden');
      } else {
        this.navbar.classList.remove('navbar-hidden');
      }

      this.lastScroll = currentScroll;
    });
  }
}

// ===================== ANIMACIONES AL SCROLL =====================
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    // Observar elementos animables
    document.querySelectorAll('.card, .article-card, .team-card').forEach(el => {
      observer.observe(el);
    });
  }
}

// ===================== BÚSQUEDA DE ARTÍCULOS =====================
class ArticleSearch {
  constructor() {
    this.searchInput = null;
    this.articles = [];
    
    this.init();
  }

  init() {
    this.createSearchBar();
    this.gatherArticles();
  }

  createSearchBar() {
    const articlesSection = document.querySelector('#explorar');
    if (!articlesSection) return;

    const header = articlesSection.querySelector('.section-header');
    if (!header) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
      <input 
        type="search" 
        class="search-input" 
        placeholder="🔍 Buscar artículos..." 
        aria-label="Buscar artículos"
      />
      <div class="search-results" hidden></div>
    `;

    header.appendChild(searchContainer);

    this.searchInput = searchContainer.querySelector('.search-input');
    this.resultsContainer = searchContainer.querySelector('.search-results');

    this.searchInput.addEventListener('input', (e) => this.search(e.target.value));
  }

  gatherArticles() {
    document.querySelectorAll('.article-card').forEach(card => {
      const title = card.querySelector('h3')?.textContent || '';
      const description = card.querySelector('p')?.textContent || '';
      const tag = card.querySelector('.tag')?.textContent || '';

      this.articles.push({
        element: card,
        title: title.toLowerCase(),
        description: description.toLowerCase(),
        tag: tag.toLowerCase()
      });
    });
  }

  search(query) {
    query = query.toLowerCase().trim();

    if (query.length < 2) {
      this.showAllArticles();
      return;
    }

    this.articles.forEach(article => {
      const matches = 
        article.title.includes(query) ||
        article.description.includes(query) ||
        article.tag.includes(query);

      if (matches) {
        article.element.style.display = '';
      } else {
        article.element.style.display = 'none';
      }
    });
  }

  showAllArticles() {
    this.articles.forEach(article => {
      article.element.style.display = '';
    });
  }
}

// ===================== CONTADOR DE ESTADÍSTICAS =====================
class StatsCounter {
  constructor() {
    this.stats = [];
    this.animated = false;
    
    this.init();
  }

  init() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animateStats();
          this.animated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
      const target = stat.textContent;
      const isPercentage = target.includes('%');
      const value = parseInt(target.replace(/\D/g, ''));
      
      if (isNaN(value)) return;

      let current = 0;
      const increment = value / 50; // 50 pasos
      const duration = 1500; // 1.5 segundos
      const stepTime = duration / 50;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = isPercentage 
            ? Math.floor(current) + '%'
            : Math.floor(current) + '+';
        }
      }, stepTime);
    });
  }
}

// ===================== COPIAR AL PORTAPAPELES =====================
class ClipboardHelper {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('code').forEach(codeBlock => {
      if (codeBlock.textContent.length > 20) {
        this.addCopyButton(codeBlock);
      }
    });
  }

  addCopyButton(codeBlock) {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = '📋';
    button.setAttribute('aria-label', 'Copiar código');
    
    button.addEventListener('click', () => {
      this.copyToClipboard(codeBlock.textContent, button);
    });

    codeBlock.parentElement.style.position = 'relative';
    codeBlock.parentElement.appendChild(button);
  }

  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      button.innerHTML = '✓';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.innerHTML = '📋';
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
      button.innerHTML = '✗';
    }
  }
}

// ===================== LAZY LOADING DE IMÁGENES =====================
class LazyLoadImages {
  constructor() {
    this.init();
  }

  init() {
    if ('loading' in HTMLImageElement.prototype) {
      // Navegador soporta lazy loading nativo
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else {
      // Fallback para navegadores antiguos
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
      });
    }
  }
}

// ===================== NOTIFICACIONES =====================
class Notifications {
  constructor() {
    this.container = null;
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'notifications-container';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-icon">${this.getIcon(type)}</span>
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Cerrar">✕</button>
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.hide(notification));

    this.container.appendChild(notification);

    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto-ocultar
    if (duration > 0) {
      setTimeout(() => this.hide(notification), duration);
    }

    return notification;
  }

  hide(notification) {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), CONFIG.animationDuration);
  }

  getIcon(type) {
    const icons = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠️',
      error: '✗'
    };
    return icons[type] || icons.info;
  }
}

// ===================== INICIALIZACIÓN =====================
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  new MobileMenu();
  new DarkMode();
  new SmoothScroll();
  new StickyNavbar();
  new ScrollAnimations();
  new ArticleSearch();
  new StatsCounter();
  new ClipboardHelper();
  new LazyLoadImages();

  // Instancia global de notificaciones
  window.notifications = new Notifications();

  // Mostrar mensaje de bienvenida
  console.log('%c☕ CaféBinario', 'font-size: 20px; font-weight: bold; color: #6b4423;');
  console.log('%cDesarrollado por The KernelGarden para Vonsai', 'color: #666;');
  console.log('%cArmenia, Quindío - Colombia 🇨🇴', 'color: #666;');

  // Easter egg
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
      window.notifications.show('🎉 ¡Has desbloqueado el modo cafetero! ☕', 'success', 5000);
      document.body.classList.add('easter-egg-active');
    }
  });
});

// ===================== EXPORTS =====================
// Hacer disponibles las clases globalmente para uso externo
window.CafeBinario = {
  MobileMenu,
  DarkMode,
  SmoothScroll,
  StickyNavbar,
  ScrollAnimations,
  ArticleSearch,
  StatsCounter,
  ClipboardHelper,
  LazyLoadImages,
  Notifications
};