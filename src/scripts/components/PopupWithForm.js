import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, buttonText, loadingButtonText) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._submitBtn = this._popup.querySelector(".popup__save-button");
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._buttonText;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
