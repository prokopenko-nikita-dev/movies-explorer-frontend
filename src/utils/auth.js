import { AUTH_API_URL } from './constants';

class Auth {
  constructor(address) {
    this._address = address;
    this._headers = {
      'Content-type': 'application/json'
    };
  }

  _handleResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(response.status);
  };

  login({ email, password }) {
    return fetch(`${this._address}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    }).then(this._handleResponse);
  }

  registration({ name, email, password }) {
    return fetch(`${this._address}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    }).then(this._handleResponse);
  }

  authentication(jwt) {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {...this._headers,
        Authorization: `Bearer ${jwt}`
      }
    }).then(this._handleResponse);
  }

  logout() {
    return fetch(`${this._address}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._handleResponse);
  }
}

const auth = new Auth(AUTH_API_URL);

export default auth;
