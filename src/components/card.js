import { api } from './api.js';
import { Popup } from './Popup';

const deleteCardPopup = new Popup('#delete-card-popup');
deleteCardPopup.setEventListeners();

export class Card {
  constructor(initialData, selector, handleCardClick, profileId) {
    const cardTemplate = document.querySelector(selector).content;
    this.cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    this.data = initialData;
    this._setContent(handleCardClick);
    this._setDeleteBtn(profileId);
    this._setLikeBtn(profileId);
  }

  getCardElement() {
    return this.cardElement;
  }

  _setContent(handleCardClick) {
    const image = this.cardElement.querySelector('.element__image');
    image.setAttribute('src', this.data.link);
    image.setAttribute('alt', this.data.name);
    image.addEventListener('click', () => handleCardClick(this.data.link, this.data.name));
    this.cardElement.querySelector('.element__title').textContent = this.data.name;
  }

  _setDeleteBtn(profileId) {
    const deleteBtn = this.cardElement.querySelector('.element__delete-button');
    deleteCardPopup.popup.querySelector('.form__button').addEventListener('click', () => this._deleteCard.bind(this)());

    if (profileId === this.data.owner._id) {
      deleteBtn.addEventListener('click', () => deleteCardPopup.open());
    } else {
      deleteBtn.remove();
    }
  }

  _setLikeBtn(profileId) {
    this.likeBtn = this.cardElement.querySelector('.element__like-button');
    this.likeCount = this.cardElement.querySelector('.element__like-count');

    this.likeBtn.addEventListener('click', () => this._toggleLike.bind(this)());

    if (this.data.likes.some(like => like._id === profileId)) {
      this.likeBtn.classList.add('element__like-button_active');
    }

    this.likeCount.textContent = this.data.likes.length;
  }

  _toggleLike() {
    if (this.likeBtn.classList.contains('element__like-button_active')) {
      this._deleteLike();
    } else {
      this._addLike();
    }
  }

  _addLike() {
    api.addLikeToCard(this.data._id)
      .then((result) => {
        this.likeBtn.classList.add('element__like-button_active');
        this.likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  _deleteLike() {
    api.deleteLikeFromCard(this.data._id)
      .then((result) => {
        this.likeBtn.classList.remove('element__like-button_active');
        this.likeCount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.error(err);
      })
  }

  _deleteCard() {
    api.deleteCardById(this.data._id)
      .then(() => {
        this.cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

