window.addEventListener('load', function () {
  'use strict'; 
  
  //================Menu=========================
  var menuToggler = document.querySelector('.menu-toggler'),
      menu = document.querySelector('.menu-wrapper'),
      menuLink = menu.querySelectorAll('.menu__link'),
      detailsToggler = document.querySelector('.details-content__toggler'),
      details = document.querySelector('.details-content-wrapper'),
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
  
  //=====================Accordion=======================
  function overview() {
    var accToggler = document.querySelectorAll('.accordion__toggler'),
        accItem = document.querySelectorAll('.accordion__item');
    
    function accShow(e) {
      e.preventDefault();
      for (i = 0; i < accToggler.length; i++) {
        accToggler[i].classList.remove('accordion__toggler--active');
        accToggler[i].nextElementSibling.classList.remove('accordion__item--active');
      };
      this.classList.add('accordion__toggler--active');
      this.nextElementSibling.classList.add('accordion__item--active');
    };
    for (i = 0; i < accToggler.length; i++) {
      accToggler[i].onclick = accShow;
    };
  };
  //=====================Details=========================
  function details() {
    var viewMore = details.querySelectorAll('.entertainment-list__view-more'),
        desc = details.querySelectorAll('.entertainment-list__item-desc'),
        dates = details.querySelectorAll('.date-nav__date');
    
    detailsToggler.onclick = function (e) {
      e.preventDefault();
      this.classList.toggle('details-content__toggler-show');
      details.classList.toggle('details-content-wrapper-show');
    };
        
    function dateNavActive(e) {
      for (i = 0; i < dates.length; i++) {
        dates[i].classList.remove('date-nav__date-active');
      };
      e.target.classList.add('date-nav__date-active');
    };
    for (i = 0; i < dates.length; i++) {
      dates[i].onclick = dateNavActive;
    };
    
    function entertaimentHide(e) {
      e.preventDefault();
      this.classList.toggle('entertainment-list__view-more-hide');
      this.previousElementSibling.classList.toggle('entertainment-list__item-desc-hide');
    };
    for (i = 0; i < viewMore.length; i++) {
      viewMore[i].onclick = entertaimentHide;
    };
  };

});
	
