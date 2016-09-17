window.addEventListener('load', function () {
  'use strict'; 
    
  var detailsToggler = document.querySelector('.details-content__toggler'),
      details = document.querySelector('.details-content-wrapper'),    
      viewMore = details.querySelectorAll('.entertainment-list__view-more'),
      desc = details.querySelectorAll('.entertainment-list__item-desc'),
      dates = details.querySelectorAll('.date-nav__date'),
      i;
  
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
  
})