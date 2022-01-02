const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__profession');
const popupEditProfile = document.querySelector('#popup_type_edit-profile');
const inputEditName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditInfo = popupEditProfile.querySelector('.popup__input_type_profession');



function openForm(popup) {
  document.addEventListener("click", handleCloseClick);
  document.addEventListener("keydown", handleCloseEscape);
  popup.classList.add('popup_is-opened');
}

function handleCloseClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeForm(evt.target);
  }
}

function handleCloseEscape(evt) {
  if (evt.key === "Escape") {
    closeForm(document.querySelector(".popup_is-opened"));
  }
}

function closeForm(popup) {
  document.removeEventListener("click", handleCloseClick);
  document.removeEventListener("keydown", handleCloseEscape);
  popup.classList.remove('popup_is-opened');
}

function openProfilePopup() {
  inputEditName.value = profileName.textContent;
  inputEditInfo.value = profileInfo.textContent;
  openForm(popupEditProfile);
}

export { openForm, closeForm, openProfilePopup };