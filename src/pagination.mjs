export function renderPagination(totalPages, currentPage, onPageChange) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement("button");
    button.textContent = page;
    if (page === currentPage) {
      button.classList.add("active-page");
    }
    button.addEventListener("click", () => {
      onPageChange(page);
    });
    pagination.appendChild(button);
  }
}
