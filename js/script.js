const
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



// let TASKSDATA = TASKSDATAGenerate();
let TASKSDATA = localStorage.length   ? JSON.parse(localStorage.Tasks) :   [];






// _______-----------------------cardRender---------------------------


const cardRender = () => {

    windowSection.textContent = '';

     TASKSDATA.forEach((item, i) => {
       const card = `
           <div class="card" data-id="${i}">
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
// -------------------------------------------------
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

// function TASKSDATAGenerate() {
//   if (localStorage.length === 0 ) {
//      return    [];
//   }else {
//     return  JSON.parse(localStorage.Tasks);
//   }
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

const deleteAllTasks = () => {
    localStorage.removeItem('Tasks');
    TASKSDATA = []
    windowSection.textContent = '';

}

const deleteTask = (e) => {


      const id = e.target.closest(".card").dataset.id

        TASKSDATA.splice(id,1);
        addTaskToLocalStorage();

        windowSection.removeEventListener('click',deleteTask);
        clearBTN.classList.remove('clear-active');

        cardRender();



}

const taskSort = ()=>{
    TASKSDATA.sort((a,b)=>{
      return a.forSort - b.forSort;
    })
}
               // ----------------createModal----------
const createNewTask = () => {

    const newTask = {
         taskName: taskNameInput.value,
         taskDescription: taskDescriptionInput.value,
         from:  fromInput.value,
         to : toInput.value,
         forSort: +fromInput.value.split(':')[0] +fromInput.value.split(':')[1]/60,
    }

 TASKSDATA.push(newTask);
 taskSort();
 addTaskToLocalStorage();
 cardRender();
 closeCreateModal();

}













// ---- HEIGHT--------
 const windowSectionHEIGHT = () => {
   const mainWindowHEIGHT = document.querySelector('.main__window').clientHeight;
   windowSection.style.height = mainWindowHEIGHT - (windowHeaderHEIGHT + windowDescrHEIGHT + MARGINBOTTOM) + 'px'
 }


 const  windowHEIGHT = () => {
   document.body.style.height = window.innerHeight + 'px' ;
}




// -----------------------------EVENTS--------------------------
window.addEventListener("resize",()=>{
  windowSectionHEIGHT();
  windowHEIGHT()
});


  menuBTN.addEventListener('click',toggleToolbar);
  createBTN.addEventListener('click',()=>{
  modal.classList.add("modal-open");
});

  clearBTN.addEventListener('click',()=>{

    if (TASKSDATA.length > 0) {

        clearBTN.classList.toggle('clear-active');
        if (clearBTN.classList.contains('clear-active')) {
          windowSection.addEventListener('click',deleteTask);
        }else {
           windowSection.removeEventListener('click',deleteTask);
        }

   }
});


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
windowHEIGHT();
windowSectionHEIGHT();
cardRender()
