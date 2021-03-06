const
      main = document.querySelector('.main'),
      title = document.querySelector('.window__title'),
      description = document.querySelector('.window__descr'),
      windowSection = document.querySelector('.window__section'),
      toolbar = document.querySelector('.tools'),
      modal = document.querySelector('.create-modal'),
      colorsWrapp = document.querySelector('.create-modal__content-colors'),
      colors = document.querySelectorAll('.create-modal__content-color'),
      // -------------------theme




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
      toInput = document.getElementById('to'),


      // ----------------------OPTIONS
      options = document.querySelector('.options'),
      optionsBTNs = document.querySelectorAll('.options-item'),

      themeChangeBTN = document.getElementById('themeChange'),
      timeControlBTN = document.getElementById('timeControl'),
      breakpointsBTN = document.getElementById('breakpoints'),


      // -------------------------date

      day = document.querySelector('.day'),
      year = document.querySelector('.year');
// ---------------------------------------------------------------------


const MARGINBOTTOM = 32;

let currentColor = 'brown' ;
const themeColors = ['green' ,'red' ,'brown'];


// const brown = {
//   accent:'accent-brown',
//   light:'light-brown'
//
// }
// const green = {
//   accent:'accent-green',
//   light:'light-green'
//
// }
// const red = {
//   accent:'accent-red',
//   light:'light-red'
//
// }
const themes = {
  'green' : {
     accent:'accent-green',
     light:'light-green'

   },
  'red':{
   accent:'accent-red',
   light:'light-red'

 },
 'brown' :{
  accent:'accent-brown',
  light:'light-brown'

}
}

let TASKSDATA = localStorage.length   ? JSON.parse(localStorage.Tasks) :   [];

 title.textContent = localStorage.getItem('Title')   ? JSON.parse(localStorage.Title) :  'Title';
 description.textContent = !!localStorage.getItem('Description')   ? JSON.parse(localStorage.Description) :  'description';

// -----------------------------


//---------------MODAL

class EditModal {


  constructor({modalHeader,modalFooter, modalPosition,cardID,type ,color}) {
    this.modalHeader = modalHeader || ''
    this.modalFooter = modalFooter || ''
    this.modalPosition = modalPosition ? modalPosition : 'center'
    this.cardID = cardID || ''
    this.type= type|| ''
    this.color= color|| ''
  }



  generate(){
     const  overlay =  document.createElement('div');
      overlay.classList.add( 'hide');



      const  card = `
              <div class="edit-modal hide" >
                ${this.modalHeader}
                ${this.modalFooter}
              </div>
          `;
      const  submitBTN =   `<button class="edit-modal__submitBtn light-brown" type="submit"  data-cardid="${this.cardID}" data-type="${this.type}" name="button">Apply</button>`

        overlay.insertAdjacentHTML('afterbegin', card);
        main.append(overlay);
        main.insertAdjacentHTML('beforeend', submitBTN);
        overlay.classList.remove('hide');


       if (this.type == 'card') {
             colorBtnRender();
             document.querySelector('.edit-modal__content-colors').addEventListener('click',choseColor);
                const  newColors = document.querySelectorAll('.edit-modal__content-color');
                 newColors.forEach((item) => {
                   item.dataset.color == this.color ?  item.classList.add('active'): '';
                 });
       }


          const renederCard = document.querySelector('.edit-modal');

      setTimeout(()=>{
        renederCard.classList.remove('hide');
        overlay.classList.add(this.modalPosition);
        overlay.classList.add('modal-overlay');

      },1)

      document.addEventListener('click',closeEditModal);

  }
 //  delete(){
 //    main.removeChild(document.querySelector('.modal-overlay'))
 //    document.removeEventListener('click',removeEvntList)
 // }
}
// -----------------------cardRender---------------------------


const cardRender = () => {

    windowSection.textContent = '';

     TASKSDATA.forEach((item, i) => {
       const card = `
           <div class="card" data-id="${i}" style="background-color:${item.color}">
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

// ---------------------MAIN     Funcs--------------------------------------

const init = () => {
  const d = new Date();

   day.textContent = +d.getDate() + ".0" +  +(d.getMonth() + 1);
   year.textContent = +d.getFullYear();



  colorBtnRender();
  windowHEIGHT();
  windowSectionHEIGHT();
  cardRender()

}


//  ------------- Toolbar Funcs
const toggleToolbar = () => {

  toolbar.classList.toggle('tools-active');

  menuBTN.classList.toggle('active');
}

            //Delete
const deleteTask = (e) => {


      const id = e.target.closest(".card").dataset.id

        TASKSDATA.splice(id,1);

        windowSection.removeEventListener('click',deleteTask);
                toggleActiveTool(clearBTN)
        clearBTN.classList.remove('active');


        addTaskToLocalStorage();
        cardRender();

}

           // EDIT
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
  const overlay  = document.querySelector('.modal-overlay');
  const modal  = document.querySelector('.edit-modal');
  const modalBTN  = document.querySelector('.edit-modal__submitBtn');


  if (!editModal && !submitBTN) {
        document.removeEventListener('click',closeEditModal);
        document.removeEventListener("click", editFunc);

        if (document.querySelector('.edit-modal__submitBtn').dataset.type == 'card') {
            document.querySelector('.edit-modal__content-colors').removeEventListener('click',choseColor)
        }

        overlay.classList.add('fadeOut');
        modalBTN.classList.add('fadeOut');
        modal.classList.add('fadeOut-modal');


       setTimeout(()=>{
         main.removeChild(overlay);
         main.removeChild(modalBTN);
       },450);

        editStyleToggle()
        toggleActiveTool(editBTN)

  }
  if (submitBTN) {
         editStyleToggle()
         toggleActiveTool(editBTN)

         document.removeEventListener('click',closeEditModal);
         document.removeEventListener("click", editFunc);
         if (submitBTN.dataset.type == 'card') {
            document.querySelector('.edit-modal__content-colors').removeEventListener('click',choseColor);
         }


         changesSave(submitBTN.dataset.cardid , submitBTN.dataset.type);
          overlay.classList.add('fadeOut');
          modalBTN.classList.add('fadeOut');
          modal.classList.add('fadeOut-modal');


         setTimeout(()=>{
           main.removeChild(overlay);
           main.removeChild(modalBTN);
         },450);

  }

}
const editFunc = (e)=>{


      if (editBTN.classList.contains('active')) {

            const target = e.target.closest('.edit-active');

                if (target.classList.contains("card")) {


                      const id  =  target.dataset.id;
                      const {taskName,taskDescription,from,to ,color}  = TASKSDATA[id];

                               let editModal = new EditModal({
                                 modalHeader:`  <div class="card-edit">
                                                    <div class="card-edit__wrapp">
                                                       <div class="card-edit__task">
                                                           <input class="card-edit__input"  id="editTaskName" type="text" placeholder="Task name" value="${taskName}">
                                                           <input class="card-edit__input"  id="editTaskDescription" type="text" placeholder="description"value="${taskDescription}">
                                                       </div>
                                                       <div class="card-edit__time">
                                                              <input class="card-edit-time__input" id='editFrom' type="time"  placeholder="From " value="${from}" >
                                                                  <div class="card-edit-time__line"></div>
                                                              <input class="card-edit-time__input" id='editTo' type="time"  placeholder="To " value="${to}" >

                                                       </div>
                                                    </div>
                                                       <div class="create-modal__content-colors edit-modal__content-colors">
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#D55050"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#35D5A5"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#E0FB38"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#FAFF12"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#9578E8"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#0FD30B"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#FA9A09"></button>
                                                         <button class="edit-modal__content-color  create-modal__content-color" data-color="#fff"></button>
                                                      </div>
                                                </div>`,
                                 modalPosition: 'center',
                                 cardID: id,
                                 type: 'card',
                                 color: color,

                               }).generate();




                   } else if (target.classList.contains("window__header") ||target.classList.contains("window__descr"))  {

                             let modalL = new EditModal({
                               modalHeader: `<div class="window-header__edit">
                                                 <input type="text" class="window-header__edit-title" value="${title.textContent}" type="text"/>
                                                 <input type="text" class="window-header__edit-descr" value="${description.textContent}" type="text"/>
                                              </div>`,

                               modalPosition: 'top',
                                type: 'header',

                             }).generate();

                   }
         }
         else {
           document.removeEventListener("click", editFunc);

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
  TASKSDATA[cardId].color = document.querySelector('.edit-modal__content-color.active').dataset.color;
  // console.log(TASKSDATA[cardId]);

  taskSort()
  addTaskToLocalStorage();
  cardRender();

}else if (type === "header") {
  title.textContent = document.querySelector('.window-header__edit-title').value;
  description.textContent = document.querySelector('.window-header__edit-descr').value;
  addInfoToLocalStorage();
    windowSectionHEIGHT();
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

const toggleActiveTool = (tool) => {

    toolbar.classList.toggle('active');

       tools.forEach((item) => {

         if (item !== tool) {
              item.classList.toggle('hide');
         }
       });

}


const deleteAllTasks = () => {
    localStorage.removeItem('Tasks');
    TASKSDATA = []
    windowSection.textContent = '';

}

const menuAnimation = () => {
  menuBTN.classList.toggle('active');
}
        //   Color
const choseColor = (e) => {
  const  newColors = document.querySelectorAll('.create-modal__content-color');
        newColors.forEach((item) => {
          item.classList.remove('active');
        });

      let colorActive = e.target.closest('.create-modal__content-color');
      colorActive.classList.add('active');
}
const colorBtnRender = () => {

  const  newColors = document.querySelectorAll('.create-modal__content-color');
    // console.log(newColors);
      newColors.forEach((item) => {
        item.style.backgroundColor = item.dataset.color;
      });
}

//  ------------------------OPTOINS
const optionsMenuToogle = () =>{
  options.classList.toggle('active');
  setTimeout(()=>{
    optionsBTNs.forEach(item => {
      item.classList.toggle('open')
    });

  },750)
}



const optionsMenuOpen = () => {
      optionsMenuToogle()
      themeChangeBTN.addEventListener('click',themeChange);

      setTimeout(()=>{
          document.addEventListener('click',closeOptions);
      },750)


}

const closeOptions = (e) =>{
   if (!e.target.closest('.options')) {
      console.log(1);
       document.removeEventListener('click',closeOptions);
       themeChangeBTN.removeEventListener('click',themeChange);
     const isChengeThemes = !!document.querySelector('.themes-change');
      isChengeThemes ?  options.removeChild(document.querySelector('.themes-change')) : void 0 ;
       optionsMenuToogle();
       menuBTN.classList.remove('active');
   }
};

const themeChange = () => {

  const themeChoseWrapp = document.createElement('div');
        themeChoseWrapp.classList.add('themes-change' , themes[currentColor].accent)
        themeChoseWrapp.setAttribute('data-theme_color', 'accent')
  themeColors.forEach((item, i) => {
    const color = document.createElement('div');
      color.classList.add('avaible-themes', item)
      themeChoseWrapp.append(color);
  });

  options.insertAdjacentHTML('beforeend', themeChoseWrapp.outerHTML);

  document.querySelectorAll('.avaible-themes').forEach((item, i) => {
    item.addEventListener('click' , ()=>{
    renderColors(themeColors[i])
    })
  });

}


const renderColors = (color) => {
      document.querySelectorAll('[data-theme_color]').forEach((item) => {

          if (item.dataset.theme_color == 'accent') {
                 item.classList.remove(themes[currentColor].accent);

                 item.classList.toggle(themes[color].accent);
          }
          else if (item.dataset.theme_color == 'light') {
            item.classList.remove(themes[currentColor].light);

            item.classList.toggle(themes[color].light);
          }
  });
  currentColor = color;
}

renderColors('brown')
// =------------------------------------------

               // ----------------createModal------
const createNewTask = () => {

                   const newTask = {
                        taskName: taskNameInput.value,
                        taskDescription: taskDescriptionInput.value,
                        from:  fromInput.value,
                        to : toInput.value,
                        forSort: +fromInput.value.split(':')[0] +fromInput.value.split(':')[1]/60,
                        color : document.querySelector('.create-modal__content-color.active') ? document.querySelector('.create-modal__content-color.active').dataset.color  :'#fff' ,
                   }

                TASKSDATA.push(newTask);
                taskSort();
                addTaskToLocalStorage();
                cardRender();
                closeCreateModal();

}
const closeCreateModal = () => {
  const  newColors = document.querySelectorAll('.create-modal__content-color');
                 taskNameInput.value = null;
                 taskDescriptionInput.value = null;
                 fromInput.value = null;
                 toInput.value = null;
                 createBTN.classList.remove('active');
                 modal.classList.remove("modal-open");
                 colorsWrapp.removeEventListener('click',choseColor);
                   newColors.forEach((item) => {
                     item.classList.remove('active');
                   });

    }


// ---- HEIGHT--------
 const windowSectionHEIGHT = () => {
   const
         windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight ,
         menuHEIGHT = document.querySelector('.menu').clientHeight ,
         mainWindowHEIGHT = document.querySelector('.main__window').clientHeight;
         console.log('hi');
   windowSection.style.height = mainWindowHEIGHT - (menuHEIGHT + windowHeaderHEIGHT  + MARGINBOTTOM - 60) + 'px'
 }
 const  windowHEIGHT = () => {
   document.body.style.height = window.innerHeight + 'px' ;
}


// -----------------------------EVENTS--------------------------
   window.addEventListener("resize",()=>{

  windowHEIGHT()
    windowSectionHEIGHT();
});
   menuBTN.addEventListener('click',toggleToolbar);

      //  ----------------------tools EVENTS
          createBTN.addEventListener('click',()=>{

              createBTN.classList.toggle('active');
              colorsWrapp.addEventListener('click',choseColor);
              modal.classList.add("modal-open");


        });


          clearBTN.addEventListener('click',()=>{


                  if (TASKSDATA.length > 0) {

                      clearBTN.classList.toggle('active');
                      toggleActiveTool(clearBTN)

                      if (clearBTN.classList.contains('active')) {
                        windowSection.addEventListener('click',deleteTask);

                      }else {
                         windowSection.removeEventListener('click',deleteTask);


                      }
         }
        });


          editBTN.addEventListener('click',()=>{


                   editStyleToggle();
                   toggleActiveTool(editBTN);

                    if (editBTN.classList.contains('active')) {
                        document.addEventListener("click", editFunc);

                    } else {
                       document.removeEventListener("click", editFunc);

                     }


  });

          menuBTN.addEventListener("click",()=>{





                if (menuBTN.classList.contains('active')) {
                   optionsMenuOpen();

                }else {
                  closeOptions()
                }



          });




      //  ----------------------CLOSE EVENTS
  document.addEventListener("click", e=>{
  const target  =  e.target.closest('.create-modal');
  const openBTN =  e.target.closest('#plus');

     if(!target && !openBTN  ){
         createBTN.classList.remove('active');
          modal.classList.remove("modal-open");

     }

});

      //  ----------------------SUBMIT EVENTS
  contentSubmit.addEventListener('click',e=>{
      e.preventDefault();
      createNewTask()
});
// --------------------------=-=-=----------------------------------


init()
