import { openPopup, closePopup } from './utils'

const editPopup = document.getElementById('edit-popup');
const editPopupForm = editPopup.querySelector('.form');
const editPopupNameInput = editPopupForm.querySelector('input[name="name"]');
const editPopupJobInput = editPopupForm.querySelector('input[name="vocation"]');

const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

/**
 * Сохранение изменений профайла
 */

function saveProfile(evt) {
  evt.preventDefault();
  
  profileName.textContent = editPopupNameInput.value;
  profileVocation.textContent = editPopupJobInput.value;

  closePopup(editPopup);
}

editPopupForm.addEventListener('submit', saveProfile);

/**
 * Открытие/закрытие попапа с профилем
 */

function editPopupOpened() {
  editPopupNameInput.value = profileName.textContent;
  editPopupJobInput.value = profileVocation.textContent;
  
  openPopup(editPopup);
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', editPopupOpened);
