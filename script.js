const editPopup = document.getElementById('edit-popup');
const editPopupForm = editPopup.querySelector('.form');
const editPopupNameInput = editPopupForm.querySelector('input[name="name"]');
const editPopupJobInput = editPopupForm.querySelector('input[name="vocation"]');

const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');

const cardsList = document.getElementById('elements');
const cardTemplate = document.getElementById('new-card').content;

const addPopup = document.getElementById('add-popup');
const addPopupForm = addPopup.querySelector('.form');
const addPopupNameInput = addPopupForm.querySelector('input[name="name"]');
const addPopupLinkInput = addPopupForm.querySelector('input[name="link"]');

const imagePopup = document.getElementById('image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/**
 * Открытие/закрытие попапа с профилем
 */

function editPopupOpened() {
  editPopupNameInput.value = profileName.textContent;
  editPopupJobInput.value = profileVocation.textContent;

  openPopup(editPopup);
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', editPopupOpened);

const editPopupCloseBtn = editPopup.querySelector('.popup__close');
editPopupCloseBtn.addEventListener('click', () => closePopup(editPopup));

/**
 * Сохранение изменений профайла
 */

function saveProfile(evt) {
  evt.preventDefault();
  
  profileName.textContent = editPopupNameInput.value;
  profileVocation.textContent = editPopupJobInput.value;

  closePopup(editPopup);
}

editPopupForm.addEventListener('submit', saveProfile);

/**
 * Открытие/закрытие попапа создания карточки
 */
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => openPopup(addPopup));

const addPopupCloseBtn = addPopup.querySelector('.popup__close');
addPopupCloseBtn.addEventListener('click', () => closePopup(addPopup));

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
 * Добавленеие дефолтных карточек
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

initialCards.forEach(card => {
  const newCard = createCardTemplate(card.name, card.link);
  cardsList.append(newCard);
});

/**
 * Добавление новой карточки
 */

function createCard(evt) {
  evt.preventDefault();
  const newCard = createCardTemplate(addPopupNameInput.value, addPopupLinkInput.value);
  cardsList.prepend(newCard);
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
 * Закрытие попапа с изображением
 */

const imagePopupCloseBtn = imagePopup.querySelector('.popup__close');
imagePopupCloseBtn.addEventListener('click', () => closePopup(imagePopup));




const popups = document.querySelectorAll('.popup');

popups.forEach(p => {
  p.style.transition = "visibility 0.5s, opacity 0.5s ease-in-out";
})


