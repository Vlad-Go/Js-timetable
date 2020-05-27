const
      mainWndowHEIGHT = document.querySelector('.main__window').clientHeight,
      windowHeaderHEIGHT = document.querySelector('.window__header').clientHeight,
      windowDescrHEIGHT = document.querySelector('.window__descr').clientHeight ,

      windowSection = document.querySelector('.window__section'),
      createBTN = document.getElementById('plus'),
      modal = document.querySelector('.create-modal');

const MARGINBOTTOM = 32;




// _______-----------------------cardRender---------------------------

// const cardRender = () => {
//
//   const card = `
//       <div class="card">
//                  <div class="card__task">
//                       <div class="card__task-header">${}</div>
//                       <div class="card__task-descr">${}</div>
//                  </div>
//                  <div class="card__time">
//                    <div id="from">${}</div>
//                       <div class="card__time-line"></div>
//                    <div id="to">${}</div>
//                  </div>
//        </div>
//     `
//     windowSection.insertAdjacentHTML('beforeend',card )
// }
// -----------------------------------------------------------


const createNewTask = () => {

    modal.classList.add("modal-open");



    // document.addEventListener("click", e=>{
    //   const target = e.target.closest('.create-modal');
    //   console.log();
    //    if(tr ){
    //         modal.classList.remove("modal-open")
    //    }
    //
    //
    // })


}












// ---- windowSection  HEIGHT--------
 const windowSectionHEIGHT = () => {
   windowSection.style.height = mainWndowHEIGHT - (windowHeaderHEIGHT + windowDescrHEIGHT + MARGINBOTTOM) + 'px'
 }

windowSectionHEIGHT()

const windowHEIGHT = () => {
  document.body.style.height = window.innerHeight;
}
windowHEIGHT()
// -----------------------------EVENTS--------------------------


createBTN.addEventListener('click',createNewTask);

window.addEventListener("resize",()=>{
  windowSectionHEIGHT();
  windowHEIGHT()
})
// && target.classList.contains('modal-open')
