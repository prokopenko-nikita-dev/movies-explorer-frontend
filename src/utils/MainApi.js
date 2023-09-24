import { AUTH_API_URL } from "./constants";

class MainApi  {
  constructor(key){
      this._jwt = key;
      this._baseUrl  = AUTH_API_URL;
  }

  _handleResponse(res) {
      return res.ok ? res.json() : Promise.reject("Ошибка - " + res.message);
    }

    updateUser({ name, email}, jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
        }),
      }).then(this._handleResponse);
    }

  async getSaved() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  async save(body) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(this._handleResponse);
  }

  async delete(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        'Content-Type': 'application/json',
      },
    }).then(this._handleResponse);
  }
}

export default MainApi;
