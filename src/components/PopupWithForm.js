import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(selector, callbackSubmitForm) {
        super(selector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this.popup.querySelector('form');
        this._formInputList = this.popup.querySelectorAll('.form__input');
    }

    _getInputValues() {
        const formValues = {};
        this._formInputList.forEach((inputItem) => {
            formValues[inputItem.name] = inputItem.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues(), () => this.close());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
