document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

  // ---------- Scroll suave + navegación activa ----------
  const links = document.querySelectorAll('nav.site-nav a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: scrollBehavior });
          history.pushState(null, '', targetId);
        }
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const isCurrent = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    document.querySelectorAll('section.doc-section').forEach(section => sectionObserver.observe(section));
  }

  // ---------- Botón volver arriba ----------
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.type = 'button';
  backToTopBtn.textContent = '▲';
  backToTopBtn.title = 'Volver arriba';
  backToTopBtn.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
  });

  // ---------- Filtros de proyectos (categoría + búsqueda combinadas) ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projectsGrid');
  const searchInput = document.getElementById('projectSearch');

  let currentFilter = 'all';
  let currentQuery = '';

  // Mensaje estilo terminal cuando no hay coincidencias
  const emptyMsg = document.createElement('p');
  emptyMsg.setAttribute('role', 'status');
  emptyMsg.style.cssText = [
    'display:none',
    'margin-top:1rem',
    'padding:0.7rem 1rem',
    'border-radius:6px',
    'background:#062d52',
    'color:#a6f55a',
    'font-family:Consolas,"JetBrains Mono","Fira Code","DejaVu Sans Mono",monospace',
    'font-size:0.85rem',
    'text-shadow:0 0 8px rgba(150,240,80,0.7)'
  ].join(';');
  if (projectsGrid) {
    projectsGrid.insertAdjacentElement('afterend', emptyMsg);
  }

  function applyFilters() {
    let visible = 0;

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matchesCategory = currentFilter === 'all' || category === currentFilter;
      const matchesQuery = currentQuery === '' || card.textContent.toLowerCase().includes(currentQuery);
      const show = matchesCategory && matchesQuery;

      card.style.display = show ? 'flex' : 'none';
      if (show) visible++;
    });

      if (visible === 0) {
        const scope = currentFilter === 'all' ? './proyectos' : './proyectos/' + currentFilter;
        const term = currentQuery === '' ? '*' : '"' + currentQuery + '"';
        emptyMsg.textContent = '$ grep -ri ' + term + ' ' + scope + '  # 0 resultados';
        emptyMsg.style.display = 'block';
      } else {
        emptyMsg.style.display = 'none';
      }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // ---------- Gráficos ----------
  renderCharts(reduceMotion);
});

/* ==========================================================
 *  Gráfico de dona glossy (estilo Aero) con leyenda e interacción
 *  ========================================================== */
function renderCharts(reduceMotion) {
  const canvas = document.getElementById('langChart');
  if (!canvas || !canvas.getContext) return;

  const data = [
    { label: 'TypeScript', count: 114, color: '#1b78c8' },
    { label: 'JavaScript', count: 73, color: '#f0a81c' },
    { label: 'HTML / CSS', count: 59, color: '#2fb8e0' },
    { label: 'Java', count: 29, color: '#6fbf1f' },
    { label: 'Python / C / Rust', count: 3, color: '#7a93aa' }
  ];
  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Nitidez en pantallas de alta densidad
  const size = 220;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute(
    'aria-label',
    'Distribución de archivos por lenguaje: ' + data.map(d => d.label + ' ' + d.count).join(', ')
  );

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const cx = size / 2;
  const cy = size / 2;
  const outer = 96;
  const inner = 54;
  const pointerOffset = 6;
  const monoFont = 'Consolas, "JetBrains Mono", "Fira Code", "DejaVu Sans Mono", monospace';

  // Ángulos de cada porción (empiezan arriba)
  let acc = -Math.PI / 2;
  data.forEach(item => {
    item.start = acc;
    item.end = acc + (item.count / total) * 2 * Math.PI;
    acc = item.end;
  });

  let hover = -1;
  let progress = reduceMotion ? 1 : 0;

  function lighten(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    const mix = c => Math.round(c + (255 - c) * amount);
    return 'rgb(' + mix(r) + ',' + mix(g) + ',' + mix(b) + ')';
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);

    const sweepLimit = -Math.PI / 2 + progress * 2 * Math.PI;

    data.forEach((item, i) => {
      if (item.start >= sweepLimit) return;
      const end = Math.min(item.end, sweepLimit);

      // La porción resaltada se separa un poco del centro
      let dx = 0;
      let dy = 0;
      if (i === hover) {
        const mid = (item.start + item.end) / 2;
        dx = Math.cos(mid) * pointerOffset;
        dy = Math.sin(mid) * pointerOffset;
      }

      ctx.save();
      ctx.translate(dx, dy);

      ctx.beginPath();
      ctx.arc(cx, cy, outer, item.start, end);
      ctx.arc(cx, cy, inner, end, item.start, true);
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
      grad.addColorStop(0, lighten(item.color, 0.45));
      grad.addColorStop(1, item.color);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();
    });

    // Brillo de vidrio sobre la mitad superior del anillo
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, 2 * Math.PI);
    ctx.moveTo(cx + inner, cy);
    ctx.arc(cx, cy, inner, 0, 2 * Math.PI, true);
    ctx.clip('evenodd');
    const gloss = ctx.createLinearGradient(0, cy - outer, 0, cy);
    gloss.addColorStop(0, 'rgba(255,255,255,0.55)');
    gloss.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gloss;
    ctx.fillRect(cx - outer - 10, cy - outer - 10, (outer + 10) * 2, outer + 10);
    ctx.restore();

    // Texto central
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#07335a';
    if (hover >= 0) {
      const item = data[hover];
      ctx.font = 'bold 24px ' + monoFont;
      ctx.fillText(String(item.count), cx, cy - 6);
      ctx.font = '10px ' + monoFont;
      ctx.fillStyle = '#3d607c';
      ctx.fillText(item.label, cx, cy + 14);
    } else {
      ctx.font = 'bold 26px ' + monoFont;
      ctx.fillText(String(total), cx, cy - 6);
      ctx.font = '10px ' + monoFont;
      ctx.fillStyle = '#3d607c';
      ctx.fillText('archivos', cx, cy + 14);
    }
  }

  function setHover(index) {
    if (hover === index) return;
    hover = index;
    draw();
  }

  // Interacción con el mouse sobre el gráfico
  canvas.addEventListener('mousemove', e => {
    if (progress < 1) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (size / rect.width) - cx;
    const y = (e.clientY - rect.top) * (size / rect.height) - cy;
    const dist = Math.sqrt(x * x + y * y);

    let found = -1;
    if (dist >= inner - 4 && dist <= outer + pointerOffset) {
      let angle = Math.atan2(y, x);
      if (angle < -Math.PI / 2) angle += 2 * Math.PI;
      found = data.findIndex(item => angle >= item.start && angle < item.end);
    }
    canvas.style.cursor = found >= 0 ? 'pointer' : 'default';
    setHover(found);
  });

  canvas.addEventListener('mouseleave', () => {
    canvas.style.cursor = 'default';
    setHover(-1);
  });

  // Leyenda al lado del gráfico (sincronizada con el hover)
  const container = canvas.parentElement;
  container.style.flexWrap = 'wrap';
  container.style.alignItems = 'center';
  container.style.gap = '1.5rem 2.5rem';

  const legend = document.createElement('ul');
  legend.style.cssText = 'list-style:none;margin:0;padding:0;font-size:0.9rem;';

  data.forEach((item, i) => {
    const li = document.createElement('li');
    li.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:0.6rem',
      'padding:0.25rem 0.6rem',
      'border-radius:5px',
      'border:1px solid transparent',
      'cursor:default'
    ].join(';');

    const swatch = document.createElement('span');
    swatch.style.cssText =
    'width:14px;height:14px;border-radius:50%;border:1px solid rgba(0,40,80,0.5);flex:0 0 auto;' +
    'background:radial-gradient(circle at 35% 30%,#fff 0,' + lighten(item.color, 0.35) + ' 30%,' + item.color + ' 100%);';

    const name = document.createElement('span');
    name.textContent = item.label;
    name.style.cssText = 'flex:1 1 auto;';

    const stat = document.createElement('span');
    const pct = Math.round((item.count / total) * 100);
    stat.textContent = item.count + ' · ' + pct + '%';
    stat.style.cssText = 'font-family:' + monoFont + ';font-size:0.8rem;color:#3d607c;margin-left:1rem;';

    li.append(swatch, name, stat);

    li.addEventListener('mouseenter', () => {
      if (progress < 1) return;
      li.style.background = 'linear-gradient(180deg,#eaf7ff,#cfeafc)';
      li.style.borderColor = '#9fd0f0';
      setHover(i);
    });
    li.addEventListener('mouseleave', () => {
      li.style.background = '';
      li.style.borderColor = 'transparent';
      setHover(-1);
    });

    legend.appendChild(li);
  });

  container.appendChild(legend);

  // Animación de barrido única al entrar en pantalla
  draw();
  if (progress < 1) {
    const startAnimation = () => {
      const duration = 900;
      const t0 = performance.now();
      const step = now => {
        const t = Math.min((now - t0) / duration, 1);
        progress = 1 - Math.pow(1 - t, 3);
        draw();
        if (t < 1) requestAnimationFrame(step);
      };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      const chartObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          startAnimation();
        }
      }, { threshold: 0.4 });
      chartObserver.observe(canvas);
    } else {
      progress = 1;
      draw();
    }
  }
}
