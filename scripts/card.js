import { openForm } from './utils.js';

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector.querySelector('.element').cloneNode(true);
  }

  createCard() {
    const cardName = this._templateSelector.querySelector('.element__title');
    const cardImage = this.popupViewCard.querySelector('.element__image');
    cardName.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;

    this._setEventListeners();

    return this._templateSelector;
  }

  _setEventListeners() {
    const cardLike = this._templateSelector.querySelector('.element__like-button');
    const cardImage = this._templateSelector.querySelector('.element__image');
    const cardRemove = this._templateSelector.querySelector('.element__delete_btn');

    this._likeHandler(cardLike);

    this._popupHandler(cardImage);

    this._removeHandler(cardRemove);
  }

  _likeHandler(cardLike) {
    cardLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_is-active'));
  }

  _popupHandler(cardImage) {
    const popupViewCard = document.querySelector('.popup_image-container');
    const popupImage = popupViewCard.querySelector('.popup__image');
    const popupTitle = popupViewCard.querySelector('.popup__image-info');

    cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupTitle.textContent = this._name;
      openForm(popupViewCard);
    })
  }

  _removeHandler(cardRemove) {
    cardRemove.addEventListener('click', () => this._templateSelector.remove());
  }
}