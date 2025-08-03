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
  if (btn_desactive_search && sec_search) {
    btn_desactive_search.addEventListener("click", e => {
      e.preventDefault();
      sec_search.style.display = 'none';
    });
  }  if (sec_search) {
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
  // Ruta universal para nav_mobile.html según profundidad
  // Función universal para obtener la ruta del menú móvil
  function getNavPath() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    // Si el HTML está en la raíz del proyecto (ej: /repo/master.html o /master.html)
    if (
      (pathParts.length === 1 && pathParts[0].endsWith('.html')) || // /master.html
      (pathParts.length === 2 && pathParts[1].endsWith('.html'))     // /repo/master.html
    ) {
      // Si hay repo, úsalo; si no, ruta directa
      const repo = pathParts.length === 2 ? `/${pathParts[0]}` : '';
      return `${repo}/components/nav_mobile.html`;
    }
    // Si está en subcarpeta, calcula profundidad
    const depth = pathParts.length - 1;
    return '../'.repeat(depth) + 'components/nav_mobile.html';
  }
  fetch(getNavPath())
    .then(response => response.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      document.body.appendChild(tempDiv.firstElementChild);
      // Inicializar eventos del menú móvil después de insertar
      const navMobile = document.querySelector('.container-nav-mobile');
      const btn_open = document.querySelector('.fa-bars');
      if (btn_open && navMobile) {
        btn_open.addEventListener('click', (e) => {
          navMobile.classList.add('active-nav-mobile');
          navMobile.style.display = 'flex';
          document.querySelector('body').classList.add('body_y');
        });
      }
      const btn_close_nav_mobile = document.getElementById('close_nav_mobile');
      if (btn_close_nav_mobile) {
        btn_close_nav_mobile.addEventListener('click', () => {
          if (navMobile) {
            navMobile.classList.remove('active-nav-mobile');
            navMobile.style.display = 'none';
            document.querySelector('body').classList.remove('body_y');
          }
        });
      }
    })
    .catch(err => {
      console.error('No se pudo cargar nav_mobile.html:', err);
    });
});