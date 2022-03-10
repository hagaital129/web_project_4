import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }
  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
close() {
  this._form.reset()
  super.close();
}
  // open = () => {
  //   super.open();
  // };
}
