export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector) {
    this._userNameSelector = userNameSelector;
    this._userProfessionSelector = userProfessionSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      Profession: this._userProfessionSelector.textContent
    };
    return userInfo;
  }

  setUserInfo(userName, userProfession) {
    this._userNameSelector.textContent = userName;
    this._userProfessionSelector.textContent = userProfession;
  }
}