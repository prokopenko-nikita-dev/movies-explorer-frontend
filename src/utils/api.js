import { MOVIES_API_URL, AUTH_API_URL } from "./constants";

class Api {
  constructor(moviesApi, authApi) {
    this._moviesApi = moviesApi;
    this._authApi = authApi;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  _handleResponse(response) {
    return response.ok ? response.json() : Promise.reject("Ошибка - " + response.message);
  }

  async getMovies() {
    const response = await fetch(`${this._moviesApi}/beatfilm-movies`, {
      headers: this._headers,
    });
    return this._handleResponse(response);
  }

  async updateUser({ name, email }) {
    const response = await  fetch(`${this._authApi}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    });
    return this._handleResponse(response);
  }
}

const api = new Api( MOVIES_API_URL, AUTH_API_URL );

export default api;
