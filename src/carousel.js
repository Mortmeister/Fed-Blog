let currentIndex = 0;

import { getAllBlogPosts } from "./config.mjs";

const posts = await getAllBlogPosts();
const latestPosts = posts.slice(0, 3);

const slidesContainer = document.getElementById("slidesContainer");
const thumbnailContainer = document.getElementById("thumbnailContainer");
const carouselNextBtn = document.getElementById("carouselNextBtn");
const carouselPrevBtn = document.getElementById("carouselPrevBtn");

function renderCarousel(post) {
  slidesContainer.innerHTML = "";
  thumbnailContainer.innerHTML = "";

  // If the index is equal to current index, give it class active, else just an empty string.
  post.forEach((post, index) => {
    const isActive = index === currentIndex ? "active" : "";

    slidesContainer.innerHTML += `
      <div class="slides ${isActive}">
        <h2>${post.title}</h2>
        <a href="../post/post.html?id=${post.id}">
          <img src="${post.media?.url}" alt="${post.media?.alt}">
        </a>
      </div>
    `;

    thumbnailContainer.innerHTML += `
      <img src="${post.media?.url}" alt="${post.media?.alt}" 
        class="thumbnail-img ${isActive}" 
        data-index="${index}">
    `;
  });

  updateCarousel(post);
}

function updateCarousel(post) {
  const slides = document.querySelectorAll(".slides");
  const thumbs = document.querySelectorAll(".thumbnail-img");

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });

  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentIndex);
  });
  scrollActiveThumbnailIntoView();
}

function scrollActiveThumbnailIntoView() {
  const container = thumbnailContainer;
  const activeThumbnail = container.querySelector(".thumbnail-img.active");

  if (!activeThumbnail) return;

  const containerRect = container.getBoundingClientRect();
  const thumbRect = activeThumbnail.getBoundingClientRect();

  const offset =
    thumbRect.left +
    thumbRect.width / 2 -
    (containerRect.left + containerRect.width / 2);

  container.scrollBy({ left: offset, behavior: "smooth" });
}

carouselNextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % latestPosts.length;
  updateCarousel(latestPosts);
});

carouselPrevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + latestPosts.length) % latestPosts.length;
  updateCarousel(latestPosts);
});

thumbnailContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("thumbnail-img")) {
    currentIndex = Number(event.target.dataset.index);
    updateCarousel(latestPosts);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % latestPosts.length;
    updateCarousel(latestPosts);
  } else if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + latestPosts.length) % latestPosts.length;
    updateCarousel(latestPosts);
  }
});

renderCarousel(latestPosts);
