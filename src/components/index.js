import '../pages/index.css';

import { Card } from './card';
import { FormValidator } from './FormValidator';
import { api } from './api'
import { PopupWithImage } from './PopupWithImage';
import { PopupWithForm } from './PopupWithForm';
import { UserInfo } from './UserInfo';

const formClassList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const addPopupForm = document.querySelector('#add-popup');
const addPopupValidate = new FormValidator(formClassList, addPopupForm);
addPopupValidate.enableValidation();

const cardList = document.querySelector('.elements');

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const user = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__vocation',
  userAvatarSelector: '.profile__avatar'
});

const handleCardClick = (link, name) => {
  imagePopup.open(link, name)
};

const handleSaveProfile = ({ name, about }, closeCallback) => {
  api.updateProfile(name, about)
    .then((result) => {
      user.setUserInfo(result);
      closeCallback();
    })
    .catch((err) => {
      console.error(err);
    })
}

const handleSaveAvatar = ({ avatar }, closeCallback) => {
  api.updateAvatar(avatar)
  .then((result) => {
    user.setUserInfo(result);
    closeCallback();
  })
  .catch((err) => {
    console.error(err);
  })
}

(async () => {
  const profile = await api.getProfile();

  user.setUserInfo(profile);

  const cards = await api.getInitialCards()
    .catch((error) => {
      console.error(error);
      return [];
    });

  cards.forEach((cardData) => {
    const newCard = new Card(cardData, '#new-card', handleCardClick, profile._id);
    cardList.append(newCard.getCardElement());
  });

  /**
   * Изменение информации о пользователе
   */
  const editPopup = new PopupWithForm('#edit-popup', handleSaveProfile);
  const editPopupForm = new FormValidator(formClassList, editPopup.popup);
  editPopupForm.enableValidation();
  editPopup.setEventListeners(editPopupForm);
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    const { name, about } = user.getUserInfo(); 
    editPopupForm.formElement.querySelector('input[name="name"]').value = name;
    editPopupForm.formElement.querySelector('input[name="about"]').value = about;
    editPopup.open();
  } );

  /**
   * Изменение аватарки пользователя
   */
  const avatarPopup = new PopupWithForm('#edit-avatar-popup', handleSaveAvatar);
  const avatarPopupForm = new FormValidator(formClassList, avatarPopup.popup);
  avatarPopupForm.enableValidation();
  avatarPopup.setEventListeners(avatarPopupForm);
  document.querySelector('.profile__avatar-edit-icon').addEventListener('click', () => avatarPopup.open());
})();