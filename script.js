
const editPopup = document.getElementById('edit-popup');
const addPopup = document.getElementById('add-popup');
const imagePopup = document.getElementById('image-popup');

function editPopupOpened() {
  editPopup.classList.add('popup_opened');

  const nameInput = editPopupForm.querySelector('input[name="name"]');
  const jobInput = editPopupForm.querySelector('input[name="vocation"]');

  nameInput.value = document.querySelector('.profile__name').innerHTML;
  jobInput.value = document.querySelector('.profile__vocation').innerHTML;
}

function addPopupOpened() {
  addPopup.classList.add('popup_opened');
}

function closePopup() {
  editPopup.classList.remove('popup_opened');
  addPopup.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
}

const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', editPopupOpened);

const closeButtonArr = document.querySelectorAll('.popup__close');

closeButtonArr.forEach(el => {
  el.addEventListener('click', closePopup);
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', addPopupOpened);

const popups = document.querySelectorAll('.popup');

popups.forEach(p => {
  p.style.transition = "visibility 0.5s, opacity 0.5s ease-in-out";
})

/**
 * Изменение профайла
 */

const editPopupForm = editPopup.querySelector('.form');

function saveProfile(evt) {
  evt.preventDefault();
  const nameInput = editPopupForm.querySelector('input[name="name"]');
  const jobInput = editPopupForm.querySelector('input[name="vocation"]');

  document.querySelector('.profile__name').innerHTML = nameInput.value;
  document.querySelector('.profile__vocation').innerHTML = jobInput.value;

  closePopup();
}

editPopupForm.addEventListener('submit', saveProfile);

/**
 * работа с карточками
 */

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsBlock = document.querySelector('.elements');

function addCard(name, link, addToStart) {
  const newCard = `
    <article class="element">
      <img class="element__image" src="${link}" alt="${name}" onclick="openImagePopup(this)">
      <img class="element__delete-button" src="./images/trash.svg" alt="Удалить" onclick="deleteCard(this)">
      <div class="element__caption">
        <h2 class="element__title">${name}</h2>
        <button type="button" class="element__like-button" onclick="toggleLike(this)"></button>
      </div>
    </article>
    `;
  if (addToStart) {
    cardsBlock.innerHTML = newCard + cardsBlock.innerHTML;
  } else {
    cardsBlock.innerHTML += newCard;
  }
}

initialCards.forEach(card => {
  addCard(card.name, card.link, false);
})

/**
 * Добавление новой карточки
 */
const addPopupForm = addPopup.querySelector('.form');

function createCard(evt) {
  evt.preventDefault();
  const nameInput = addPopupForm.querySelector('input[name="name"]');
  const linkInput = addPopupForm.querySelector('input[name="link"]');
  addCard(nameInput.value, linkInput.value, true);
  closePopup();
}

addPopupForm.addEventListener('submit', createCard);

/**
 * Удаление карточки
 */

function deleteCard(target) {
  target.parentNode.remove();
}

/**
 * Попап изображения
 */

function openImagePopup(target) {
  imagePopup.classList.add('popup_opened');
  const imageLink = target.getAttribute('src');
  const imageName = target.getAttribute('alt');

  imagePopup.querySelector('.popup__image').setAttribute('src', imageLink);
  imagePopup.querySelector('.popup__image').setAttribute('alt', imageName);
  imagePopup.querySelector('.popup__image-caption').innerHTML = imageName;
}

/**
 * Тугл лайков 
 */

function toggleLike(target) {
  target.classList.toggle('element__like-button_active');
}  



