const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

/*---TOGGLE-POPUP-BUTTON---*/
function openPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_is-opened");
}

/*---EDIT-FORM---*/
let profileEditProfile = document.querySelector("#popup_type_edit-profile");
let profileFormWindow = profileEditProfile.querySelector(".popup__form-window");
let popupInputName = profileEditProfile.querySelector(".popup__input_type_name");
let popupInputProfession = profileEditProfile.querySelector(".popup__input_type_profession");
let popupEditCloseButton = profileEditProfile.querySelector(".popup__close");
let profileEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

popupEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditProfile)
);
profileEditButton.addEventListener("click", () => {
  editProfileInfo();
  openPopup(profileEditProfile);
});

function editProfileInfo() {
  popupInputName.value = profileName.textContent;
  popupInputProfession.value = profileProfession.textContent;
}

profileFormWindow.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileProfession.textContent = popupInputProfession.value;
  closePopup(profileEditProfile);
});

/*---ADD-CARD FORM---*/
let profileAddCard = document.querySelector("#popup_type_add-card");
let popupAddCardCloseButton = profileAddCard.querySelector(".popup__close");
let addCardForm = profileAddCard.querySelector("#add_form");
let inputTitle = profileAddCard.querySelector("popup__input_type_card-name");
let inputImage = profileAddCard.querySelector("popup__input_type_card-link");
let profileAddButton = document.querySelector(".profile__add-button");

popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(profileAddCard);
});

profileAddButton.addEventListener("click", () => {
  addPopupWrapper();
  openPopup(profileAddCard);
});

function addPopupWrapper() {
  inputTitle = "";
  inputImage = "";
}

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCardElement({
    name: inputTitle.value,
    link: inputImage
  });
  placesList.prepend(newCard);
  closePopup(profileAddCard);
})


/*---TEMPLATE---*/
const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");
const placesList = document.querySelector(".elements__pattern");

function createCardElement(cardData) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".element__title").textContent = cardData.name;
  card.querySelector(".element__image").src = cardData.link;
  card.querySelector(".element__like-button").addEventListener("click", (event) => {
    card.querySelector(".element__like-button").classList.toggle("element__like-button_not-active");
    card.querySelector(".element__like-button").classList.toggle("element__like-button_is-active");
  });
  card.querySelector(".element__delete_btn").addEventListener("click", (evt) => {
    const removeCard = card;
    removeCard.remove();
  });
  card.querySelector(".element__image").addEventListener("click", (evt) => {
    openPopup(presentImage);
    popupImage.src = card.querySelector(".element__image").src;
    popupImageInfo.textContent = card.querySelector(".element__info").textContent;
  })

  return card;
}

initialCards.forEach((initialCardData) => {
  placesList.prepend(createCardElement(initialCardData));
});

const presentImage = document.querySelector("#popup_image-container");
const popupImage = presentImage.querySelector(".popup__image");
const presentImageCloseButton = presentImage.querySelector("#image_close_btn");
const popupImageInfo = presentImage.querySelector(".popup__image-info");

presentImageCloseButton.addEventListener("click", () => closePopup(presentImage));