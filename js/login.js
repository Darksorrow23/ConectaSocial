// Página de inicio de sesión y registro (AC-2).
// Requiere auth.js cargado antes.

(() => {
  if (AuthService.currentUser()) {
    window.location.replace("index.html");
    return;
  }

  const form = document.getElementById("auth-form");
  const title = document.getElementById("auth-title");
  const sub = document.getElementById("auth-sub");
  const nameField = document.getElementById("name-field");
  const submitBtn = document.getElementById("auth-submit");
  const toggleText = document.getElementById("toggle-text");
  const toggleBtn = document.getElementById("toggle-mode");
  const message = document.getElementById("form-message");

  let registerMode = new URLSearchParams(window.location.search).get("modo") === "registro";

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `form-message ${type || ""}`;
  }

  function updateMode() {
    title.textContent = registerMode ? "Crea tu cuenta" : "Inicia sesión";
    sub.textContent = registerMode
      ? "Únete para participar en comunidades y crear eventos."
      : "Entra para participar en comunidades y crear eventos.";
    nameField.hidden = !registerMode;
    nameField.querySelector("input").required = registerMode;
    submitBtn.textContent = registerMode ? "Crear cuenta" : "Entrar";
    toggleText.textContent = registerMode ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?";
    toggleBtn.textContent = registerMode ? "Inicia sesión" : "Regístrate";
    showMessage("");
  }

  toggleBtn.addEventListener("click", () => {
    registerMode = !registerMode;
    updateMode();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    submitBtn.disabled = true;
    try {
      if (registerMode) {
        await AuthService.register(data);
      } else {
        await AuthService.login(data);
      }
      showMessage("Listo, te estamos llevando al inicio…", "ok");
      window.location.href = "index.html";
    } catch (error) {
      showMessage(error.message, "error");
      submitBtn.disabled = false;
    }
  });

  updateMode();
})();
