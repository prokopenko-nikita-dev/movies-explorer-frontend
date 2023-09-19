import { AUTH_API_URL } from "./constants";

class Auth {
  constructor(address) {
    this._address = address;
  }

  _handleResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Error: ${response.message}`);
  };

  login({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  registration({ name, email, password }) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    }).then(this._handleResponse);
  }

  authentication() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      credentials: "include",
    }).then(this._handleResponse);
  }

  logout() {
    return fetch(`${this._address}/logout`, {
      method: "GET",
      credentials: "include",
    }).then(this._handleResponse);
  }
}

const auth = new Auth( AUTH_API_URL );

export default auth;
