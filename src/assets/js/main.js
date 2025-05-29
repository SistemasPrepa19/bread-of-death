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

  // Mostrar/ocultar el botón y cambiar el estilo del nav
  if (homeSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const isHomeVisible = entry.isIntersecting;

          if (btnTop) {
            btnTop.classList.toggle('visible', !isHomeVisible);
          }

          if (nav) {
            nav.classList.toggle('in-home', isHomeVisible);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(homeSection);
  }

  // Scroll suave a #home al hacer click
  if (btnTop) {
    btnTop.addEventListener('click', (e) => {
      e.preventDefault();
      const home = document.querySelector('#home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: ir al top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
