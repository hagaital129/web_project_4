export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._token
    })
    .then(res => this._checkResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, { 
      headers: this._token,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.info
      })
    }).then(res => this._checkResponse(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._token,
      body: JSON.stringify({
        avatar: data.link
      })
    }).then(res => this._checkResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._token
    })
    .then(res => this._checkResponse(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._token,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res));
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._token
    })
    .then(res => this._checkResponse(res));
  }

  toggleLike(cardId, addLike) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: addLike ? 'PUT' : 'DELETE',
      headers: this._token
    }).then(res => this._checkResponse(res));
  }
}
