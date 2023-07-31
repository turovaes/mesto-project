import '../pages/index.css';

import {} from './modal';
import { createInitialCards } from './card';
import { loadProfile } from './profile';
import { FormValidator } from './FormValidator';

loadProfile().then(createInitialCards);

const form = new FormValidator({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
})

form.enableValidation();

