const TOKEN_KEY = "authToken";
const AUTO_LOGOUT_TIME = 5 * 60 * 1000;

let logoutTimer;

export function resetLogoutTimer() {
  const isLoggedIn = getToken();

  if (!isLoggedIn) return;

  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    logout();
    alert("You were logged out due to inactivity.");
    window.location.href = "/account/login.html";
  }, AUTO_LOGOUT_TIME);
}

export function startAutoLogoutListener() {
  ["click", "mousemove", "keydown", "scroll", "touchstart"].forEach((event) =>
    window.addEventListener(event, resetLogoutTimer)
  );

  resetLogoutTimer();
}

export function isAdmin() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  removeToken();
  removeUsername();
  debugger;
}

export function saveUsername(username) {
  localStorage.setItem("username", username);
}

export function getUserNameFromLS() {
  return localStorage.getItem("username");
}

export function removeUsername() {
  localStorage.removeItem("username");
}

export function setupLogin() {
  const isLoggedIn = document.getElementById("isLoggedIn");
  if (!isLoggedIn) return;

  if (getToken()) {
    isLoggedIn.textContent = "Sign out";
    isLoggedIn.addEventListener("click", () => {
      logout();
      window.location.href = "../account/login.html";
    });
  } else {
    isLoggedIn.textContent = "Sign in";
    isLoggedIn.addEventListener("click", () => {
      window.location.href = "../account/login.html";
    });
  }
}
