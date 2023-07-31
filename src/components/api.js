import { checkResponse } from './utils';

export class Api {
  constructor(config) {
    this.config = config;
  }

  getInitialCards() {
    return fetch(`${this.config.baseUrl}/cards`, {
      headers: this.config.headers
    })
      .then(checkResponse);
  }

  getProfile() {
    return fetch(`${this.config.baseUrl}/users/me`, {
      headers: this.config.headers
    })
      .then(checkResponse);
  }

  updateProfile(name, about) {
    return fetch(`${this.config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({ name, about })
    })
      .then(checkResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this.config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({ avatar })
    })
      .then(checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.config.baseUrl}/cards`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({ name, link })
    })
      .then(checkResponse);
  }

  deleteCardById(cardId) {
    return fetch(`${this.config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.config.headers,
    })
      .then(checkResponse);
  }

  addLikeToCard(cardId) {
    return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.config.headers,
    })
      .then(checkResponse);
  }

  deleteLikeFromCard(cardId) {
    return fetch(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.config.headers,
    })
      .then(checkResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'b5831fed-c13a-4640-8fbe-56ca9bc6237e',
    'Content-Type': 'application/json'
  }
}); 

