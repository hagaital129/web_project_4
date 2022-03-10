import "../pages/index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupDeleteCard from "../scripts/components/PopupDeleteCard";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import Api from "../scripts/components/api";
import profilepicSrc from "../images/profilepic.gif";
import logoSrc from "../images/logo.svg";
import profilePicEditButtonSrc from "../images/button/edit_profile_img_button.svg";
import {
  profilePic,
  profilePicEditButton,
  profileImgform,
  photoTemplate,
  logoImage,
  profileForm,
  inputFullName,
  inputOccupation,
  editButton,
  addForm,
  addButton,
  editSaveBtn,
  addSaveBtn,
  profileImgSaveBtn,
  deleteConfirmBtn,
  formSettings
} from "../scripts/utils/constants";




const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "86dc75a4-9134-49a7-b63a-4b72140fc6f9",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    section.render(cardsData);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

profilePic.src = profilepicSrc;
profilePicEditButton.src = profilePicEditButtonSrc;
logoImage.src = logoSrc;

const popupPhoto = new PopupWithImage(".popup_photo");
popupPhoto.setEventListeners();
const deleteConfirmationPopup = new PopupDeleteCard(".popup_confirmation");
deleteConfirmationPopup.setEventListeners();

function generateCard(data) {
  const card = new Card({
    data: data,
    user: userId,
    photoTemplate: photoTemplate,
    handleCardClick: (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const link = target.src;
      const name = target.alt;
      popupPhoto.open(link, name);
      popupPhoto.setEventListeners();
    },
    handleDeleteCard: (cardId) => {
      deleteConfirmationPopup.open();
      deleteConfirmationPopup.setAction(() => {
        deleteConfirmBtn.textContent = "Deleting...";
        api
          .deleteCard(cardId)
          .then(() => {
            card.removeCard();
            deleteConfirmationPopup.close();
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
          .finally(() => {
            deleteConfirmBtn.textContent = "Yes";
          });
      });
    },
    likeClickHandler: (card) => {
      if (card.checkIfLiked(userId)) {
        api
          .dislikeCard(card.getCardId())
          .then((data) => {
            card.refreshCard(data, userId);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
      }
      else {
        api
          .likeCard(card.getCardId())
          .then((data) => {
            card.refreshCard(data, userId);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
      }
    }
    // handleLikeClick: (cardId) => {
    //   const isLiked = card.isLiked();

    //   if (isLiked) {
    //     api
    //       .dislikeCard(cardId)
    //       .then((res) => {
    //         card.setLikes(res.likes);
    //       })
    //       .catch((err) => {
    //         console.log(`Error: ${err}`);
    //       });
    //   } else {
    //     api
    //       .likeCard(cardId)
    //       .then((res) => {
    //         card.setLikes(res.likes);
    //       })
    //       .catch((err) => {
    //         console.log(`Error: ${err}`);
    //       });
    //   }
    // }
  });
  const photogrid = card.createCard();
  return photogrid;
}

const section = new Section((data) => {
  section.addItem(generateCard(data));
}, ".photo-grid__grid");

const popupAdd = new PopupWithForm(
  ".popup_add",
  (data) => {
    popupAdd.showLoading();
    api
      .createCard(data.title, data.imglink)
      .then((res) => {
        const card = generateCard(res);
        section.addItem(card);
        popupAdd.close();
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        popupAdd.hideLoading();
      });
  },
  addSaveBtn.textContent,
  "Creating..."
);

popupAdd.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileJobSelector: ".profile__occupation",
  profileImgSelector: ".profile__image",
});

const popupEdit = new PopupWithForm(
  ".popup_edit",
  (data) => {
    popupEdit.showLoading();
    api
      .editProfileInfo(data.name, data.occupation)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEdit.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })

      .finally(() => {
        popupEdit.hideLoading();
      });
  },
  editSaveBtn.textContent,
  "Saving..."
);

popupEdit.setEventListeners();



const formValidators = {};

const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.formSelector));
  formsList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formType = formElement.getAttribute("name");
    formValidators[formType] = validator;
    validator.enableValidation();
  });
};
enableValidation(formSettings);

editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  popupEdit.open();
  inputFullName.value = data.name;
  inputOccupation.value = data.job;
  formValidators[profileForm.getAttribute("name")].resetValidation();
});

addButton.addEventListener("click", () => {
  popupAdd.open();
  formValidators[addForm.getAttribute("name")].resetValidation();
});

profilePicEditButton.addEventListener("click", () => {
  popupProfileImg.open();
  formValidators[profileImgform.getAttribute("name")].resetValidation();
});



const popupProfileImg = new PopupWithForm(
  ".popup_profile-img",
  (data) => {
    popupProfileImg.showLoading();

    api
      .editProfileImg(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileImg.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })

      .finally(() => {
        popupProfileImg.hideLoading();
      });
  },
  profileImgSaveBtn.textContent,
  "Saving..."
);
popupProfileImg.setEventListeners();
