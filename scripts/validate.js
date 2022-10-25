const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


function disableButton(button) {
  button.classList.add(options.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function enableButton(button) {
  button.classList.remove(options.inactiveButtonClass);
  button.removeAttribute('disabled');
}

function resetForm(form) {
  form.reset();
}

function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  input.classList.add(options.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.name}-error`);
  errorElement.textContent = '';
  input.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
}

function eraseForm(form) {
  const currentForm = form.querySelector('.popup__form');
  resetForm(currentForm);
  currentForm.querySelectorAll('.popup__error_visible').forEach(function (span) {
    span.textContent = "";
  })
  currentForm.querySelectorAll('.popup__input').forEach(function (input) {
    input.classList.remove('popup__input_type_error');
  })
}

function checkFormValidity(form) {
  let isValid = true;
  const inputList = form.querySelectorAll(options.inputSelector);
  inputList.forEach(function (input) {
    if (!input.validity.valid) {
      isValid = false;
    }
  })
  return isValid;
}

function handleInputError(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, options);
  } else {
    hideInputError(form, input, options);
  }
}

function handleButtonState(form) {
  const submitButton = form.querySelector(options.submitButtonSelector);
  if (!checkFormValidity(form, options)) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
}

function enableValidation() {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach(function (form) {
    handleButtonState(form, options);
    form.addEventListener('input', (evt) => {
      const currentInput = evt.target;
      handleInputError(form, currentInput, options);
      handleButtonState(form, options);
    })
  })

}

enableValidation();
