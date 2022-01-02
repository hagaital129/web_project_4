import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openForm, closeForm, openProfilePopup } from './utils.js';
import '../pages/index.css';

const profileEditProfile = document.querySelector("#popup_type_edit-profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const profileAddCard = document.querySelector("#popup_type_add-card");
const popupEditProfile = document.querySelector('#popup_type_edit-profile');
const inputTitle = profileAddCard.querySelector(".popup__input_type_card-name");
const inputImage = profileAddCard.querySelector(".popup__input_type_card-link");
const profileAddButton = document.querySelector(".profile__add-button");
const inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditInfo = popupEditProfile.querySelector('.popup__input_type_profession');
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".elements__pattern");
const allCloseButtons = document.querySelectorAll('.popup__close');
const editFormName = document.querySelector('#edit_form');
const addCardFormName = document.querySelector('#add_form');
const collectAllPopups = document.querySelectorAll('.popup');
const formPopup = document.querySelector('.popup__form-window');
const formValidators = {};


const settings = {
  formSelector: ".popup__form-window",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

initialCards.forEach((data) => {
  const card = new Card(data, cardTemplate)
  placesList.prepend(card.createCard());
});

profileEditButton.addEventListener("click", () => {
  openProfilePopup();
});

profileAddButton.addEventListener("click", () => {
  openForm(profileAddCard);
});

allCloseButtons.forEach(button => button.addEventListener('click', () => {
  collectAllPopups.forEach(popup => closeForm(popup));
}),
);

function handleEditProfileSubmit(event, popup) {
  event.preventDefault();
  profileName.textContent = inputEditName.value;
  profileProfession.textContent = inputEditInfo.value;
  closeForm(popup);
  formValidators[ editFormName.getAttribute('name') ].resetValidation()


}

function handleAddCardSubmit(event, popup) {
  event.preventDefault();
  const data = {
    name: inputTitle.value,
    link: inputImage.value
  };
  const card = new Card(data, cardTemplate);
  placesList.prepend(card.createCard());
  closeForm(popup);
  inputTitle.value = '';
  inputImage.value = '';
  formValidators[ addCardFormName.getAttribute('name') ].resetValidation()
}

const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.formSelector));
  formsList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

editFormName.addEventListener('submit', (event) => {
  handleEditProfileSubmit(event, profileEditProfile)
});
addCardFormName.addEventListener('submit', (event) => {
  handleAddCardSubmit(event, profileAddCard);
});