export class FormValidator {
  constructor(validationSettings, rootElement) {
    this._rootElement = rootElement;
    this._formSelector = validationSettings.formSelector;
    this._inputSelector = validationSettings.inputSelector;
    this._submitButtonSelector = validationSettings.submitButtonSelector;
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
  }

  _clearValidation() {
    this.allInputs.forEach(inputElement => {
      const formError = this._rootElement.querySelector(`span[data-input-error="${inputElement.name}"]`);
      this._hideInputError(inputElement, formError)
    })
  }

  _showInputError(inputSelector, errorBlock, errorMessage) {
    inputSelector.classList.add(this._inputErrorClass);
    errorBlock.textContent = errorMessage;
    errorBlock.classList.add(this._errorClass);
  };

  _hideInputError(inputSelector, errorBlock) {
    inputSelector.classList.remove(this._inputErrorClass);
    errorBlock.textContent = '';
    errorBlock.classList.remove(this._errorClass);
  };

  _hasInvalidInput = () => {
    return this.allInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  setDisabledSubmitButton = () => {
    this.submitButton.disabled = true;
    this.submitButton.classList.add(this._inactiveButtonClass);
  }

  _toggleSubmitButtonState = () => {
    if (this._hasInvalidInput()) {
      this.setDisabledSubmitButton();
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  _isInputValid = (inputElement) => {
    const formError = this._rootElement.querySelector(`span[data-input-error="${inputElement.name}"]`);

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы.");
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, formError, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, formError);
    }
  };

  enableValidation() {
    this.allInputs = Array.from(this._rootElement.querySelectorAll(this._inputSelector));
    this.submitButton = this._rootElement.querySelector(this._submitButtonSelector);

    this.allInputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isInputValid.bind(this)(inputElement);
        this._toggleSubmitButtonState.bind(this)();
      });
    });

    this._rootElement.addEventListener('reset', () => {
      this._clearValidation(this._rootElement);
      this._toggleSubmitButtonState.bind(this)();
    });

    this._toggleSubmitButtonState();
  }
}
