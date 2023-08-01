export class FormValidator { 
  constructor (validationSettings, formElement){
    this._formElement = formElement;
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    
  }

  _clearValidation(formElement, inputErrorClass, errorClass) {
    const allInputs = formElement.querySelectorAll('input');
  
    allInputs.forEach(inputSelector => {
      const formError = formElement.querySelector(`span[data-input-error="${inputSelector.name}"]`);
      this._hideInputError(inputSelector, formError, inputErrorClass, errorClass)
    })
  }
  
  /**
   * Валидация инпута
   */
  
  _showInputError(inputSelector, errorBlock, errorMessage, inputErrorClass, errorClass) {
    inputSelector.classList.add(inputErrorClass);
    errorBlock.textContent = errorMessage;
    errorBlock.classList.add(errorClass);
  };
  
  _hideInputError(inputSelector, errorBlock, inputErrorClass, errorClass) {
    inputSelector.classList.remove(inputErrorClass);
    errorBlock.textContent = '';
    errorBlock.classList.remove(errorClass);
  };
  
  _hasInvalidInput = (allInputs) => {
    return allInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  _toggleSubmitButtonState = (submitButton, allInputs, inactiveButtonClass) => {
    if (this._hasInvalidInput(allInputs)) {
      submitButton.disabled = true;
      submitButton.classList.add(inactiveButtonClass);
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove(inactiveButtonClass);
    }
  };
  
  _isInputValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    const formError = formElement.querySelector(`span[data-input-error="${inputElement.name}"]`);
    
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы.");
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, formError, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(inputElement, formError, inputErrorClass, errorClass);
    }
  };
  
  
  enableValidation() {
    const allForms = document.querySelectorAll(this._formSelector);
    allForms.forEach(formElement => {
      const allInputs = Array.from(formElement.querySelectorAll(this._inputSelector));
      const submitButton = formElement.querySelector(this._submitButtonSelector);
      allInputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._isInputValid(formElement, inputElement, this._inputErrorClass, this._errorClass);
          this._toggleSubmitButtonState(submitButton, allInputs, this._inactiveButtonClass);
        });
      });
  
      formElement.addEventListener('reset', () => {
        this._clearValidation(formElement, this._inputErrorClass, this._errorClass);
        this._toggleSubmitButtonState(submitButton, allInputs, this._inactiveButtonClass);
      });
  
      this._toggleSubmitButtonState(submitButton, allInputs, this._inactiveButtonClass);
    });
  }
}
