import '../pages/index.css';

import {} from './modal';
import { createInitialCards } from './card';
import { loadProfile } from './profile';
import { FormValidator } from './FormValidator';

loadProfile().then(createInitialCards);

const formClassList = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
}

const editPopupValidate = new FormValidator(formClassList, editPopupForm);
editPopupValidate.enableValidation();
const editAvatarPopupValidate = new FormValidator(formClassList, editAvatarPopupForm);
editAvatarPopupValidate.enableValidation();
const addPopupValidate = new FormValidator(formClassList, addPopupForm);
addPopupValidate.enableValidation();