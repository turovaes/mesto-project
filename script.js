
const editPopup = document.getElementById('edit-popup');
const addPopup = document.getElementById('add-popup');


function editPopupOpened() {
  editPopup.classList.add('popup_opened');

  const nameInput = editPopupForm.querySelector('input[name="name"]');
  const jobInput = editPopupForm.querySelector('input[name="vocation"]');
  
  nameInput.value = document.querySelector('.profile__name').innerHTML;
  jobInput.value = document.querySelector('.profile__vocation').innerHTML;

}

function addPopupOpened() {
  addPopup.classList.add('popup_opened')
}

function closePopup() {
  editPopup.classList.remove('popup_opened')
  addPopup.classList.remove('popup_opened')
}

function toggleLike(event) {
  console.log(event.target);
  event.target.classList.toggle('element__like-button_active');
}


const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', editPopupOpened);

const closeButtonArr = document.querySelectorAll('.popup__close');
// for (let i = 0; i < closeButtonArr.length; i++) {
//   closeButtonArr[i].addEventListener('click', closePopup);
// }

closeButtonArr.forEach(function(el) {
  el.addEventListener('click', closePopup);
})

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', addPopupOpened)

const likesArr = document.querySelectorAll('.element__like-button');
likesArr.forEach(function(el) {
  el.addEventListener('click', toggleLike )
})

/**
 * Изменение профайла
 */

const editPopupForm = editPopup.querySelector('.form');

function saveProfile(evt) {
  evt.preventDefault();
  const nameInput = editPopupForm.querySelector('input[name="name"]');
  const jobInput = editPopupForm.querySelector('input[name="vocation"]');
  
  document.querySelector('.profile__name').innerHTML = nameInput.value;
  document.querySelector('.profile__vocation').innerHTML = jobInput.value;

  closePopup();
}

editPopupForm.addEventListener('submit', saveProfile);
