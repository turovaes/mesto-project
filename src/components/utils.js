export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  const popupForm = popup.querySelector('form');
  if (popupForm) {
    popupForm.reset();
  }
}
