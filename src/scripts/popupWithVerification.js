import Popup from "./Popup.js";

export default class PopupWithVerification extends Popup {
  constructor(handleVerification, popupSelector, id, element) {
    super(popupSelector);
    this._submitButton = this._popupSelector.querySelector('.popup__submit');
    this._handleVerification = handleVerification;
    this._id = id;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', this._handleVerificationFunc);
  }

  renderingTime(isLoading, loadingText) {
    this._submitButton.loadingText = loadingText;
  }

  _handleVerificationFunc = () => {
    this._handleVerification(this._id, this._element);
  }

  setInfo(id, element) {
    this._id = id;
    this._element = element;
  }
} 