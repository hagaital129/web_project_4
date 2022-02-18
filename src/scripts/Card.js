export default class Card {
  constructor(data, template, handleCardOnClick, userId, handleDeletePopup, handleLikeButton) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._ownerId = data.ownerId;
    this._cardId = data.cardId;
    this._userId = userId;
    this._template = template.querySelector('.element').cloneNode(true);
    this._templateNameElement = this._template.querySelector('.element__title');
    this._templateImageElement = this._template.querySelector('.element__image');
    this._templateCounterElement = this._template.querySelector('.element__like-button_counter');
    this._templateLikeButtonElement = this._template.querySelector('.element__like-button');
    this._templateRemoveButtonElement = this._template.querySelector('.element__delete_btn');
    this._activeLikeSelector = 'element__like-button_is-active';
    this._handleCardOnClick = handleCardOnClick;
    this._handleDeletePopup = handleDeletePopup;
    this._handleLikeButton = handleLikeButton;
  }

  createCard() {
    this._templateNameElement.textContent = this._name;
    this._templateImageElement.src = this._link;
    this._templateCounterElement.textContent = this._likes.length;
    this._setEventListeners();

    return this._template;

  }

  _setEventListeners() {
    this._likes.forEach(user => {
      if (this._userId === user._id) {
        this._templateLikeButtonElement.add(this._activeLikeSelector)
      }
    });

    this._templateLikeButtonElement.addEventListener('click', this._likeHandler);

    this._templateImageElement.addEventListener('click', this._handlePopup);

    // this._removeHandler(cardRemove);
    if (this._ownerId === this._userId) {
      this._templateRemoveButtonElement.addEventListener('click', this._removeHandler());
    }
    else {
      this._removeHandler();
    }
  }

  getId() {
    return this._cardId;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._templateCounterElement.textContent = likes.length;
  }

  toggleMarkupLike() {
    this._templateLikeButtonElement.classList.toggle(this._activeLikeSelector);
  }

  _likeHandler(evt) {
    const liked = this._templateLikeButtonElement.classList.contains(this._activeLikeSelector) ? false : true;
  
    this._handleLikeButton(this, liked);
  }

  _handlePopup = () => {
    this._handleCardOnClick(this._link, this._name);
  }

  _removeHandler() {
    this._handleDeletePopup(this._cardId, this._template);

  }
}