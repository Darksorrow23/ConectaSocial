# ConectaSocial

Plataforma para conectar personas con negocios, organizaciones y comunidades de movimientos sociales
(Feminismo, LGBTQ+, Antirracismo, Medio Ambiente, Veganismo).

## Cómo ejecutarlo

Es HTML, CSS y JavaScript sin dependencias. Abre `index.html` en el navegador, o sirve la carpeta:

```bash
npx serve .
```

## Estructura

```
index.html        Inicio
login.html        Inicio de sesión y registro
category.html     Página de cada categoría (?cat=id)
seccion.html      Eventos, Noticias y Recetas (?s=nombre)
css/styles.css    Estilos globales
js/data.js        Categorías y definición del menú
js/auth.js        Servicio de autenticación
js/navbar.js      Navbar y footer compartidos
js/login.js       Lógica del formulario de acceso
js/paginas.js     Contenido de category.html y seccion.html
assets/hero.jpg   Foto del hero (opcional, exportarla desde Figma)
```

## Sprint 1

- AC-1 Menú desplegable de opciones
- AC-2 Registro de inicio y de sesión de los usuarios
- AC-16 Sistema de autenticación y gestión de usuarios
- AC-17 Componente de menú de navegación dinámico

Nota: la autenticación usa `localStorage` mientras no exista backend. Está aislada en `js/auth.js`
para reemplazarla por la API sin tocar el resto del código.
