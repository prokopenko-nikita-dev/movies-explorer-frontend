import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader";

function MoviesCardList({ moviesList, moviesRemain, loading , favorites, handleFavouriteChange, isFavouritesPage,handleClickMoreMovies }) {
  return (
    <div className="cards">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <section className="cards__list">
            {moviesList.map((movie) => (
              <MoviesCard isFavouritesPage={isFavouritesPage} favorites={favorites} handleFavouriteChange={handleFavouriteChange} movie={movie} key={movie.id || movie.movieId} isFavourite={favorites.find(el => el.movieId === movie.id || el.movieId === movie.movieId)} />
            ))}
          </section>

          {moviesRemain > 0 && !isFavouritesPage && (
            <button type="button" className="cards__button text link" onClick={handleClickMoreMovies}>
              Ещё
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MoviesCardList;
