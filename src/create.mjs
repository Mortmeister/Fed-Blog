import {
  AUTH_KEY,
  API_KEY,
  NoroffURL,
  deleteBlogPost,
  updateImagePreview,
} from "./config.mjs";

import { getUserNameFromLS, getToken } from "./auth.mjs";

const PostForm = document.getElementById("blogPostForm");
const username = getUserNameFromLS();
const authToken = getToken();

const postImageUrl = document.getElementById("url");

postImageUrl.addEventListener("input", updateImagePreview);

updateImagePreview();

PostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(PostForm);
  const title = formData.get("title");
  const body = formData.get("body");
  const tags = formData.getAll("tags");
  const url = formData.get("url");
  const alt = formData.get("alt");

  const postData = {
    title,
    body,
    tags,
    media: {
      url: url || "",
      alt: alt || title,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(`${NoroffURL}/${username}`, options);
    const data = await response.json();
    window.location.href = "./index.html";
  } catch (err) {
    console.error(err);
  }
});

const dropdown = document.getElementById("tagDropdown");
const toggle = dropdown.querySelector(".dropdown-toggle");

toggle.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdown.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});
