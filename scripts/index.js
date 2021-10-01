let popup = document.querySelector(".popup");
let popupCloseButton = popup.querySelector(".popup__close");
let popupInputName = popup.querySelector(".popup__input_type_name");
let popupInputProfession = popup.querySelector(".popup__input_type_profession");
let profileFormWindow = popup.querySelector(".popup__form-window");

let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let profileEditButton = document.querySelector(".profile__edit-button");

function openPopup() {
  popup.classList.add("popup__is-opened");
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
}

function closePopup() {
  popup.classList.remove("popup__is-opened");
}

profileEditButton.addEventListener("click", openPopup);

popupCloseButton.addEventListener("click", closePopup);

profileFormWindow.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  closePopup();
});
