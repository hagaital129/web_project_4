export default class UserInfo {
  constructor(userNameSelector, userProfessionSelector, userAvatarSelector, userId) {
    this._userNameSelector = userNameSelector;
    this._userProfessionSelector = userProfessionSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userId = userId;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameSelector.textContent,
      Profession: this._userProfessionSelector.textContent,
      avatar: this._userAvatarSelector,
      id: this._userId
    };
    return userInfo;
  }

  setUserInfo(userName, userProfession, userAvatar, userId) {
    this._userNameSelector.textContent = userName;
    this._userProfessionSelector.textContent = userProfession;
    this._userAvatarSelector.src = userAvatar;
    this._userAvatarSelector.alt = userName;
    this._userId = userId;
  }
}