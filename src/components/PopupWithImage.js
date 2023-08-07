import { Popup } from './popup';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this.popup.querySelector('.popup__image');
    this._imageCaption = this.popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    super.open();
    this._image.setAttribute('src', link);
    this._imageCaption.setAttribute('alt', name);
    this._imageCaption.textContent = name;
  }
}
