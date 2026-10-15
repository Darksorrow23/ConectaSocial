// Servicio de autenticación (AC-16).
//
// Por ahora guarda los usuarios en localStorage para poder avanzar sin backend.
// Cuando exista la API, solo hay que reemplazar el cuerpo de register/login/logout;
// el resto de la aplicación usa únicamente los métodos de AuthService.

const AuthService = (() => {
  const USERS_KEY = "cs_users";
  const SESSION_KEY = "cs_session";
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MIN_PASSWORD = 8;

  function readUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  }

  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async function hash(text) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  function startSession(user) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ nombre: user.nombre, email: user.email })
    );
  }

  function validateEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  async function register({ nombre, email, password }) {
    nombre = (nombre || "").trim();
    email = (email || "").trim().toLowerCase();

    if (!nombre) throw new Error("Escribe tu nombre completo.");
    if (!validateEmail(email)) throw new Error("El correo no tiene un formato válido.");
    if (!password || password.length < MIN_PASSWORD) {
      throw new Error(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.`);
    }

    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error("Ya existe una cuenta con ese correo.");
    }

    const user = { nombre, email, passwordHash: await hash(password) };
    users.push(user);
    writeUsers(users);
    startSession(user);
    return { nombre, email };
  }

  async function login({ email, password }) {
    email = (email || "").trim().toLowerCase();

    if (!validateEmail(email)) throw new Error("El correo no tiene un formato válido.");
    if (!password) throw new Error("Escribe tu contraseña.");

    const user = readUsers().find((u) => u.email === email);
    if (!user || user.passwordHash !== (await hash(password))) {
      throw new Error("Correo o contraseña incorrectos.");
    }

    startSession(user);
    return { nombre: user.nombre, email: user.email };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  }

  return { register, login, logout, currentUser };
})();
