import { MOVIES_API_URL, AUTH_API_URL } from "./constants";

class Api {
  constructor(moviesApi, authApi) {
    this._moviesApi = moviesApi;
    this._authApi = authApi;
    this._headers = {
      "Content-type": "application/json",
    };
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
