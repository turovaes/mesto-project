import "../pages/index.css";
import { Card } from "./Card";
import { FormValidator } from "./FormValidator";
import { api } from "./api";
import { PopupWithImage } from "./PopupWithImage";
import { PopupWithForm } from "./PopupWithForm";
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

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const userCreate = new UserInfo({
    userNameSelector: ".profile__name",
    userInfoSelector: ".profile__vocation",
    userAvatarSelector: ".profile__avatar",
});

const handleCardClick = (link, name) => {
    imagePopup.open(link, name);
};

const handlerEditImage = ({ avatar }, closePopup) => {
    return api.updateAvatar(avatar)
        .then((result) => {
            userCreate.setUserInfo(result);
            closePopup();
        })
        .catch((e) => {
            console.error(e);
        });
};

const handlerEditProfile = ({ name, about }, closePopup) => {
    return api.updateProfile(name, about)
        .then((result) => {
            userCreate.setUserInfo(result);
            closePopup();
        })
        .catch((e) => {
            console.error(e);
        });
};

(async () => {
    const user = await api.getProfile();
    userCreate.setUserInfo(user);

    const cards = await api.getInitialCards().catch((error) => {
        console.error(error);
        return [];
    });

    const section = new Section(
        {
            items: cards,
            renderer: (item, addCard) => {
                const newCard = new Card(
                    item,
                    "#new-card",
                    handleCardClick,
                    user._id
                );
                addCard(newCard.getCardElement());
            },
        },
        "#elements"
    );

    section.renderer();

    const handlerAddImages = ({ name, link }, closePopup) => {
      return api.addNewCard(name, link)
          .then((result) => {
              const card = new Card(
                  result,
                  "#new-card",
                  handleCardClick,
                  user._id
              );
              section.addItem(card.getCardElement());
              closePopup();
          })
          .catch((e) => {
              console.error(e);
          });
  };

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
            const { name, about } = userCreate.getUserInfo();
            editPopup._form.querySelector(
                'input[name="name"]'
            ).value = name;
            editPopup._form.querySelector(
                'input[name="about"]'
            ).value = about;
            editPopup.open();
        });

    /**
     * Изменение аватарки пользователя
     */
    const avatarPopup = new PopupWithForm(
        "#edit-avatar-popup",
        handlerEditImage
    );
    const avatarPopupForm = new FormValidator(formClassList, avatarPopup.popup);
    avatarPopupForm.enableValidation();
    avatarPopup.setEventListeners(avatarPopupForm);
    document
        .querySelector(".profile__avatar-edit-icon")
        .addEventListener("click", () => avatarPopup.open());

     /**
     * Добавление карточки
     */
     const addCardPopup = new PopupWithForm(
        "#add-popup",
        handlerAddImages
    );
    const addCardPopupForm = new FormValidator(formClassList, addCardPopup.popup);
    addCardPopupForm.enableValidation();
    addCardPopup.setEventListeners(addCardPopupForm);
    document
        .querySelector(".profile__add-button")
        .addEventListener("click", () => addCardPopup.open());
})();
