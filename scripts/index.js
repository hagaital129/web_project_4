const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    alt: "Forest with river in the middle",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    alt: "Lake between mountains",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    alt: "sunset",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    alt: "night with mountain view",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    alt: "lake with mountains",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    alt: "small port with boats",
  },
];

/*---TOGGLE-POPUP-BUTTON---*/
function openPopup(popupWindow) {
  popupWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", useEscBtn);
  popupWindow.removeEventListener("click", useMiceClick);

}

function useEscBtn(evt) {
  if (evt.keyCode === 27) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function useMiceClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_is-opened");
}

/*---EDIT-FORM---*/
const profileEditProfile = document.querySelector("#popup_type_edit-profile");
const profileFormWindow = profileEditProfile.querySelector(".popup__form-window");
const popupInputName = profileEditProfile.querySelector(".popup__input_type_name");
const popupInputProfession = profileEditProfile.querySelector(".popup__input_type_profession");
const popupEditCloseButton = profileEditProfile.querySelector(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

/*---ADD-CARD FORM---*/
const profileAddCard = document.querySelector("#popup_type_add-card");
const popupAddCardCloseButton = profileAddCard.querySelector(".popup__close");
const addCardForm = profileAddCard.querySelector("#add_form");
const inputTitle = profileAddCard.querySelector(".popup__input_type_card-name");
const inputImage = profileAddCard.querySelector(".popup__input_type_card-link");
const profileAddButton = document.querySelector(".profile__add-button");

const presentImage = document.querySelector("#popup_image-container");
const popupImage = presentImage.querySelector(".popup__image");
const presentImageCloseButton = presentImage.querySelector("#image_close_btn");
const popupImageInfo = presentImage.querySelector(".popup__image-info");

const cardTemplate = document.querySelector("#card-template").content.querySelector(".element");
const placesList = document.querySelector(".elements__pattern");

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

popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(profileAddCard);
});

profileAddButton.addEventListener("click", () => {
  addPopupWrapper();
  openPopup(profileAddCard);
});

function addPopupWrapper() {
  inputTitle.value = "";
  inputImage.value = "";
}

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = createCardElement({
    name: inputTitle.value,
    link: inputImage.value,
    alt: inputTitle.value,
  });
  placesList.prepend(newCard);
  closePopup(profileAddCard);
})

/*---TEMPLATE---*/
function createCardElement({ name, link, alt }) {
  const card = cardTemplate.cloneNode(true);
  const cardImageAlt = card.querySelector(".element__image");
  cardImageAlt.src = link;
  cardImageAlt.alt = alt;
  card.querySelector(".element__title").textContent = name;


  card.querySelector(".element__like-button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like-button_is-active")
  });


  card.querySelector(".element__delete_btn").addEventListener("click", (evt) => {
    const removeCard = card;
    removeCard.remove();
  });
  card.querySelector(".element__image").addEventListener("click", (evt) => {
    openPopup(presentImage);
    popupImage.src = card.querySelector(".element__image").src;
    popupImageInfo.textContent = card.querySelector(".element__info").textContent;
    popupImage.alt = card.querySelector(".element__image").alt;
  });

  return card;
}

initialCards.forEach((initialCardData) => {
  placesList.prepend(createCardElement(initialCardData));
});

presentImageCloseButton.addEventListener("click", () => closePopup(presentImage));