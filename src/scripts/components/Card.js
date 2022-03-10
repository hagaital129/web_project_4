export default class Card {
  constructor({ data, user, photoTemplate, handleCardClick, handleDeleteCard, likeClickHandler }) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._id = data._id;
    this._userId = user;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likeClickHandler = likeClickHandler;
    this._element = photoTemplate.cloneNode(true);
    this._likeBtn = this._element.querySelector(".photo-grid__card-button");
    this._likeBtnCounter = this._element.querySelector(".photo-grid__card-button-counter")
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
    this._likeBtnCounter.textContent = this._likes.length

    return this._element;
  }

  getCardId() {
    return this._cardId;
  }

  _handelLike() {
    this._likeBtn.classList.toggle('photo-grid__card-button_active')
  }

  _likeStatus(){
    const likes = Array.from(this.likes);
    likes.forEach((person) => {
      if(person._id === this._userId){
        this._likeBtn.classList.add("photo-grid__card-button_active");
      }
    })
  }

  checkIfLiked(user) {
    if(this._likes.find((like) => like._id === user)) {
      this._liked = true;
    }
    else{
      this._liked = false;
    }

    return this._liked;
  }

  _cardLiked() {
    this._element
      .querySelector('.photo-grid__card-button')
      .classList.add("photo-grid__card-button_active");
  }

  _cardUnliked() {
    this._element
      .querySelector('.photo-grid__card-button')
      .classList.remove("photo-grid__card-button_active");
  }

  refreshCard(data, userId) {
    this._likes = data.likes;
    if(this.checkIfLiked(userId)) {
      this._cardLiked();
    }
    else {
      this._cardUnliked();
    }
    this._element
      .querySelector('.photo-grid__card-button-counter')
      .textContent = this._likes.length;
  }

  _setEventListeners() {

    this._likeBtn.addEventListener("click", () => {
      this._likeClickHandler(this);
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

  removeCard() {
    this._element.remove();
    this._element = null;
  }

}
