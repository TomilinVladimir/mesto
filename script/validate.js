
function disableButton(button, options) {
  button.classList.add(options.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function enableButton(button, options) {
  button.classList.remove(options.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function showInputError(form, input, options) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.add(options.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(form, input, options) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
}

function checkFormValidity(form, options) {
  let isValid = true;
  const inputList = form.querySelectorAll(options.inputSelector);
  inputList.forEach(function (input) {
    if (!input.validity.valid) {
      isValid = false;
    }
  })
  return isValid;
}

function handleInputError(form, input, options) {
  if (!input.validity.valid) {
    showInputError(form, input, options);
  } else {
    hideInputError(form, input, options);
  }
}

function handleButtonState(form, options) {
  const submitButton = form.querySelector(options.submitButtonSelector);
  if (!checkFormValidity(form, options)) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
}

function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach(function (form) {
    form.addEventListener('input', (evt) => {
      const currentInput = evt.target;
      handleInputError(form, currentInput, options);
      handleButtonState(form, options);
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
