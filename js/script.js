const
      mainWndowHEIGHT = document.querySelector('.main__window').clientHeight,
      windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight,
      windowDescrHEIGHT = document.querySelector('.window__descr').clientHeight ,


      windowSection = document.querySelector('.window__section'),
      toolbar = document.querySelector('.tools'),
      modal = document.querySelector('.create-modal'),

      // -----------BTNS
      menuBTN = document.querySelector('.menu__btn'),
      createBTN = document.getElementById('plus'),
      clearBTN = document.getElementById('clear'),
      contentSubmit = document.querySelector('.create-modal__content-submit'),

      // -------------------------form
      taskNameInput = document.getElementById('taskName'),
      taskDescriptionInput = document.getElementById('taskDescription'),
      fromInput = document.getElementById('from'),
      toInput = document.getElementById('to');

const MARGINBOTTOM = 32;



let TASKSDATA = TASKSDATAGenerate();







// _______-----------------------cardRender---------------------------


const cardRender = () => {

    windowSection.textContent = '';

     TASKSDATA.forEach((item, i) => {
       const card = `
           <div class="card">
                      <div class="card__task">
                           <div class="card__task-header">${item.taskName}</div>
                           <div class="card__task-descr">${item.taskDescription}</div>
                      </div>
                      <div class="card__time">
                        <div id="from">${item.from}</div>
                           <div class="card__time-line"></div>
                        <div id="to">${item.to}</div>
                      </div>
            </div>
         `
         windowSection.insertAdjacentHTML('beforeend',card )
     });
}

// const cardRender = (taskName,taskDescription,from,to) => {
//
//   const card = `
//       <div class="card">
//                  <div class="card__task">
//                       <div class="card__task-header">${taskName}</div>
//                       <div class="card__task-descr">${taskDescription}</div>
//                  </div>
//                  <div class="card__time">
//                    <div id="from">${from}</div>
//                       <div class="card__time-line"></div>
//                    <div id="to">${to}</div>
//                  </div>
//        </div>
//     `
//     windowSection.insertAdjacentHTML('beforeend',card )
// }
// -----------------------------------------------------------
const closeCreateModal = () => {
  taskNameInput.value = null;
  taskDescriptionInput.value = null;
  fromInput.value = null;
  toInput.value = null;
  modal.classList.remove("modal-open");
}

const toggleToolbar = () => {
  toolbar.classList.toggle('tools-active');
}

const addTaskToLocalStorage = () => {
  localStorage.setItem('Tasks', JSON.stringify(TASKSDATA));
}

function TASKSDATAGenerate() {
  if (localStorage.length === 0 ) {
     return    [];
  }else {
    return  JSON.parse(localStorage.Tasks);
  }
}

const deleteAllTasks = () => {
    localStorage.removeItem('Tasks');
    TASKSDATA = []
    windowSection.textContent = '';

}

               // ----------------createModal----------
const createNewTask = () => {

    const newTask = {
     taskName: taskNameInput.value,
     taskDescription: taskDescriptionInput.value,
     from:  fromInput.value,
     to : toInput.value,
    }

 TASKSDATA.push(newTask);
 cardRender();
 addTaskToLocalStorage();
 closeCreateModal();

}
// const createNewTask = () => {
//
//   const taskName = taskNameInput.value;
//   const taskDescription = taskDescriptionInput.value;
//   const from = fromInput.value;
//   const to = toInput.value;
//
//
//   cardRender(taskName,taskDescription,from,to);
//
//   taskNameInput.value = null;
//   taskDescriptionInput.value = null;
//   fromInput.value = null;
//   toInput.value = null;
//   modal.classList.remove("modal-open");
//
//
//
// }












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
  clearBTN.addEventListener('click',deleteAllTasks);
  document.addEventListener("click", e=>{
  const target  =  e.target.closest('.create-modal');
  const openBTN =  e.target.closest('#plus');

   if(!target && !openBTN ){
        modal.classList.remove("modal-open")
   }
});


contentSubmit.addEventListener('click',e=>{
      e.preventDefault();
      createNewTask()
});
// --------------------------=-=-=----------------------------------
cardRender()
