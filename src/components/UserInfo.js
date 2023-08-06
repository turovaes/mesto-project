export class UserInfo {
    constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent,
            userAvatar: this._userAvatar.src,
        };
    }

    setUserInfo({ userName, userInfo, userAvatar }) {
        this._userName.textContent = userName ?? this._userName.textContent;
        this._userInfo.textContent = userInfo ?? this._userInfo.textContent;
        this._userAvatar.src = userAvatar ?? this._userAvatar.src;
    }
}
