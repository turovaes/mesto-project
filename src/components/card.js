export class Card {
  constructor(initialData, selector, profileId, { handleCardClick, handleOpenDeletePopup, handleDeleteCard, handleLikeCard, handleDislikeCard }) {
    this.data = initialData;
    this._callbacks = {
      handleCardClick,
      handleOpenDeletePopup,
      handleDeleteCard,
      handleLikeCard,
      handleDislikeCard
    };

    const cardTemplate = document.querySelector(selector).content;
    this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    this._setContent();
    this._setDeleteBtn(profileId);
    this._setLikeBtn(profileId);
  }

  getCardElement() {
    return this._cardElement;
  }

  _setContent() {
    const image = this._cardElement.querySelector('.element__image');
    image.setAttribute('src', this.data.link);
    image.setAttribute('alt', this.data.name);
    image.addEventListener('click', () => this._callbacks.handleCardClick(this.data.link, this.data.name));
    this._cardElement.querySelector('.element__title').textContent = this.data.name;
  }

  _setDeleteBtn(profileId) {
    const deleteBtn = this._cardElement.querySelector('.element__delete-button');

    if (profileId === this.data.owner._id) {
      deleteBtn.addEventListener('click', () => this._callbacks.handleOpenDeletePopup(() => this._deleteCard()));
    } else {
      deleteBtn.remove();
    }
  }

  _setLikeBtn(profileId) {
    this.likeBtn = this._cardElement.querySelector('.element__like-button');
    this.likeCount = this._cardElement.querySelector('.element__like-count');

    this.likeBtn.addEventListener('click', () => this._toggleLike());

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
    this._callbacks.handleLikeCard(
      this.data._id,
      (result) => {
        this.likeBtn.classList.add('element__like-button_active');
        this.likeCount.textContent = result.likes.length;
      }
    )
  }

  _deleteLike() {
    this._callbacks.handleDislikeCard(
      this.data._id,
      (result) => {
        this.likeBtn.classList.remove('element__like-button_active');
        this.likeCount.textContent = result.likes.length;
      }
    )
  }

  _deleteCard() {
    this._callbacks.handleDeleteCard(
      this.data._id,
      () => {
        this._cardElement.remove();
      }
    );
  }
}

