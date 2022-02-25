export default class Card {
  constructor({ data, user, photoTemplate, handleCardClick, handleDeleteCard, handleLikeClick }) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._id = data._id;
    this._userId = user;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._element = photoTemplate.cloneNode(true);
  }

  createCard() {
    this._cardImage = this._element.querySelector(".photo-grid__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".photo-grid__text").textContent = this._name;
    this._setEventListeners();

    //show trash bin icon only to the owner
    if (this._userId !== this._ownerId) {
      this._element.querySelector(".photo-grid__delete-btn").style.display = "none";
    }

    this._renderLikes();

    return this._element;
  }

  _setEventListeners() {
    const cardBtn = this._element.querySelector(".photo-grid__card-button");

    cardBtn.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
    //photo popup
    this._element.querySelector(".photo-grid__image").addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
    //deleting cards
    this._element.querySelector(".photo-grid__delete-btn").addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
  }

  checkIfLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.checkIfLiked()) {
      this._element.querySelector(".photo-grid__card-button").classList.add("photo-grid__card-button_active");
    } else {
      this._element.querySelector(".photo-grid__card-button").classList.remove("photo-grid__card-button_active");
    }
    this._element.querySelector(".photo-grid__card-button-counter").textContent = this._likes.length;
  }
}
