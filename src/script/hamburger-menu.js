const hamburgerButton = document.getElementById ('hamburgerButton');
const mobileMenu = document.querySelector ('#hamburgerMenu');

hamburgerButton.addEventListener('click', function (event) {
  event.preventDefault();

  hamburgerButton.classList.toggle('is-active');
  mobileMenu.classList.toggle('active');

});