import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupPhotoCaption = this._popup.querySelector(".popup__image-caption");
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = link;
    this._popupPhotoCaption.textContent = name;
    super.open();
  }
}
