import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import { useSearchMovie } from "../../utils/hooks/useSearchMovie";
import { useResize } from "../../utils/hooks/useResize";
import { moviesApi } from "../../utils/MoviesApi";
import { useEffect, useState } from "react";
import MainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [favorites, setFavorites] = useState([]);
  const {
    searchedFilms,
    search,
    filter,
    loading,
    onSearch,
    searchError,
    onFilter,
    nothingFound,
    error
  } = useSearchMovie(moviesApi.getMovies.bind(moviesApi), true);

  const config = {
    1600: {
      init: 12,
      step: 3,
    },
    1200: {
      init: 8,
      step: 2,
    },
    760: {
      init: 5,
      step: 2,
    },
  };

  const deviceWidth = useResize();

  function getInitMovies(deviceWidth) {
    if (deviceWidth <= 1200 && deviceWidth > 760) {
      return config[1200].init;
    }
    if (deviceWidth <= 760) {
      return config[760].init;
    }
    return config[1600].init;
  }

  function getStepMovies(deviceWidth) {
    if (deviceWidth <= 1200 && deviceWidth > 760) {
      return config[1200].step;
    }
    if (deviceWidth <= 760) {
      return config[760].step;
    }
    return config[1600].step;
  }

  const [moviesShowed, setMoviesShowed] = useState(() =>
    getInitMovies(deviceWidth)
  );

  useEffect(() => {
    setMoviesShowed( getInitMovies(deviceWidth));
  }, [searchedFilms])

  const mainApi = new MainApi(localStorage.getItem("jwt"));

  useEffect(() => {
    // const localStorageFilmsSaved = localStorage.getItem("favourites");
    mainApi.getSaved().then((res) => {
      setFavorites(res);
      localStorage.setItem("favourites", JSON.stringify(res));
    // });
    // if (!localStorageFilmsSaved) {
     
    // } else {
      // setFavorites(JSON.parse(localStorageFilmsSaved));
    // }
    });
  }, []);

  function handleFavouriteChange(event, data) {
    const newFavourites = [...favorites];

    if (event === "DELETE") {
      const index = newFavourites.findIndex((item) => item.movieId === data);
      newFavourites.splice(index, 1);
    } else {
      newFavourites.push(data);
    }

    setFavorites(newFavourites);

    // if(event !== "DELETE") {
    //   mainApi.save(data).then((res) => {
    //     console.log("Saved", res);
    //   }).catch((err) => {
    //     console.error("Error saving", err);
    //   });
    // } else {
    //   mainApi.delete(data).then((res) => {
    //     console.log("Deleted", res);
    //   }).catch((err) => {
    //     console.error("Error deleting", err);
    //   });
    // }
 
  }

  function handleClickMoreMovies() {
    setMoviesShowed(moviesShowed + getStepMovies(deviceWidth));
  }

  console.log(loading)
  return (
    <main className="movies">
      <SearchForm
        isChecked={filter}
        handleCheckBox={onFilter}
        search={search}
        handleSearch={onSearch}
      />
      {
        loading && <Preloader />
      }

      {
        !loading && error && <p>{error}</p> 
      }
      {
        !loading && !error && (
          nothingFound ? (
            <p>Ничего не найдено</p>
          ) : (
            <MoviesCardList
              moviesList={searchedFilms.slice(0, moviesShowed)}
              moviesRemain={searchedFilms.length - moviesShowed}
              loading={loading}
              favorites={favorites}
              handleFavouriteChange={handleFavouriteChange}
              handleClickMoreMovies={handleClickMoreMovies}
            />
          )
        )
      }
   
    </main>
  );
}

export default Movies;


