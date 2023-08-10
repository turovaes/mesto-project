import { Popup } from './Popup';

export class PopupWithButton extends Popup {
  constructor(selector) {
    super(selector);
    this._button = this.popup.querySelector('.form__button')
  }

  open(callback) {
    super.open();
    this._callback = callback;
    this._button.addEventListener('click', this._callback);
  }

  close() {
    super.close();
    this._button.removeEventListener('click', this._callback);
  }
}
