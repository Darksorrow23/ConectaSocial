// Datos base de la aplicación. Cuando exista el backend, esto vendrá de la API.

const CATEGORIAS = [
  { id: "feminismo", nombre: "Feminismo", icono: "♀" },
  { id: "lgbtq", nombre: "LGBTQ+", icono: "🏳️‍🌈" },
  { id: "antirracismo", nombre: "Antirracismo", icono: "✊" },
  { id: "medio-ambiente", nombre: "Medio Ambiente", icono: "🌱" },
  { id: "veganismo", nombre: "Veganismo", icono: "🌿" },
];

// Definición del menú principal (AC-17: el menú se construye a partir de estos datos).
const MENU = [
  {
    etiqueta: "Categorías",
    items: CATEGORIAS.map((c) => ({
      etiqueta: c.nombre,
      href: `category.html?cat=${c.id}`,
    })),
  },
  { etiqueta: "Eventos", href: "seccion.html?s=eventos" },
  { etiqueta: "Noticias", href: "seccion.html?s=noticias" },
  { etiqueta: "Recetas Veganas", href: "seccion.html?s=recetas" },
];

const SECCIONES = {
  eventos: "Eventos",
  noticias: "Noticias",
  recetas: "Recetas Veganas",
};
