import { MOVIES_API_URL } from "./constants";

class MoviesApi  {
  constructor(){
      this.url = MOVIES_API_URL;
      this._headers = {
          "Content-type": "application/json",
        };
  }

  _handleResponse(res) {
      return res.ok ? res.json() : Promise.reject("Ошибка - " + res.message);
    }
    
  async getMovies() {
    console.log(this)
    const url = this.url;
    const headers = this._headers;
      const res = await fetch(`${url}/beatfilm-movies`, {
        headers: headers,
      });
      return this._handleResponse(res);
  }
}

export const moviesApi = new MoviesApi( )
 