document.addEventListener('DOMContentLoaded', function() {
  const chageURL = (url) => {
    location.href = url;
  }
  const viewImage = (src) => {
    window.open("" + src, "_blank");
  }
  const btn_active_search = document.querySelectorAll('#active_search');
  const btn_desactive_search = document.querySelector('#desactive_search');
  const sec_search = document.querySelector('#sec_search');
  if (btn_active_search.length && sec_search) {
    btn_active_search.forEach(lupa => {
      lupa.addEventListener("click", e => {
        e.preventDefault();
        sec_search.style.display = 'flex';
        const input = sec_search.querySelector('input[type="search"]');
        if (input) setTimeout(() => input.focus(), 100);
      });
    });
  }
  // Detectar base path dinámicamente
  let basePath = '';
  const pathMatch = window.location.pathname.match(/^(\/[^\/]+\/)/);
  if (pathMatch) {
    basePath = pathMatch[1];
  }
  const navPath = basePath + 'components/nav_mobile.html';
  fetch(navPath)
    .then(response => response.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      document.body.appendChild(tempDiv.firstElementChild);
      // Actualizar los enlaces del menú móvil para usar el basePath
      const navMobile = document.querySelector('.container-nav-mobile');
      if (navMobile) {
        navMobile.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') && !/^([a-z]+:|#|\/)/i.test(link.getAttribute('href'))) {
            link.setAttribute('href', basePath + link.getAttribute('href'));
          }
        });
        // Inicializar eventos del menú móvil
        const btn_open = document.querySelector('.fa-bars');
        if (btn_open) {
          btn_open.addEventListener('click', (e) => {
            navMobile.classList.add('active-nav-mobile');
            navMobile.style.display = 'flex';
            document.body.classList.add('body_y');
          });
        }
        const btn_close_nav_mobile = document.getElementById('close_nav_mobile');
        if (btn_close_nav_mobile) {
          btn_close_nav_mobile.addEventListener('click', () => {
            navMobile.classList.remove('active-nav-mobile');
            navMobile.style.display = 'none';
            document.body.classList.remove('body_y');
          });
        }
      }
    })
    .catch(err => {
      console.error('No se pudo cargar nav_mobile.html:', err);
    });
  if (sec_search) {
    sec_search.addEventListener('mousedown', function(e) {
      const form = sec_search.querySelector('form');
      if (form && !form.contains(e.target)) {
        sec_search.style.display = 'none';
      }
    });
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sec_search.style.display === 'flex') {
        sec_search.style.display = 'none';
      }
    });
  }
});