export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    window.addEventListener('keydown', this.handleEscClose);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this.handleEscClose);
  }

  setEventListeners() {
    const closeBtn = this.popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => this.close());
    this.popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
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