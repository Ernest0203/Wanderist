window.addEventListener('load', function () {
  'use strict'; 
  
  var menuToggler = document.querySelector('.menu-toggler'),
      menu = document.querySelector('.menu-wrapper'),
      menuLink = menu.querySelectorAll('.menu__link'),
      i;
    
  menuToggler.onclick = function (e) {
    e.preventDefault();
    menuToggler.classList.toggle('menu-toggler-cancel');
    menu.classList.toggle('menu-wrapper-show');
    document.querySelector('.container').classList.toggle('container-moved');
    document.querySelector('.overlay').classList.toggle('overlay-active');
    document.body.classList.toggle('hidden');
  };
  document.querySelector('.overlay').onclick = function () {
    menu.classList.remove('menu-wrapper-show');
    menuToggler.classList.remove('menu-toggler-cancel');
    document.querySelector('.container').classList.remove('container-moved');
    this.classList.remove('overlay-active');
    document.body.classList.remove('hidden');
  };
  function subMenuOpen(e) {
    e.preventDefault();
    if (e.target.nextElementSibling.classList.contains('messages-list')) {
      return;
    };
    for (i = 0; i < menuLink.length; i++) {
      menuLink[i].nextElementSibling.classList.remove('sub-menu-show');
    };
    e.target.nextElementSibling.classList.add('sub-menu-show');
  };
  for (i = 0; i < menuLink.length; i++) {
    menuLink[i].onclick = subMenuOpen;
  };
})