import initialCards from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openForm, closeForm, openProfilePopup } from './utils.js';

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
const closeAllButtons = document.querySelectorAll('.popup__close');
const editFormName = document.querySelector('#edit_form');
const addCardFormName = document.querySelector('#add_form');


const settings = {
  formSelector: ".popup__form-window",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const formsList = Array.from(document.querySelectorAll(settings.formSelector));

initialCards.forEach((data) => {
  const card = new Card(data, cardTemplate)
  placesList.prepend(card.createCard());
});

profileEditButton.addEventListener("click", () => {
  openProfilePopup()
});

profileAddButton.addEventListener("click", () => {
  openForm(profileAddCard)
});

closeAllButtons.forEach(button => button.addEventListener('click', () => {
  const collectAllPopups = document.querySelectorAll('.popup');
  collectAllPopups.forEach(popup => closeForm(popup));
}));


/*========Forms Validation=========*/

formsList.forEach((formElement) => {
  const form = new FormValidator(settings, formElement);
  form.enableValidation();
});

function handleEditProfileSubmit(event, popup) {
  event.preventDefault();
  profileName.textContent = inputEditName.value;
  profileProfession.textContent = inputEditInfo.value;
  closeForm(popup);
}

function handleAddCardSubmit(event, popup) {
  event.preventDefault();
  const saveButton = popup.querySelector('.popup__submit');
  const data = {
    name: inputTitle.value,
    link: inputImage.value
  };
  const card = new Card(data, cardTemplate)
  placesList.prepend(card.createCard());
  closeForm(popup);
  saveButton.disabled = true;
  saveButton.classList.add('popup__submit_disabled');
  inputTitle.value = '';
  inputImage.value = '';
}

editFormName.addEventListener('submit', () => handleEditProfileSubmit(event, profileEditProfile));
addCardFormName.addEventListener('submit', () => handleAddCardSubmit(event, profileAddCard));

// /*---TEMPLATE---*/
// function createCardElement({ name, link, alt }) {
//   const card = cardTemplate.cloneNode(true);
//   const cardImageAlt = card.querySelector(".element__image");
//   cardImageAlt.src = link;
//   cardImageAlt.alt = alt;
//   card.querySelector(".element__title").textContent = name;


//   card.querySelector(".element__like-button").addEventListener("click", (evt) => {
//     evt.target.classList.toggle("element__like-button_is-active")
//   });


//   card.querySelector(".element__delete_btn").addEventListener("click", (evt) => {
//     const removeCard = card;
//     removeCard.remove();
//   });
//   card.querySelector(".element__image").addEventListener("click", (evt) => {
//     openPopup(presentImage);
//     popupImage.src = card.querySelector(".element__image").src;
//     popupImageInfo.textContent = card.querySelector(".element__info").textContent;
//     popupImage.alt = card.querySelector(".element__image").alt;
//   });

//   return card;
// }



// presentImageCloseButton.addEventListener("click", () => closePopup(presentImage));