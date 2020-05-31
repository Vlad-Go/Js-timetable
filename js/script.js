const
      windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight,
      windowDescrHEIGHT = document.querySelector('.window__descr').clientHeight ,




      main = document.querySelector('.main'),
      title = document.querySelector('.window__header'),
      description = document.querySelector('.window__descr'),
      windowSection = document.querySelector('.window__section'),
      toolbar = document.querySelector('.tools'),
      modal = document.querySelector('.create-modal'),

      // -----------BTNS
      menuBTN = document.querySelector('.menu__btn'),
      createBTN = document.getElementById('plus'),
      clearBTN = document.getElementById('clear'),
      editBTN = document.getElementById('edit'),
      contentSubmit = document.querySelector('.create-modal__content-submit'),

      // -------------------------form
      taskNameInput = document.getElementById('taskName'),
      taskDescriptionInput = document.getElementById('taskDescription'),
      fromInput = document.getElementById('from'),
      toInput = document.getElementById('to');

const MARGINBOTTOM = 32;




// let TASKSDATA = TASKSDATAGenerate();
let TASKSDATA = localStorage.length   ? JSON.parse(localStorage.Tasks) :   [];












class EditModal {


  constructor({modalHeader,modalFooter, modalPosition,cardID}) {
    this.modalHeader = modalHeader || ''
    this.modalFooter = modalFooter || ''
    this.modalPosition = modalPosition ? modalPosition : 'center'
    this.cardID = cardID || ''
  }



  generate(){
      const  overlay =  document.createElement('div');
      overlay.classList.add('modal-overlay');
      overlay.classList.add(this.modalPosition);
      const  submitBTN =   `<button class="edit-modal__submitBtn" type="submit"  data-cardid="${this.cardID}" name="button">Apply</button>`
      const  card = `
              <div class="edit-modal ">
                ${this.modalHeader}
                ${this.modalFooter}
              </div>
          `

      overlay.insertAdjacentHTML('afterbegin', card)
      main.append(overlay);
      main.insertAdjacentHTML('beforeend', submitBTN)

      document.addEventListener('click',closeEditModal)

  }
 //  delete(){
 //    main.removeChild(document.querySelector('.modal-overlay'))
 //    document.removeEventListener('click',removeEvntList)
 // }
}




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

const closeEditModal = (e) => {
  const editModal =  e.target.closest('.edit-modal');
  const submitBTN =  e.target.closest('.edit-modal__submitBtn');
  if (!editModal) {
    main.removeChild(document.querySelector('.modal-overlay'));
    main.removeChild(document.querySelector('.edit-modal__submitBtn'));
    editBTN.classList.remove('clear-active');
    title.classList.remove('edit-active');
    description.classList.remove('edit-active');
    document.removeEventListener('click',closeEditModal);

  }
  if (submitBTN) {
    changesSave(submitBTN.dataset.cardid)
  }

}

const changesSave = (cardId) => {
  console.log('Save');
  console.log(cardId);
  console.log(TASKSDATA[cardId]);
  TASKSDATA[cardId].taskName =' Edited!'
  addTaskToLocalStorage();
  cardRender();

}

const editFunc = (e)=>{

      console.log('work!!');

      if (editBTN.classList.contains('clear-active')) {
        console.log('Edit !');
        const target = e.target.closest('.edit-active');

            if (target.classList.contains("card")) {
                 console.log('Edit card!')

                  const id  =  target.dataset.id;
                  const {taskName,taskDescription,from,to}  = TASKSDATA[id];

                           let editModal = new EditModal({
                             modalHeader:`  <div class="card-edit" data-id="">
                                                   <div class="card-edit__task">
                                                       <input class="card-edit__input"  id="taskName" type="text" placeholder="Task name" value="${taskName}">
                                                       <input class="card-edit__input"  id="taskDescription" type="text" placeholder="description"value="${taskDescription}">
                                                   </div>
                                                   <div class="card-edit__time">
                                                          <input class="card-edit-time__input" id='from' type="time"  placeholder="From " value="${from}" >
                                                              <div class="card-edit-time__line"></div>
                                                          <input class="card-edit-time__input" id='from' type="time"  placeholder="From " value="${to}" >

                                                   </div>
                                            </div>`,
                             modalPosition: 'center',
                             cardID: id,

                           }).generate();


               } else {
                    console.log('Edit etc!')
                         let modalL = new EditModal({
                           modalHeader:` <div class="title">Title</div>
                                          <div class="descr">descr</div>`,
                           modalPosition: 'top',

                         }).generate()
               }
         }
         else {
           document.removeEventListener("click", editFunc)
         }

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
  editBTN.addEventListener('click',()=>{

      const cards = document.querySelectorAll('.card');

          editBTN.classList.toggle('clear-active');
          title.classList.toggle('edit-active');
          description.classList.toggle('edit-active');
          cards.forEach((item) => {
            item.classList.toggle('edit-active');
          });
          if (editBTN.classList.contains('clear-active')) {
              document.addEventListener("click", editFunc)
          }






});


  document.addEventListener("click", e=>{
  const target  =  e.target.closest('.create-modal');
  const openBTN =  e.target.closest('#plus');



   if(!target && !openBTN  ){
        modal.classList.remove("modal-open");

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
