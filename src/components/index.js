import '../pages/index.css';

import {} from './modal';
import { createInitialCards } from './card';
import { loadProfile } from './profile';
import { enableValidation } from './validate';

loadProfile().then(createInitialCards);

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error_active'
});


