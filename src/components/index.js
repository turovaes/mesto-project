import "../pages/index.css";
import { Card } from "./Card";
import { FormValidator } from "./FormValidator";
import { Api } from "./api";
import { PopupWithImage } from "./PopupWithImage";
import { PopupWithForm } from "./PopupWithForm";
import { PopupWithButton } from "./PopupWithButton";
import { UserInfo } from "./UserInfo";
import { Section } from "./Section";

const formClassList = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-error_active",
};

export const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
        authorization: 'b5831fed-c13a-4640-8fbe-56ca9bc6237e',
        'Content-Type': 'application/json'
    }
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithButton('#delete-card-popup');
deleteCardPopup.setEventListeners();

const userInfo = new UserInfo({
    userNameSelector: ".profile__name",
    userInfoSelector: ".profile__vocation",
    userAvatarSelector: ".profile__avatar",
});

const section = new Section({
    items: [],
    renderer: createCardElement
}, "#elements");


/**
 * Изменение профиля пользователя
 */
const editPopup = new PopupWithForm("#edit-popup", handlerEditProfile);
const editPopupForm = new FormValidator(formClassList, editPopup.popup);
editPopupForm.enableValidation();
editPopup.setEventListeners(editPopupForm);
document
    .querySelector(".profile__edit-button")
    .addEventListener("click", () => {
        const { name, about } = userInfo.getUserInfo();
        editPopupForm.allInputs[0].value = name;
        editPopupForm.allInputs[1].value = about;
        editPopup.open();
    });

/**
 * Изменение аватарки пользователя
 */
const avatarPopup = new PopupWithForm("#edit-avatar-popup", handlerEditImage);
const avatarPopupForm = new FormValidator(formClassList, avatarPopup.popup);
avatarPopupForm.enableValidation();
avatarPopup.setEventListeners(avatarPopupForm);
document
    .querySelector(".profile__avatar-edit-icon")
    .addEventListener("click", () => avatarPopup.open());

/**
* Добавление карточки
*/
const addCardPopup = new PopupWithForm("#add-popup", handlerAddCard);
const addCardPopupForm = new FormValidator(formClassList, addCardPopup.popup);
addCardPopupForm.enableValidation();
addCardPopup.setEventListeners(addCardPopupForm);
document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => addCardPopup.open());


function handleCardClick(link, name) {
    imagePopup.open(link, name);
};

function handleOpenDeletePopup(callback) {
    deleteCardPopup.open(callback);
}

function handleDeleteCard(id, callback) {
    api.deleteCardById(id)
        .then(() => {
            callback();
            deleteCardPopup.close();
        })
        .catch((err) => {
            console.error(err);
        });

}

function handleLikeCard(id, callback) {
    api.addLikeToCard(id)
        .then(callback)
        .catch((err) => {
            console.error(err);
        })

}

function handleDislikeCard(id, callback) {
    api.deleteLikeFromCard(id)
        .then(callback)
        .catch((err) => {
            console.error(err);
        })
}

function createCardElement(card) {
    const newCard = new Card(
        card,
        "#new-card",
        userInfo.getUserId(),
        {
            handleCardClick,
            handleDeleteCard,
            handleOpenDeletePopup,
            handleLikeCard,
            handleDislikeCard,
        }
    );
    return newCard.getCardElement();
}

function handlerEditImage({ avatar }) {
    api.updateAvatar(avatar)
        .then((result) => {
            userInfo.setUserInfo(result);
            avatarPopup.close();
        })
        .catch((e) => {
            console.error(e);
        });
};

function handlerEditProfile({ name, about }) {
    api.updateProfile(name, about)
        .then((result) => {
            userInfo.setUserInfo(result);
            editPopup.close();
        })
        .catch((e) => {
            console.error(e);
        });
};

function handlerAddCard({ name, link }) {
    api.addNewCard(name, link)
        .then((result) => {
            const cardElement = createCardElement(result);
            section.addItem(cardElement);
            addCardPopup.close();
        })
        .catch((e) => {
            console.error(e);
        });
};


(async () => {
    try {
        const profile = await api.getProfile();
        userInfo.setUserInfo(profile);

        const cards = await api.getInitialCards();
        section.renderer(cards.reverse());
    } catch (e) {
        console.error("Ошибка инициализации", e);
    }
})();
