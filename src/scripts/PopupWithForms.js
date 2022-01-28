import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor(submissionHandler, popupSelector) {
    super(popupSelector);
    this._submissionHandler = submissionHandler;
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._form = this._popupSelector.querySelector('.popup__form-window');
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._submissionHandlerFunc);
  }

  _submissionHandlerFunc = (evt) => {
    evt.preventDefault();
    this._submissionHandler(this._getInputValues());
  }

  _getInputValues() {
    const formValue = {};
    this._inputList.forEach(input => formValue[input.name] = input.value);
    return formValue;
  }
}