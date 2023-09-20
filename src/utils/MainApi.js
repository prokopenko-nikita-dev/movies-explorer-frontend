import { AUTH_API_URL } from "./constants";

class MainApi  {
  constructor(jwt){
      this.url = AUTH_API_URL;
      this._headers = {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`
        };
  }

  _handleResponse(res) {
      return res.ok ? res.json() : Promise.reject("Ошибка - " + res.message);
    }
    
  async getSaved() {
    const url = this.url;
    const headers = this._headers;
      const res = await fetch(`${url}/movies`, {
        headers: headers,
      });
      return this._handleResponse(res);
  }

  async save(info) {
    const url = this.url;
    const headers = this._headers;
      const res = await fetch(`${url}/movies`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(info)
      });
      return this._handleResponse(res);
  }

  async delete(id) {
    const url = this.url;
    const headers = this._headers;
      const res = await fetch(`${url}/movies/${id}`, {
        method: "DELETE", 
        headers: headers,
      });
      return this._handleResponse(res);
  }
}

export default MainApi;
 