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
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const isIntersecting = entry.isIntersecting;
        const section = entry.target;
        const sectionId = section.id;

        // Mostrar/ocultar botón "Top"
        if (sectionId === 'home' && btnTop) {
          btnTop.classList.toggle('visible', !isIntersecting);
        }

        // Cambiar estilo del nav
        if (sectionId === 'home' && nav) {
          nav.classList.toggle('in-home', isIntersecting);
        }

        // Activar link del nav
        if (isIntersecting) {
          navLinks.forEach(link => {
            const target = link.getAttribute('data-target');
            link.classList.toggle('active', target === sectionId);
          });

          // Mostrar la sección gradualmente
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));

  if (btnTop) {
    btnTop.addEventListener('click', (e) => {
      e.preventDefault();
      const home = document.querySelector('#home');
      if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ==============================
  // GALERÍA DINÁMICA - BREAD OF DEATH
  // ==============================
  const carousel = document.querySelector('.gallery-carousel');
  const dots = document.querySelectorAll('.gallery-indicators .dot');
  const prevBtn = document.querySelector('.gallery-btn.prev');
  const nextBtn = document.querySelector('.gallery-btn.next');
  const images = document.querySelectorAll('.gallery-carousel img');

  if (carousel && images.length > 0) {
    let index = 0;

    function updateGallery() {
      const width = images[0].clientWidth + 25; // ancho + margen
      carousel.style.transform = `translateX(-${index * width}px)`;

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => {
      index = (index > 0) ? index - 1 : images.length - 1;
      updateGallery();
    });

    nextBtn?.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateGallery();
    });

    setInterval(() => {
      index = (index + 1) % images.length;
      updateGallery();
    }, 5000);

    updateGallery();
  }
});
