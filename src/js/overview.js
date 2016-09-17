window.addEventListener('load', function () {
  'use strict'; 
   
    var accToggler = document.querySelectorAll('.accordion__toggler'),
        accItem = document.querySelectorAll('.accordion__item'),
        i;
    
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
  
})