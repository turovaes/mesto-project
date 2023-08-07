import { openPopup, closePopup, setDisabledSubmitPopupButton } from './utils';
import { api } from './Api.js';


const editPopup = document.getElementById('edit-popup');
const editPopupForm = editPopup.querySelector('.form');
const editPopupNameInput = editPopupForm.querySelector('input[name="name"]');
const editPopupJobInput = editPopupForm.querySelector('input[name="vocation"]');

const editAvatarPopup = document.getElementById('edit-avatar-popup');
const editAvatarPopupForm = editAvatarPopup.querySelector('.form');
const editAvatarPopupLinkInput = editAvatarPopup.querySelector('input[name="link"]')

const profileName = document.querySelector('.profile__name');
const profileVocation = document.querySelector('.profile__vocation');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarEditIcon = document.querySelector('.profile__avatar-edit-icon');

/**
 * Сохранение изменений профайла
 */

function saveProfile(evt) {
  evt.preventDefault();
  setDisabledSubmitPopupButton(editPopup, true);
  api.updateProfile(editPopupNameInput.value, editPopupJobInput.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileVocation.textContent = result.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setDisabledSubmitPopupButton(editPopup, false);
    });
}

editPopupForm.addEventListener('submit', saveProfile);

/**
 * Открытие/закрытие попапа с профилем
 */

function openEditPopup() {
  editPopupNameInput.value = profileName.textContent;
  editPopupJobInput.value = profileVocation.textContent;

  openPopup(editPopup);
}

const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openEditPopup);

export const loadProfile = () => {
  return api.getProfile()
    .then((result) => {
      profileName.textContent = result.name;
      profileVocation.textContent = result.about;
      profileAvatar.src = result.avatar;
      profileName.setAttribute('data-id', result._id);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Редактирование аватара
 */

profileAvatarEditIcon.addEventListener('click', () => {
  editAvatarPopupForm.reset();
  openPopup(editAvatarPopup);
});

function saveAvatar(evt) {
  evt.preventDefault();
  setDisabledSubmitPopupButton(editAvatarPopup, true);
  api.updateAvatar(editAvatarPopupLinkInput.value)
    .then((result) => {
      profileAvatar.src = result.avatar;
      editAvatarPopupForm.reset();
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setDisabledSubmitPopupButton(editAvatarPopup, false);
    });
}

editAvatarPopupForm.addEventListener('submit', saveAvatar);



