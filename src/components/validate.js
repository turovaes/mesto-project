function clearValidation(formElement, inputErrorClass, errorClass) {
  const allInputs = formElement.querySelectorAll('input');

  allInputs.forEach(input => {
    const formError = formElement.querySelector(`span[data-input-error="${input.name}"]`);
    hideInputError(input, formError, inputErrorClass, errorClass)
  })
}

/**
 * Валидация инпута
 */

function showInputError(input, errorBlock, errorMessage, inputErrorClass, errorClass) {
  input.classList.add(inputErrorClass);
  errorBlock.textContent = errorMessage;
  errorBlock.classList.add(errorClass);
};

function hideInputError(input, errorBlock, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorBlock.textContent = '';
  errorBlock.classList.remove(errorClass);
};

const hasInvalidInput = (allInputs) => {
  return allInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleSubmitButtonState = (submitButton, allInputs, inactiveButtonClass) => {
  if (hasInvalidInput(allInputs)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  }
};

const isInputValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`span[data-input-error="${inputElement.name}"]`);

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские буквы, кириллические буквы, знаки дефиса и пробелы.");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, formError, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, formError, inputErrorClass, errorClass);
  }
};


export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const allForms = document.querySelectorAll(formSelector);

  allForms.forEach(formElement => {
    const allInputs = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    allInputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        isInputValid(formElement, inputElement, inputErrorClass, errorClass);
        toggleSubmitButtonState(submitButton, allInputs, inactiveButtonClass);
      });
    });

    formElement.addEventListener('reset', () => {
      clearValidation(formElement, inputErrorClass, errorClass);
      toggleSubmitButtonState(submitButton, allInputs, inactiveButtonClass);
    });

    toggleSubmitButtonState(submitButton, allInputs, inactiveButtonClass);
  });
}


