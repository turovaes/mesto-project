export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
  }

  open() {
    this.popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this.popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  setEventListeners() {
    const closeBtn = this.popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', this.close.bind(this));
    this.popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
      this.close();
    }
  }
}