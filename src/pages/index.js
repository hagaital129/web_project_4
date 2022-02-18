/*Scripts Import */
// import initialCards from '../scripts/initialCards.js';
import Api from '../scripts/Api.js';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithVerification from "../scripts/PopupWithVerification";
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForms from '../scripts/PopupWithForms.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';
import { settings } from "../utils/constants";
import { elements } from "../utils/constants";
import { selectors } from "../utils/constants";


/*CSS Import */
import './index.css';

/*Constants*/
const formValidators = {};
//
const profileAvatarEdit = document.querySelector(".profile__avatar_hover");
const editImageLink = document.querySelector(".popup__image_link");
const likeButton = document.querySelector(".element__like-button");
const likeButtonCounter = document.querySelector(".element__like-button_counter")

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "86dc75a4-9134-49a7-b63a-4b72140fc6f9",
    "Content-Type": "application/json"
  }
});

const cardList = new Section({
  renderer: (cardData) => {
    cardList.addItem(createCard(cardData));
  }
},
  selectors.placesList
)

const userData = new UserInfo(elements.profileName, elements.profileProfession, elements.profileAvatar);
const editAvatarPopup = new PopupWithForms(handleProfileImgFormSubmit, selectors.profileAvatarSelector);
const editProfilePopup = new PopupWithForms(handleEditProfileSubmit, selectors.profileEditProfile);
const addCardPopup = new PopupWithForms(handleAddCardFormSubmit, selectors.profileAddCard);
const popupImage = new PopupWithImage(selectors.popupImageViewSelector);
const popupRemoveCard = new PopupWithVerification(handleDeleteCard, elements.popupDeleteConfirmation, '', '');
const openImage = popupImage.open;

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


Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    userData.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar, userInfo._id);
    cardList.renderer(cards);
  })
  .catch((err) => {
    console.log(err);
  })

editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
popupImage.setEventListeners();
popupRemoveCard.setEventListeners();

function handleEditProfileSubmit(submissionData) {
  editProfilePopup.renderingTime(true, 'Saving...');
  api.setUserInfo(submissionData)
    .then((res) => {
      userData.setUserInfo(res.name, res.about, res.avatar, res._id);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderingTime(false, 'Save')
    })

  formValidators[selectors.editFormName.getAttribute('name')].resetValidation()
}

function handleProfileImgFormSubmit(submissionData) {
  editAvatarPopup.renderingTime(true, 'Saving...')
  api.setUserAvatar(submissionData)
    .then((res) => {
      userData.setUserInfo(res.name, res.about, res.avatar, res._id);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderingTime(false, 'Save');
    })

};

function handleAddCardFormSubmit(cardData) {
  addCardPopup.renderingTime(true, 'Creating...');
  api.addNewCard(cardData)
    .then((res) => {
      cardList.addItem(createCard(res));
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderingTime(false, 'Create');
    })

  formValidators[selectors.addCardFormName.getAttribute('name')].resetValidation()
}

function handleDeletePopup(cardId, cardElement) {
  popupRemoveCard.setInfo(cardId,cardElement);
  popupRemoveCard.open();

}

function handleDeleteCard(cardId, cardElement) {
  popupRemoveCard.renderingTime(true, 'Deleting...');
  api.removeCard(cardId)
    .then((res) => {
      console.log(res);
      cardElement.remove();
      cardElement = null;
      popupRemoveCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupRemoveCard.renderingTime(false,'Yes');
    })
}

function likerHandler(card, addLike) {
  api.toggleLike(card.getId(), addLike)
    .then((res) => {
      card.updateLikes(res.likes);
      card.toggleMarkupLike();
    })
    .catch((err) => {
      console.log(err);
    })
}

function createCard(item) {
  const userId = userData.getUserInfo().id; 
  const cardElement = new Card(item, elements.cardTemplate, userId, openImage, handleDeletePopup, likerHandler);
  return cardElement.createCard();
}

elements.profileEditButton.addEventListener('click', () => {
  formValidators[selectors.editFormName.getAttribute('name')].resetValidation();
  editProfilePopup.open();
  const userElement = userData.getUserInfo();
  elements.inputEditName.value = userElement.name;
  elements.inputEditInfo.value = userElement.Profession;
});

elements.profileAvatarButton.addEventListener('click', () => {
  formValidators[elements.profileEditProfile.getAttribute('name')].resetValidation();
  editAvatarPopup.open();
})

elements.profileAddButton.addEventListener('click', () => {
  formValidators[selectors.addCardFormName.getAttribute('name')].resetValidation();
  addCardPopup.open();
});
