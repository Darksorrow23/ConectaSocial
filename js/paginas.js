// Páginas a las que llega el menú desplegable (AC-1).
// Por ahora muestran el título y un estado vacío; el contenido real llega en sprints siguientes.

(() => {
  const params = new URLSearchParams(window.location.search);
  const page = document.body.dataset.page;
  const title = document.getElementById("page-title");
  const lead = document.getElementById("page-lead");
  const content = document.getElementById("page-content");

  if (page === "category") {
    const categoria = CATEGORIAS.find((c) => c.id === params.get("cat"));
    if (!categoria) {
      title.textContent = "Categoría no encontrada";
      lead.textContent = "Elige una categoría desde el menú.";
      return;
    }
    document.title = `${categoria.nombre} · ConectaSocial`;
    title.textContent = `${categoria.icono} ${categoria.nombre}`;
    lead.textContent = "Negocios, organizaciones y comunidades de este movimiento.";
    content.textContent = "Muy pronto vas a encontrar aquí el directorio de esta categoría.";
  }

  if (page === "seccion") {
    const nombre = SECCIONES[params.get("s")];
    if (!nombre) {
      title.textContent = "Sección no encontrada";
      lead.textContent = "Elige una sección desde el menú.";
      return;
    }
    document.title = `${nombre} · ConectaSocial`;
    title.textContent = nombre;
    lead.textContent = "Esta sección está en construcción.";
    content.textContent = "Muy pronto vas a encontrar aquí el contenido de esta sección.";
  }
})();
