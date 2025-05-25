const hamburgerMenu = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");

/*
Toggle classlists for opening and closing hamburger menu. 
Also, if the user clicks anywhere that is not inside the menu it will also close. 

*/
function setup() {
  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnHamburger = hamburgerMenu.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger) {
        hamburgerMenu.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
}

setup();
