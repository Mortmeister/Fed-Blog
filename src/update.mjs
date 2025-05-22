import {
  getSinglePost,
  API_KEY,
  AUTH_KEY,
  NoroffURL,
  updateImagePreview,
} from "./config.mjs";

import { getUserNameFromLS, getToken } from "./auth.mjs";

const username = getUserNameFromLS();

const postImageUrl = document.getElementById("url");
const imageURLPreview = document.getElementById("imageURLPreview");
const authToken = getToken();

updateImagePreview(postImageUrl, imageURLPreview);

postImageUrl.addEventListener("input", () => {
  updateImagePreview(postImageUrl, imageURLPreview);
});

postImageUrl.addEventListener("DOMContentLoaded", () => {
  updateImagePreview();
});

const IdfromSearchParam = new URLSearchParams(window.location.search).get("id");
const blogPostForm = document.getElementById("blogPostForm");

async function setup() {
  const post = await getSinglePost(IdfromSearchParam);
  console.log(post);
  prefilBlogForm(post);
  postImageUrl.value = post.media.url;
  updateImagePreview();
}

setup();

async function prefilBlogForm(post) {
  blogPostForm.querySelector("#title").value = post.title;
  blogPostForm.querySelector("#body").value = post.body;
  blogPostForm.querySelector("#url").value = post.media?.url || "";
  blogPostForm.querySelector("#alt").value = post.media?.alt || "";
}

blogPostForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(blogPostForm);
  const title = formData.get("title");
  const body = formData.get("body");
  const url = formData.get("url");
  const alt = formData.get("alt");

  const postData = {
    title,
    body,
    media: {
      url: url || "",
      alt: alt || "no image alt text was provided",
    },
  };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
    body: JSON.stringify(postData),
  };

  fetch(`${NoroffURL}/${username}/${IdfromSearchParam}`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

  alert("blog post updated");
  window.location.href = "./index.html";
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
