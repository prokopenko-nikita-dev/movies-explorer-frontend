import { useLocation } from "react-router-dom";
import { MOVIES_API_URL } from "../../utils/constants";
import MainApi from "../../utils/MainApi";

function MoviesCard({ movie, isFavourite, handleFavouriteChange, favorites, isFavouritesPage }) {
  const location = useLocation();
  const path = location.pathname;
  const isSavedMovies = path === "/saved-movies";

  const imageUrl = !isSavedMovies ? MOVIES_API_URL + movie?.image?.formats?.thumbnail?.url : movie.thumbnail;
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;
  const api = new MainApi(localStorage.getItem("jwt"));

  function handleClickFavorite(e) {
  console.log(movie)
    const film = movie;
      const data = {
          image: MOVIES_API_URL + film.image.url,
          trailerLink: film.trailerLink,
          thumbnail: MOVIES_API_URL  + film.image.url,
          movieId: film.id,
          country: film.country || "Неизвестно",
          director: film.director,
          duration: film.duration,
          year: film.year,
          description: film.description,
          nameRU: film.nameRU,
          nameEN: film.nameEN,
      };
      console.log(data)
    api.save(data).then((data) => {
      console.log(data);
      handleFavouriteChange("ADD", data);
    })
  }

  function handleRemoveFavourite() {
    console.log(favorites, movie);
    console.log(movie._id || favorites.find(el => el.movieId === movie.id)._id);
    api.delete(movie._id || favorites.find(el => el.movieId === movie.id)._id).then((data) => {
      console.log(data);
      handleFavouriteChange("DELETE", movie.movieId);
    })
  }

  function handleLikeClick() {
      if(isFavourite) {
          handleRemoveFavourite();
      }else{
          handleClickFavorite();
      }
  }

    function handleImageClick() {
        window.open(movie.trailerLink, "_blank");
    }

    const className = `card__favorite color_secondary link ${isFavourite && (isFavouritesPage ? "card__favorite_delete" : "card__favorite_active")}`;

    // isFavouritesPage
    return (
    <article className="card">
      <div className="card__container">
      <button

          type="button"
          className={className}
          onClick={handleLikeClick}
        />
      <img className="card__image" src={imageUrl} alt={movie.nameRU} onClick={handleImageClick} />
      </div>
      <div className="card__footer">
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration text color_text color_background">{`${hours}ч ${minutes}м`}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
