export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupEsc);
}

/**
 * Закрытие попапа клавишей esc
 */

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  }
}

/**
 * Получение id пользователя
 */

export function getProfileId() {
 return document.querySelector('.profile__name').getAttribute('data-id');
}

/**
 * Изменение состояния submit кнопки у попапа
 */

export function setDisabledSubmitPopupButton(popup, isDisabled) {
  const submitBtn = popup.querySelector('.form__button');
  submitBtn.textContent = isDisabled ? 'Сохранение...' : 'Сохранить';
  submitBtn.disabled = isDisabled;
}