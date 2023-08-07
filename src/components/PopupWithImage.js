import { Popup } from './popup';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.image = this.popup.querySelector('.popup__image');
    this.imageCaption = this.popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    this.image.setAttribute('src', link);
    this.imageCaption.setAttribute('alt', name);
    this.imageCaption.textContent = name;
    super.open();
  }
}
