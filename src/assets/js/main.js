Promise.all([
  fetch("/src/components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header-container").innerHTML = data;
    }),

  fetch("/src/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    }),

  fetch("/src/components/main.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("main-container").innerHTML = data;
    })
]).then(() => {
  const btnTop = document.querySelector('.btn-top');
  const nav = document.querySelector('nav');
  const homeSection = document.querySelector('#home');

  if (homeSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const isHomeVisible = entry.isIntersecting;

          // Botón arriba
          if (btnTop) {
            btnTop.classList.toggle('visible', !isHomeVisible);
          }

          // Estilo nav
          if (nav) {
            nav.classList.toggle('in-home', isHomeVisible);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(homeSection);
  }

  // Acción de scroll al top
  if (btnTop) {
    btnTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});


btnTop.addEventListener('click', (e) => {
  e.preventDefault();
  const home = document.querySelector('#home');
  home?.scrollIntoView({ behavior: 'smooth' });
});
