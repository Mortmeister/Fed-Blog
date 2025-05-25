// feed.mjs
import {
  isAdmin,
  logout,
  getUserNameFromLS,
  startAutoLogoutListener,
  setupLogin,
} from "./auth.mjs";
import {
  AUTH_KEY,
  API_KEY,
  NoroffURL,
  deleteBlogPost,
  getAllBlogPosts,
} from "./config.mjs";

import { renderPagination } from "./pagination.mjs";

const blogPostsFeed = document.getElementById("blogPostsFeed");
const sortByNameEl = document.getElementById("sortByName");
const sortByDateEl = document.getElementById("sortByDate");
const SearchTitleBtn = document.getElementById("searchForTitleBtn");
const SearchTitleInputEl = document.getElementById("searchPosts");
const tagButtons = document.querySelectorAll(".tag-btn");
const resetTagsBtn = document.getElementById("resetTagsBtn");
const logoutBtnEl = document.getElementById("logoutBtn");
const loggedInUser = document.getElementById("LoggedInUser");
const username = getUserNameFromLS();

if (loggedInUser) {
  loggedInUser.innerHTML = `Hi, ${username}`;
}

const isUserAdmin = isAdmin();
startAutoLogoutListener();

if (logoutBtnEl && isUserAdmin) {
  logoutBtnEl.addEventListener("click", logout);
}

function sortPostsByDateOld(list = []) {
  return list.sort((a, b) => new Date(a.created) - new Date(b.created));
}
function sortPostsByDateNew(list = []) {
  return list.sort((a, b) => new Date(b.created) - new Date(a.created));
}
function sortPostsByTitleAsc(list = []) {
  return list.sort((a, b) => a.title.localeCompare(b.title));
}
function sortPostsByTitleDesc(list = []) {
  return list.sort((a, b) => b.title.localeCompare(a.title));
}

let activeTags = new Set();

/* 
  Tag is equal to dataset-tag. First time a tag button is clicked add active class.
   If the cliked button has a tag, remove it, else add it.
   If all the tags are manually uncliked run setup for correct pagination. 
   Filter through all posts to see if it has a tag that matches the active tag. To lowercase ensures values match. 
 */
tagButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const tag = button.dataset.tag?.toLowerCase();
    if (!tag) return;

    button.classList.toggle("active");

    if (activeTags.has(tag)) {
      activeTags.delete(tag);
    } else {
      activeTags.add(tag);
    }

    if (activeTags.size === 0) {
      setup(1, 12);
      return;
    }

    const blogPosts = await getAllBlogPosts();
    const filtered = blogPosts.filter((post) =>
      post.tags.some((tag) => activeTags.has(tag.toLowerCase()))
    );

    createBlogListEl(filtered);
  });
});

resetTagsBtn.addEventListener("click", async () => {
  activeTags.clear();
  tagButtons.forEach((btn) => btn.classList.remove("active"));
  setup();
});

SearchTitleBtn.addEventListener("click", async () => {
  const inputVal = SearchTitleInputEl.value.toLowerCase();
  const blogPosts = await getAllBlogPosts();
  const results = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(inputVal)
  );
  createBlogListEl(results);
});

sortByDateEl.addEventListener("change", async ({ target }) => {
  const posts = await getAllBlogPosts();
  if (target.value === "ascending") {
    createBlogListEl(sortPostsByDateOld(posts));
  } else if (target.value === "descending") {
    createBlogListEl(sortPostsByDateNew(posts));
  } else if (target.value === "default") {
    setup();
  }
});

sortByNameEl.addEventListener("change", async ({ target }) => {
  const posts = await getAllBlogPosts();

  if (target.value === "ascending") {
    createBlogListEl(sortPostsByTitleAsc(posts));
  } else if (target.value === "descending") {
    createBlogListEl(sortPostsByTitleDesc(posts));
  } else if (target.value === "default") {
    setup();
  }
});

/*
On setup, go to page 1, and limit is 12 posts per page. 
Acces page count from meta data. 
*/
async function setup(page = 1, limit = 12) {
  const username = isUserAdmin
    ? getUserNameFromLS()
    : localStorage.getItem("username") || "InspireInk";
  try {
    const response = await fetch(
      `${NoroffURL}/${username}?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_KEY}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );
    if (!response.ok) throw new Error("Fetch failed");

    const { data, meta } = await response.json();
    createBlogListEl(data);
    setupLogin();

    if (data.length === 0)
      blogPostsFeed.innerHTML = "<p>No posts yet. Create your first one!</p>";

    renderPagination(meta.pageCount, page, (newPage) => setup(newPage, limit));
  } catch (err) {
    console.error("Error:", err);
  }
}

// Only show update and delete button if the user is logged in. Check if the user is admin with a conditional operator.
function createBlogTemplate({ title, body, tags, url, alt, id }) {
  const singlePageUrl = `../post/post.html?id=${id}`;
  return `
    <div class="post-container" id="${id}">
      ${
        isUserAdmin
          ? `<div class="flex-row">
              <button class="updateBtn">Edit</button>
              <button class="deleteBtn">X</button>
            </div>`
          : ""
      }
      <h3>${title}</h3>
      <div class="image-wrapper">
        <a href="${singlePageUrl}">
          <img src="${url}" alt="${alt}">
          <span class="tag-overlay">${tags}</span>
        </a>
      </div>
    </div>
  `;
}

// Same as code above. If the user is admin and the delete button exists, and the user checks yes, then delete.
async function createBlogListEl(list = []) {
  blogPostsFeed.innerHTML = "";
  list.forEach(({ id, title, tags, body, media }) => {
    const template = createBlogTemplate({
      id,
      title,
      body,
      tags,
      url:
        media?.url ||
        "https://static.vecteezy.com/system/resources/previews/006/911/398/non_2x/rainbow-waves-background-free-vector.jpg",
      alt: media?.alt || title,
    });

    const newEl = createHTML(template);
    blogPostsFeed.append(newEl);
    if (isUserAdmin) {
      newEl.querySelector(".deleteBtn")?.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
          await deleteBlogPost(id);
          alert("Your post was deleted");
          window.location.reload();
        } catch (err) {
          console.error("Deletion failed", err);
        }
      });

      newEl.querySelector(".updateBtn")?.addEventListener("click", () => {
        window.location.href = `../post/update.html?id=${id}`;
      });
    }
  });
}

function createHTML(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.firstChild;
}

setup();
