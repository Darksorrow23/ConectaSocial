// Navbar y footer compartidos por todas las páginas (AC-1 y AC-17).
// Requiere data.js y auth.js cargados antes.

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderMenuItem(item) {
  if (!item.items) {
    return `<li><a href="${item.href}">${item.etiqueta}</a></li>`;
  }

  const links = item.items
    .map((sub) => `<li><a href="${sub.href}">${sub.etiqueta}</a></li>`)
    .join("");

  return `
    <li class="nav-item">
      <button class="btn-link nav-trigger" type="button" aria-expanded="false">${item.etiqueta} ▾</button>
      <ul class="dropdown">${links}</ul>
    </li>`;
}

function renderActions(user) {
  if (user) {
    return `
      <span class="nav-user">Hola, ${escapeHtml(user.nombre.split(" ")[0])}</span>
      <button class="btn-link" type="button" id="logout-btn">Cerrar sesión</button>`;
  }
  return `
    <a href="login.html">Iniciar sesión</a>
    <a class="btn" href="login.html?modo=registro">Registrarse</a>`;
}

function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  header.className = "site-header";
  header.innerHTML = `
    <div class="container nav" id="nav">
      <a class="brand" href="index.html">
        <span class="brand-mark">CS</span>
        <span class="brand-name">Conecta<span>Social</span></span>
      </a>
      <button class="nav-toggle" type="button" id="nav-toggle" aria-expanded="false">Menú</button>
      <ul class="nav-menu">${MENU.map(renderMenuItem).join("")}</ul>
      <div class="nav-actions">${renderActions(AuthService.currentUser())}</div>
    </div>`;

  bindHeaderEvents();
}

function bindHeaderEvents() {
  const nav = document.getElementById("nav");

  // Menú móvil
  const toggle = document.getElementById("nav-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Desplegable: con mouse y teclado lo maneja el CSS; el clic cubre pantallas táctiles.
  document.querySelectorAll(".nav-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      const open = item.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".nav-item.open").forEach((item) => {
      if (!item.contains(event.target)) {
        item.classList.remove("open");
        item.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
      }
    });
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      AuthService.logout();
      window.location.href = "index.html";
    });
  }
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-row">
      <span>© ${new Date().getFullYear()} ConectaSocial</span>
      <span>Juntas construimos un mundo más justo</span>
    </div>`;
}

renderHeader();
renderFooter();
