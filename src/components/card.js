import { openPopup, closePopup, getProfileId, setDisabledSubmitPopupButton } from './utils';
import { api } from './api.js';
import { Popup, PopupWithImage } from './popup';

const cardsList = document.getElementById('elements');
const cardTemplate = document.getElementById('new-card').content;

const addPopup = document.getElementById('add-popup');
const addPopupForm = addPopup.querySelector('.form');
const addPopupNameInput = addPopupForm.querySelector('input[name="name"]');
const addPopupLinkInput = addPopupForm.querySelector('input[name="link"]');

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const deleteCardPopup = new Popup('#delete-card-popup');
deleteCardPopup.setEventListeners();
const deleteCardPopupBtn = deleteCardPopup.popup.querySelector('.form__button');

/**
 * Создание шаблона карточки
 */

function createCardTemplate({
  name,
  link,
  likes,
  _id,
  owner
}) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);

  newCard.id = _id;
  const image = newCard.querySelector('.element__image');
  image.setAttribute('src', link);
  image.setAttribute('alt', name);
  image.addEventListener('click', openImagePopup);

  newCard.querySelector('.element__title').textContent = name;

  const deleteBtn = newCard.querySelector('.element__delete-button');

  if (getProfileId() === owner._id) {
    deleteBtn.addEventListener('click', () => {
      deleteCardPopup.open();
      deleteCardPopupBtn.setAttribute('data-delete-id', _id);
    });
  } else {
    deleteBtn.remove();
  }

  const likeBtn = newCard.querySelector('.element__like-button');
  const likeCount = newCard.querySelector('.element__like-count');

  likeBtn.addEventListener('click', () => {
    if (likeBtn.classList.contains('element__like-button_active')) {
      deleteLike(likeBtn, likeCount, _id);
    } else {
      addLike(likeBtn, likeCount, _id);
    }
  });

  if (likes.some(like => like._id === getProfileId())) {
    likeBtn.classList.add('element__like-button_active');
  }

  likeCount.textContent = likes.length;

  return newCard;
}

/**
 * Добавление новой карточки
 */

function createCard(evt) {
  evt.preventDefault();
  setDisabledSubmitPopupButton(addPopup, true);
  api.addNewCard(addPopupNameInput.value, addPopupLinkInput.value)
    .then((result) => {
      const newCard = createCardTemplate(result);
      cardsList.prepend(newCard);
      addPopupForm.reset();
      closePopup(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setDisabledSubmitPopupButton(addPopup, false);
    });
}

addPopupForm.addEventListener('submit', createCard);

/**
 * Добавление лайкa 
 */

function addLike(likeBtn, likeCount, cardId) {
  api.addLikeToCard(cardId)
    .then((result) => {
      likeBtn.classList.add('element__like-button_active');
      likeCount.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}

/**
 * Удаление лайкa 
 */

function deleteLike(likeBtn, likeCount, cardId) {
  api.deleteLikeFromCard(cardId)
    .then((result) => {
      likeBtn.classList.remove('element__like-button_active');
      likeCount.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
}

/**
 * Открытие попапа с изображением
 */

function openImagePopup(event) {
  const imageLink = event.target.getAttribute('src');
  const imageName = event.target.getAttribute('alt');

  imagePopup.open(imageLink, imageName);
}

/**
 * Открытие/закрытие попапа создания карточки
 */
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  addPopupForm.reset();
  openPopup(addPopup);
});

/**
 * Добавленеие дефолтных карточек
 */

export function createInitialCards() {
  return api.getInitialCards()
    .then((cards) => {
      cards.forEach(card => {
        const newCard = createCardTemplate(card);
        cardsList.append(newCard);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Удаление карточки
 */

function deleteCard(evt) {
  const cardId = evt.target.getAttribute('data-delete-id');
  api.deleteCardById(cardId)
    .then(() => {
      document.getElementById(cardId).remove();
      deleteCardPopup.close();
      deleteCardPopupBtn.removeAttribute('data-delete-id');
    })
    .catch((err) => {
      console.log(err);
    });
}

deleteCardPopupBtn.addEventListener('click', deleteCard);