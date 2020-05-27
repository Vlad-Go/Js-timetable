const
      mainWndowHEIGHT = document.querySelector('.main__window').clientHeight,
      windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight,
      windowDescrHEIGHT = document.querySelector('.window__descr').clientHeight ,

      menuBTN = document.querySelector('.menu__btn'),
      windowSection = document.querySelector('.window__section'),
      toolbar = document.querySelector('.tools'),
      createBTN = document.getElementById('plus'),
      modal = document.querySelector('.create-modal'),
      contentSubmit = document.querySelector('.create-modal__content-submit'),


      // -------------------------form
      taskNameInput = document.getElementById('taskName'),
      taskDescriptionInput = document.getElementById('taskDescription'),
      fromInput = document.getElementById('from'),
      toInput = document.getElementById('to');

const MARGINBOTTOM = 32;




// _______-----------------------cardRender---------------------------

const cardRender = (taskName,taskDescription,from,to) => {

  const card = `
      <div class="card">
                 <div class="card__task">
                      <div class="card__task-header">${taskName}</div>
                      <div class="card__task-descr">${taskDescription}</div>
                 </div>
                 <div class="card__time">
                   <div id="from">${from}</div>
                      <div class="card__time-line"></div>
                   <div id="to">${to}</div>
                 </div>
       </div>
    `
    windowSection.insertAdjacentHTML('beforeend',card )
}
// -----------------------------------------------------------


const createNewTask = () => {

  const taskName = taskNameInput.value;
  const taskDescription = taskDescriptionInput.value;
  const from = fromInput.value;
  const to = toInput.value;


console.log(taskName);
  cardRender(taskName,taskDescription,from,to);

  taskNameInput.value = null;
  taskDescriptionInput.value = null;
  fromInput.value = null;
  toInput.value = null;
  modal.classList.remove("modal-open");



}




const toggleToolbar = () => {
  toolbar.classList.toggle('tools-active');
}







// ---- HEIGHT--------
 const windowSectionHEIGHT = () => {
   windowSection.style.height = mainWndowHEIGHT - (windowHeaderHEIGHT + windowDescrHEIGHT + MARGINBOTTOM) + 'px'
 }
windowSectionHEIGHT();


const windowHEIGHT = () => {
  document.body.style.height = window.innerHeight + 'px' ;
}
windowHEIGHT();

// -----------------------------EVENTS--------------------------
window.addEventListener("resize",()=>{
  windowSectionHEIGHT();
  windowHEIGHT()
});


menuBTN.addEventListener('click',toggleToolbar);
createBTN.addEventListener('click',()=>{
  modal.classList.add("modal-open");
});


document.addEventListener("click", e=>{
  const target  =  e.target.closest('.create-modal');
  const openBTN =  e.target.closest('#plus');

   if(!target && !openBTN ){
        modal.classList.remove("modal-open")
   }
});

contentSubmit.addEventListener('click',e=>{
      // e.preventDefault();
      console.log(12);
      createNewTask()
});
