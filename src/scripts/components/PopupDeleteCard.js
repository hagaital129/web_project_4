import Popup from "./Popup";

export default class PopupDeleteCard extends Popup {
  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
      this.close();
    });
    super.setEventListeners();
  }

  open = () => {
    super.open();
  };
}
