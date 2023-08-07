import "../pages/index.css";

import { Card } from "./card";
import { loadProfile } from "./profile";
import { FormValidator } from "./FormValidator";
import { api } from "./Api";
import { PopupWithImage } from "./PopupWithImage";
import { Section } from "./Section";
import { UserInfo } from "./UserInfo";
import { PopupWithForm } from "./PopupWithForm";

const formClassList = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_inactive",
    inputErrorClass: "form__input_error",
    errorClass: "form__input-error_active",
};

const editPopupForm = document.querySelector("#edit-popup");
const editAvatarPopupForm = document.querySelector("#edit-avatar-popup");
const addPopupForm = document.querySelector("#add-popup");

const editPopupValidate = new FormValidator(formClassList, editPopupForm);
editPopupValidate.enableValidation();
const editAvatarPopupValidate = new FormValidator(
    formClassList,
    editAvatarPopupForm
);
editAvatarPopupValidate.enableValidation();
const addPopupValidate = new FormValidator(formClassList, addPopupForm);
addPopupValidate.enableValidation();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const handleCardClick = (link, name) => imagePopup.open(link, name);

const cardList = document.querySelector(".elements");

const userCreate = new UserInfo({
    userNameSelector: ".profile__name",
    userInfoSelector: ".profile__vocation",
    userAvatarSelector: ".profile__avatar",
});

const handlerEditImage = async () => {
    try {
        console.log('123123')
    } catch (e) {
        console.error(e)
    }
}

// const editImage = new PopupWithForm('#edit-popup')

(async () => {
    const user = await api.getProfile();

    userCreate.setUserInfo(user);

    const cards = await api.getInitialCards().catch((error) => {
        console.error(error);
        return [];
    });

    const renderInitialCards = new Section(
        {
            items: cards,
            renderer: (item) => {
                const newCard = new Card(
                    item,
                    "#new-card",
                    handleCardClick,
                    user._id
                );
                cardList.append(newCard.getCardElement());
            },
        },
        "#elements"
    );

    renderInitialCards.renderer();
})();
