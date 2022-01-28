export default class Card {
  constructor(data, template, handleCard) {
    this._name = data.name;
    this._link = data.link;
    this._template = template.querySelector('.element').cloneNode(true);
    this._handleCard = handleCard;
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
    cardLike.addEventListener('click', this._likeHandler);
    
    cardImage.addEventListener('click', this._handlePopup);

    this._removeHandler(cardRemove);
  }

  _likeHandler(evt) {
    evt.target.classList.toggle('element__like-button_is-active');
  }

  _handlePopup = () => {
    this._handleCard(
      this._link,
      this._name);
  }

  _removeHandler(cardRemove) {
    cardRemove.addEventListener('click', () => this._template.remove());
  }
}