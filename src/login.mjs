import { saveToken, saveUsername } from "./auth.mjs";

const loginFormEl = document.getElementById("loginForm");

loginFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginFormEl);
  const UrlParamData = new URLSearchParams(formData);

  const options = {
    method: "POST",
    body: UrlParamData,
  };

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/auth/login",
      options
    );
    const { data } = await response.json();
    const authToken = data.accessToken;
    const username = data.name;

    if (response.ok) {
      saveToken(authToken);
      saveUsername(username);
      window.location.href = "../post/manage.html";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Wrong email or password. Please try again.");
  }
});
