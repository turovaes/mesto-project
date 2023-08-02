import { Popup } from './popup'

export class PopupWithForm extends Popup {
    constructor(selector, callbackSubmitForm){
        super(selector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popup.querySelector('.form');
        this._formInputList = this._popup.querySelectorAll('.form__input');
        this._formButton = this._popup.querySelector('.form__button');
        this._formButtonTextContent = this._formButton.TextContent;
    }

    _getInputValues(){
        const formValues = {};
        this._formInputList.forEach(inputItem => {
            formValues[inputItem.name] = inputItem.value;
        })
        return formValues
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', evt =>{
            evt.preventDefault();
            this._callbackSubmitForm(this._getInputValues())
        })
    }

    close(){
        super.close();
        this._form.reset();
    }
}