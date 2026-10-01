(() => {
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const sections = [...document.querySelectorAll('section[id], header[id]')];
  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

  const setActiveLink = () => {
    const middle = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0]?.id;

    sections.forEach((section) => {
      if (middle >= section.offsetTop) current = section.id;
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
})();
