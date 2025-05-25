import { NoroffRegisterUrl } from "./config.mjs";

const registerFormEl = document.getElementById("registerForm");

registerFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerFormEl);

  const formDataInput = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio"),
    avatar: {
      url: formData.get("avatarUrl"),
      alt: formData.get("avatarAlt"),
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataInput),
  };

  try {
    const response = await fetch(`${NoroffRegisterUrl}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    window.location.href = "./login.html";
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
});
