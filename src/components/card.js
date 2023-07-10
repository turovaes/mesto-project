import { openPopup, closePopup } from './utils';
import { getInitialCards } from './api.js';

const cardsList = document.getElementById('elements');
const cardTemplate = document.getElementById('new-card').content;

const addPopup = document.getElementById('add-popup');
const addPopupForm = addPopup.querySelector('.form');
const addPopupNameInput = addPopupForm.querySelector('input[name="name"]');
const addPopupLinkInput = addPopupForm.querySelector('input[name="link"]');

const imagePopup = document.getElementById('image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

/**
 * Создание шаблона карточки
 */

function createCardTemplate(name, link) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  
  const image = newCard.querySelector('.element__image');
  image.setAttribute('src', link);
  image.setAttribute('alt', name);
  image.addEventListener('click', openImagePopup);

  newCard.querySelector('.element__title').textContent = name;

  const deleteBtn = newCard.querySelector('.element__delete-button');
  deleteBtn.addEventListener('click', () => deleteCard(newCard));

  const likeBtn = newCard.querySelector('.element__like-button');
  likeBtn.addEventListener('click', toggleLike);

  return newCard;
}

/**
 * Добавление новой карточки
 */

function createCard(evt) {
  evt.preventDefault();

  const newCard = createCardTemplate(addPopupNameInput.value, addPopupLinkInput.value);
  cardsList.prepend(newCard);

  addPopupNameInput.value = '';
  addPopupLinkInput.value = '';
  
  closePopup(addPopup);
}

addPopupForm.addEventListener('submit', createCard);

/**
 * Удаление карточки
 */

function deleteCard(target) {
  target.remove();
}

/**
 * Тугл лайков 
 */

function toggleLike(event) {
  event.target.classList.toggle('element__like-button_active');
}  

/**
 * Открытие попапа с изображением
 */

function openImagePopup(event) {
  const imageLink = event.target.getAttribute('src');
  const imageName = event.target.getAttribute('alt');

  imagePopupImage.setAttribute('src', imageLink);
  imagePopupImage.setAttribute('alt', imageName);
  imagePopupCaption.textContent = imageName;

  openPopup(imagePopup);
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
  getInitialCards()
    .then((cards) => {
      cards.forEach(card => {
        const newCard = createCardTemplate(card.name, card.link);
        cardsList.append(newCard);
      });
    })
    .catch((err) => {
      console.log(err); 
    });
}