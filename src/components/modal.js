import { closePopup } from './utils'

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

window.addEventListener('keydown', closePopupEsc);

/**
 * Закрытие попапа нажатием на оверлей
 */

const closePopupOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  } 
}

/**
 * Добавление слушателей на все попапы
 */

const allPopups = document.querySelectorAll('.popup');

allPopups.forEach(popup => {
  const closeBtn = popup.querySelector('.popup__close')
  closeBtn.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', closePopupOverlay)
});
