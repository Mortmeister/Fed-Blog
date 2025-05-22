import { getUserNameFromLS, getToken } from "./auth.mjs";

const postImageUrl = document.getElementById("url");
const imageURLPreview = document.getElementById("imageURLPreview");
const AuthToken = getToken();

export const AUTH_KEY =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zcGlyZUluayIsImVtYWlsIjoiSW5zcGlyZUlua0BzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc0NDEyMTM1Nn0.gcK7jcYhfxEaXR5x10dgTQe4UfQkQjjC-PbaLJPuEWk";
export const API_KEY = "d6d259ac-0b1e-4a5e-afcc-ae383ec589d5";

export const NoroffURL = "https://v2.api.noroff.dev/blog/posts";
export const NoroffRegisterUrl = "https://v2.api.noroff.dev/auth/register";

export async function deleteBlogPost(id) {
  const username = getUserNameFromLS();
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${AuthToken}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };
  try {
    const response = await fetch(`${NoroffURL}/${username}/${id}`, options);
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export async function getSinglePost(id) {
  const username = getUserNameFromLS() || "InspireInk";
  const options = {
    method: "GET",
    headers: {
      Authorization: `${AUTH_KEY}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };
  try {
    const response = await fetch(`${NoroffURL}/${username}/${id}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export async function getAllBlogPosts() {
  const username = getUserNameFromLS() || "InspireInk";
  const options = {
    method: "GET",
    headers: {
      Authorization: `${AUTH_KEY}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };
  try {
    const response = await fetch(`${NoroffURL}/${username}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

export function updateImagePreview() {
  const url = postImageUrl.value.trim();
  if (url && url.startsWith("http")) {
    imageURLPreview.src = url;
    imageURLPreview.style.display = "block";
  } else {
    imageURLPreview.style.display = "none";
  }
}

export async function getAllRelatedPosts() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `${AUTH_KEY}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };
  try {
    const response = await fetch(
      `${NoroffURL}/${username}?_tag=${tags}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}
