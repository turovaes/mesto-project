import { closePopup } from './utils'

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
