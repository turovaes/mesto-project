export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this.id = "";
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserId() {
    return this.id;
  }

  getUserInfo() {
    return {
      id: this.id,
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src,
    };
  }

  setUserInfo({ _id, name, about, avatar }) {
    this.id = _id;
    this._userName.textContent = name || this._userName.textContent;
    this._userInfo.textContent = about || this._userInfo.textContent;
    this._userAvatar.src = avatar || this._userAvatar.src;
  }
}
