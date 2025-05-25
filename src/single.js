import { AUTH_KEY, API_KEY, NoroffURL, deleteBlogPost } from "./config.mjs";

import { getUserNameFromLS, isAdmin, setupLogin } from "./auth.mjs";

const IdfromSearchParam = new URLSearchParams(window.location.search).get("id");
const singlePost = document.getElementById("singlePost");
const relatedPosts = document.getElementById("relatedPosts");
const username = getUserNameFromLS();

/*
Create a new array called tag, from tags in the api. 
To avoid seeing the same post in the related posts, exclude the post with the same ID as the one in single page view.
*/

async function getPostsByTag(tags = [], excludeId = null) {
  const username = getUserNameFromLS() || "InspireInk";
  const options = {
    method: "GET",
    headers: {
      Authorization: `${AUTH_KEY}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };

  const allPosts = [];

  for (const tag of tags) {
    const response = await fetch(
      `${NoroffURL}/${username}?_tag=${tag}`,
      options
    );
    if (response.ok) {
      const { data } = await response.json();
      allPosts.push(...data);
    } else {
      console.warn(`No posts found for tag: ${tag}`);
    }
  }

  let filteredPosts;

  if (excludeId) {
    filteredPosts = allPosts.filter((post) => post.id !== excludeId);
  } else {
    filteredPosts = allPosts;
  }
  return filteredPosts;
}

async function setup() {
  const username = getUserNameFromLS() || "InspireInk";
  const options = {
    method: "GET",
    headers: {
      Authorization: `${AUTH_KEY}`,
      "X-Noroff-API-Key": `${API_KEY}`,
    },
  };
  try {
    const response = await fetch(
      `${NoroffURL}/${username}/${IdfromSearchParam}`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    const tags = data.tags;
    const id = data.id;
    singleBlogTemplate(data);
    setupLogin();
    relatedBlogListEl(await getPostsByTag(tags, id));

    const shareBtn = document.getElementById("shareButton");

    if (shareBtn) {
      const shareUrl = `${window.location.origin}${window.location.pathname}?id=${id}`;

      shareBtn.addEventListener("click", () => {
        navigator.clipboard
          .writeText(shareUrl)
          .then(() => {
            alert("Post link copied to clipboard!");
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

setup();

/*
To create paragraphs: 
In the body, look for two newline characters (double enter), and split them into paragraph chunks. 
Then, wrap them in individual html <p> tags
Then, join them into one big html string. 
("\n") = One new line
("\n\n") = Two new lines
*/

function createBlogTemplate({
  id,
  title,
  body,
  url,
  alt,
  created,
  updated,
  name,
  avatarUrl,
  avatarAlt,
  bio,
}) {
  const formattedBody = body
    .split("\n\n")
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const isUserAdmin = isAdmin();

  return `
    <div id="${id}" class="single-post">
      ${isUserAdmin ? `<button class="deleteBtn">X</button>` : ""}
      <h1>${title}</h1>
      <img src="${url}" class="single-post-image" alt="${alt}">
      <p class="image-alt-text">${alt}</p>
      <div class="author-info">
        ${
          avatarUrl
            ? `<img src="${avatarUrl}" alt="${avatarAlt}" class="author-avatar">`
            : ""
        }
        <p class="author-name">Written by: ${name}</p>
        ${bio ? `<p class="author-bio">${bio}</p>` : ""}
      </div>
      <i class="fa-solid fa-share" id="shareButton"></i>
      <div class="date-container"> 
       <p class="date">Published: ${created}</p>
       <p class="date">Last updated: ${updated}</p>
      </div>
      <div class="paragraph-body">
        ${formattedBody}
      </div>
    </div>
  `;
}

function formattedDate(date) {
  return new Date(date).toLocaleDateString("en-US");
}

function singleBlogTemplate({
  id,
  title,
  body,
  media,
  created,
  updated,
  author,
}) {
  const { name, bio, avatar } = author || {};
  const avatarUrl = avatar?.url;
  const avatarAlt = avatar?.alt || name || "Author avatar";

  const template = createBlogTemplate({
    id,
    title,
    body,
    url:
      media?.url ||
      "https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/warcraft3frozenthrone-img4.jpg.webp",
    alt: media?.alt || title,
    name: author?.name || "InspireInk",
    avatarUrl,
    avatarAlt,
    bio,
    created: formattedDate(created),
    updated: formattedDate(updated),
  });

  const newEl = createHTML(template);
  singlePost.append(newEl);

  const deleteBtn = newEl.querySelector(`.deleteBtn`);

  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      const deleteConfirmation = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!deleteConfirmation) {
        return;
      }
      try {
        await deleteBlogPost(id);
        alert("Post deleted");
        window.location.href = "./manage.html";
      } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    });
  }
}

function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, "text/html");
  return parsedDocument.body.firstChild;
}

function relatedBlogTemplate({ title, url, alt, id }) {
  const singlePageUrl = `../post/post.html?id=${id}`;
  return `
    <div class="related-post-container" id="${id}">
      <h1>${title}</h1>
      <div class="image-thumbnail">
        <a href="${singlePageUrl}">
          <img src="${url}" alt="${alt}">
        </a>
      </div>
    </div>
  `;
}

async function relatedBlogListEl(list = []) {
  relatedPosts.innerHTML = "";
  list.forEach(({ id, title, body, media }) => {
    const template = relatedBlogTemplate({
      title: title,
      id: id,
      body: body,
      url:
        media?.url ||
        "https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/warcraft3frozenthrone-img4.jpg.webp",
      alt: media?.alt || title,
    });

    const newEl = createHTML(template);
    relatedPosts.append(newEl);
  });
}
