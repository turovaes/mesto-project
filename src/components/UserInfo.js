export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src,
    };
  }

    setUserInfo({ name, about, avatar }) {
        this._userName.textContent = name || this._userName.textContent;
        this._userInfo.textContent = about || this._userInfo.textContent;
        this._userAvatar.src = avatar || this._userAvatar.src;
    }
}
