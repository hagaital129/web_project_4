export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileImgSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._profileImg = document.querySelector(profileImgSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileImg.style.backgroundImage = `url("${avatar}")`;
  }
}
