export const settings = {
  formSelector: ".popup__form-window",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

export const selectors = {
  placesList: ".elements__pattern",
  profileAvatarSelector: ".popup_type_edit-profile-avatar",
  profileAddCard: "#popup_type_add-card",
  profileEditProfile: "#popup_type_edit-profile",
  popupImageViewSelector: '.popup_image-container',
  editFormName: document.querySelector('#edit_form'),
  addCardFormName: document.querySelector('#add_form'),

}

export const elements = {
  profileName: document.querySelector(".profile__name"),
  profileProfession: document.querySelector(".profile__profession"),
  profileAvatar: document.querySelector(".profile__avatar"),
  profileAvatarButton: document.querySelector(".profile__avatar_hover"),
  inputEditName: document.querySelector(selectors.profileEditProfile).querySelector('.popup__input_type_name'),
  inputEditInfo: document.querySelector(selectors.profileEditProfile).querySelector('.popup__input_type_profession'),
  popupDeleteConfirmation: ".popup_type_confirm_removal",
  profileEditButton: document.querySelector(".profile__edit-button"),
  profileAddButton: document.querySelector(".profile__add-button"),

  cardTemplate: document.querySelector("#card-template").content,


}
