/*Scripts Import */
import initialCards from '../scripts/initialCards.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForms.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';

/*CSS Import */
import './index.css';

/*Constants*/
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const profileEditProfile = "#popup_type_edit-profile";
const profileAddCard = "#popup_type_add-card";
const popupImageViewSelector = '.popup_image-container';
const placesList = ".elements__pattern";
const cardTemplate = document.querySelector("#card-template").content;
const inputEditName = document.querySelector(profileEditProfile).querySelector('.popup__input_type_name');
const inputEditInfo = document.querySelector(profileEditProfile).querySelector('.popup__input_type_profession');
const editFormName = document.querySelector('#edit_form');
const addCardFormName = document.querySelector('#add_form');
const formValidators = {};

const settings = {
  formSelector: ".popup__form-window",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};


const userData = new UserInfo(profileName, profileProfession);
const editProfilePopup = new PopupWithForm(handleEditProfileSubmit, profileEditProfile);
const addCardPopup = new PopupWithForm(handleAddCardFormSubmit, profileAddCard);
const popupImage = new PopupWithImage(popupImageViewSelector);
const openImage = popupImage.open;

addCardPopup.setEventListeners();
popupImage.setEventListeners();

profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
  const userElement = userData.getUserInfo();
  inputEditName.value = userElement.name;
  inputEditInfo.value = userElement.Profession;
});
profileAddButton.addEventListener('click', () => {
  addCardPopup.open();
});

const cardList = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardTemplate, openImage);
    cardList.addItem(card.createCard());
  }
},
placesList
)
cardList.renderer();

function handleEditProfileSubmit(submissionData){
  userData.setUserInfo(submissionData.name, submissionData.info);
  profileName.textContent = inputEditName.value;
  profileProfession.textContent = inputEditInfo.value;
  editProfilePopup.close();
  formValidators[editFormName.getAttribute('name')].resetValidation()
}

function handleAddCardFormSubmit(cardData){
  const card = new Card(cardData, cardTemplate, openImage);
  cardList.addItem(card.createCard());
  addCardPopup.close();
  formValidators[addCardFormName.getAttribute('name')].resetValidation()
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