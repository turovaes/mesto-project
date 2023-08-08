import { Popup } from "./popup";

export class PopupWithForm extends Popup {
    constructor(selector, callbackSubmitForm) {
        super(selector);
        this._callbackSubmitForm = callbackSubmitForm;
    }

    _getInputValues() {
        const formValues = {};
        this._form.allInputs.forEach((inputItem) => {
            formValues[inputItem.name] = inputItem.value;
        });
        return formValues;
    }

    setEventListeners(form) {
        this._form = form;
        super.setEventListeners();
        this._form.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues(), () => this.close());
        });
    }

    close() {
        super.close();
        this._form.formElement.reset();
    }
}
