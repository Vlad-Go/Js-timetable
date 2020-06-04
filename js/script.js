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
      tools  = document.querySelectorAll('.tools__item'),
      contentSubmit = document.querySelector('.create-modal__content-submit'),

      // -------------------------form
      taskNameInput = document.getElementById('taskName'),
      taskDescriptionInput = document.getElementById('taskDescription'),
      fromInput = document.getElementById('from'),
      toInput = document.getElementById('to');
      // -------------------------edit-form


const MARGINBOTTOM = 32;

// let isCreateToolActive = false;
// let isClearToolActive = false;
// let isEditToolActive = false;



// let TASKSDATA = TASKSDATAGenerate();
let TASKSDATA = localStorage.length   ? JSON.parse(localStorage.Tasks) :   [];
 title.textContent = localStorage.getItem('Title')   ? JSON.parse(localStorage.Title) :  'Title';
 description.textContent = !!localStorage.getItem('Description')   ? JSON.parse(localStorage.Description) :  'description';












class EditModal {


  constructor({modalHeader,modalFooter, modalPosition,cardID,type}) {
    this.modalHeader = modalHeader || ''
    this.modalFooter = modalFooter || ''
    this.modalPosition = modalPosition ? modalPosition : 'center'
    this.cardID = cardID || ''
    this.type= type|| ''
  }



  generate(){
      const  overlay =  document.createElement('div');
      overlay.classList.add('modal-overlay');
      overlay.classList.add(this.modalPosition);

      const  submitBTN =   `<button class="edit-modal__submitBtn" type="submit"  data-cardid="${this.cardID}" data-type="${this.type}" name="button">Apply</button>`
      const  card = `
              <div class="edit-modal " >
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
// ---------------------MAIN     Funcs--------------------------------------

const init = () => {
  windowHEIGHT();
  windowSectionHEIGHT();
  cardRender()

}



//  ------------- Toolbar Funcs
const toggleToolbar = () => {
  toolbar.classList.toggle('tools-active');
}

const deleteTask = (e) => {


      const id = e.target.closest(".card").dataset.id

        TASKSDATA.splice(id,1);

        windowSection.removeEventListener('click',deleteTask);
        clearBTN.classList.remove('active');

        addTaskToLocalStorage();
        cardRender();

}

const editStyleToggle = () => {

 const cards = document.querySelectorAll('.card');
  editBTN.classList.toggle('active');
  title.classList.toggle('edit-active');
  description.classList.toggle('edit-active');
  cards.forEach((item) => {
      item.classList.toggle('edit-active');
  });

}
const closeEditModal = (e) => {
  const editModal =  e.target.closest('.edit-modal');
  const submitBTN =  e.target.closest('.edit-modal__submitBtn');


  if (!editModal && !submitBTN) {
    document.removeEventListener('click',closeEditModal);
    document.removeEventListener("click", editFunc)

    main.removeChild(document.querySelector('.modal-overlay'));
    main.removeChild(document.querySelector('.edit-modal__submitBtn'));

    editStyleToggle()

  }
  if (submitBTN) {
     editStyleToggle()

     document.removeEventListener('click',closeEditModal);
     document.removeEventListener("click", editFunc);

     changesSave(submitBTN.dataset.cardid , submitBTN.dataset.type)


     main.removeChild(document.querySelector('.modal-overlay'));
     main.removeChild(document.querySelector('.edit-modal__submitBtn'));


  }

}

const editFunc = (e)=>{

// console.log('work!!');

      if (editBTN.classList.contains('active')) {
// console.log('Edit !');
        const target = e.target.closest('.edit-active');
console.log(target);
            if (target.classList.contains("card")) {
// console.log('Edit card!')

                  const id  =  target.dataset.id;
                  const {taskName,taskDescription,from,to}  = TASKSDATA[id];

                           let editModal = new EditModal({
                             modalHeader:`  <div class="card-edit" data-id="">
                                                   <div class="card-edit__task">
                                                       <input class="card-edit__input"  id="editTaskName" type="text" placeholder="Task name" value="${taskName}">
                                                       <input class="card-edit__input"  id="editTaskDescription" type="text" placeholder="description"value="${taskDescription}">
                                                   </div>
                                                   <div class="card-edit__time">
                                                          <input class="card-edit-time__input" id='editFrom' type="time"  placeholder="From " value="${from}" >
                                                              <div class="card-edit-time__line"></div>
                                                          <input class="card-edit-time__input" id='editTo' type="time"  placeholder="To " value="${to}" >

                                                   </div>
                                            </div>`,
                             modalPosition: 'center',
                             cardID: id,
                             type: 'card',

                           }).generate();


               } else     if (target.classList.contains("window__header") ||target.classList.contains("window__descr"))  {
                    console.log('Edit etc!')
                         let modalL = new EditModal({
                           modalHeader: `<div class="window-header__edit">
                                             <input type="text" class="window-header__edit-title" value="${title.textContent}" type="text"/>
                                             <input type="text" class="window-header__edit-descr" value="${description.textContent}" type="text"/>
                                          </div>`,

                           modalPosition: 'top',
                            type: 'header',

                         }).generate()
               }
         }
         else {
           document.removeEventListener("click", editFunc)
         }

}

const changesSave = (cardId, type) => {
  // console.log('Save');
  console.log(type);
if (type === 'card') {
  TASKSDATA[cardId].taskName = document.getElementById('editTaskName').value;
  TASKSDATA[cardId].taskDescription = document.getElementById('editTaskDescription').value
  TASKSDATA[cardId].from = document.getElementById('editFrom').value;
  TASKSDATA[cardId].to = document.getElementById('editTo').value;
  TASKSDATA[cardId].forSort = +document.getElementById('editFrom').value.split(':')[0] +document.getElementById('editFrom').value.split(':')[1]/60;

  // console.log(TASKSDATA[cardId]);

  taskSort()
  addTaskToLocalStorage();
  cardRender();

}else if (type === "header") {
  title.textContent = document.querySelector('.window-header__edit-title').value;
  description.textContent = document.querySelector('.window-header__edit-descr').value;
  addInfoToLocalStorage();
}



}


// -----------------------------




const taskSort = ()=>{
    TASKSDATA.sort((a,b)=>{
      return a.forSort - b.forSort;
    })
}
const addTaskToLocalStorage = () => {
  localStorage.setItem('Tasks', JSON.stringify(TASKSDATA));
}
const addInfoToLocalStorage = () => {
  localStorage.setItem('Title', JSON.stringify(title.textContent));
  localStorage.setItem('Description', JSON.stringify(description.textContent));
}
// const checkActiveTool = () => {
//   tools.forEach((item) => {
//     if (item.classList.contains('active')) {
//             isAnyToolActive = item.id;
//     }
//     else if (!item.classList.contains('active')) {
//         isAnyToolActive = '';
//     }
//
//   });
//   console.log(tools);
//


// }


const deleteAllTasks = () => {
    localStorage.removeItem('Tasks');
    TASKSDATA = []
    windowSection.textContent = '';

}






               // ----------------createModal------
const closeCreateModal = () => {
                 taskNameInput.value = null;
                 taskDescriptionInput.value = null;
                 fromInput.value = null;
                 toInput.value = null;
                 createBTN.classList.remove('active');
                 modal.classList.remove("modal-open");
    }

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

      //  ----------------------tools EVENTS
          createBTN.addEventListener('click',()=>{

              createBTN.classList.toggle('active');
              modal.classList.add("modal-open");


        });


          clearBTN.addEventListener('click',()=>{


                  if (TASKSDATA.length > 0) {

                      clearBTN.classList.toggle('active');

                      if (clearBTN.classList.contains('active')) {
                        windowSection.addEventListener('click',deleteTask);

                      }else {
                         windowSection.removeEventListener('click',deleteTask);

                      }



         }
        });


          editBTN.addEventListener('click',()=>{


                   editStyleToggle()
                    if (editBTN.classList.contains('active')) {
                        document.addEventListener("click", editFunc);

                    } else {
                       document.removeEventListener("click", editFunc);

                     }


  });





  document.addEventListener("click", e=>{
  const target  =  e.target.closest('.create-modal');
  const openBTN =  e.target.closest('#plus');

     if(!target && !openBTN  ){
         createBTN.classList.remove('active');
          modal.classList.remove("modal-open");

     }

});


  contentSubmit.addEventListener('click',e=>{
      e.preventDefault();
      createNewTask()
});
// --------------------------=-=-=----------------------------------


init()
