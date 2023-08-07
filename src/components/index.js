import '../pages/index.css';

import { Card } from './card';
import { loadProfile } from './profile';
import { FormValidator } from './FormValidator';
import { api } from './api'
import { PopupWithImage } from './PopupWithImage';

const formClassList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const editPopupForm = document.querySelector('#edit-popup');
const editAvatarPopupForm = document.querySelector('#edit-avatar-popup');
const addPopupForm = document.querySelector('#add-popup');

const editPopupValidate = new FormValidator(formClassList, editPopupForm);
editPopupValidate.enableValidation();
const editAvatarPopupValidate = new FormValidator(formClassList, editAvatarPopupForm);
editAvatarPopupValidate.enableValidation();
const addPopupValidate = new FormValidator(formClassList, addPopupForm);
addPopupValidate.enableValidation();

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const cardList = document.querySelector('.elements');

(async () => {
  const user = await api.getProfile();

  const cards = await api.getInitialCards()
    .catch((error) => {
      console.error(error);
      return [];
    });

  cards.forEach((cardData) => {
    const newCard = new Card(cardData, '#new-card', imagePopup.open, user._id);
    cardList.append(newCard.getCardElement());
  });
})();