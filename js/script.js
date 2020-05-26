const windowSection= document.querySelector('.window__section'),

      mainWndowHEIGHT = document.querySelector('.main__window').clientHeight    ,
      windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight    ,
      windowDescrHEIGHT = document.querySelector('.window__descr').clientHeight    ;

const MARGINBOTTOM = 32;


 const windowSectionHEIGHT = () => {
   windowSection.style.height = mainWndowHEIGHT - (windowHeaderHEIGHT + windowDescrHEIGHT + MARGINBOTTOM) + 'px'
 }

windowSectionHEIGHT()
 // console.log(windowSection);
