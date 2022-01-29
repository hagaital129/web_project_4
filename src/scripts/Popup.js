export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__close');
  }

  setEventListeners() {
    document.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", this._handleButtonClose);
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    document.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.removeEventListener("click", this._handleButtonClose);
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleButtonClose = () => {
    this.close();
  }
}