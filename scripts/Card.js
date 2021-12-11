import { openForm } from './utils.js';


const popupViewCard = document.querySelector('.popup_image-container');
const popupImage = popupViewCard.querySelector('.popup__image');
const popupTitle = popupViewCard.querySelector('.popup__image-info');

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template.querySelector('.element').cloneNode(true);
  }

  createCard() {
    const cardName = this._template.querySelector('.element__title');
    const cardImage = this._template.querySelector('.element__image');
    cardName.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners();

    return this._template;
  }

  _setEventListeners() {
    const cardLike = this._template.querySelector('.element__like-button');
    const cardImage = this._template.querySelector('.element__image');
    const cardRemove = this._template.querySelector('.element__delete_btn');

    this._likeHandler(cardLike);

    this._popupHandler(cardImage);

    this._removeHandler(cardRemove);
  }

  _likeHandler(cardLike) {
    cardLike.addEventListener('click', (evt) => evt.target.classList.toggle('element__like-button_is-active'));
  }

  _popupHandler(cardImage) {
    cardImage.addEventListener('click', () => {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupTitle.textContent = this._name;
      openForm(popupViewCard);
    })
  }

  _removeHandler(cardRemove) {
    cardRemove.addEventListener('click', () => this._template.remove());
  }
}