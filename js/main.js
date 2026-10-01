document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll & Active nav
  const links = document.querySelectorAll('nav.site-nav a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.textContent = '▲ Top';
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search filter
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const query = e.target.value.toLowerCase();
      projectCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Render Canvas Charts
  renderCharts();
});

function renderCharts() {
  const canvasLang = document.getElementById('langChart');
  if (canvasLang && canvasLang.getContext) {
    const ctx = canvasLang.getContext('2d');
    const data = [
      { label: 'TypeScript', count: 114, color: '#0055a5' },
      { label: 'JavaScript', count: 73, color: '#b45309' },
      { label: 'HTML/CSS', count: 59, color: '#0284c7' },
      { label: 'Java', count: 29, color: '#1e293b' },
      { label: 'Python / C / Rust', count: 3, color: '#64748b' }
    ];
    
    let total = data.reduce((sum, item) => sum + item.count, 0);
    let startAngle = 0;

    const centerX = canvasLang.width / 2;
    const centerY = canvasLang.height / 2;
    const radius = 90;

    data.forEach(item => {
      const sliceAngle = (item.count / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      startAngle += sliceAngle;
    });
  }
}
