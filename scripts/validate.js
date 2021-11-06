
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

function showInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

const toggleButtonState = (inputElements, buttonElement, settings) => {
  const hasInvalidInput = inputElements.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

function setEventListener(formElement, settings) {
  const inputElements = [...formElement.querySelectorAll(settings.inputSelector)];
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputElements, buttonElement, settings);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputElements, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListener(formElement, settings);
  });
}

enableValidation({
  formSelector: ".popup__form-window",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
