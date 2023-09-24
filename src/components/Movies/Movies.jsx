import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import {useSearchMovie} from "../../utils/hooks/useSearchMovie";
import { useResize } from "../../utils/hooks/useResize";
import {moviesApi} from "../../utils/MoviesApi";
import {useEffect, useState} from "react";
import MainApi from "../../utils/MainApi";

function Movies() {
    const [favorites, setFavorites] = useState([]);
    const {
        searchedFilms,
        search,
        filter,
        loading,
        onSearch,
        onFilter,
        nothingFound
    } = useSearchMovie(moviesApi.getMovies.bind(moviesApi) ,true);

    const config ={
        "1200": {
            init: 12,
            step: 3,
        },
        "768": {
            init: 8,
            step: 2,
        },
        "480": {
            init: 5,
            step: 2,
        },
    };

    const deviceWidth = useResize();

    function getInitMovies(deviceWidth) {
        if(deviceWidth <= 768) {
            return config[768].init;
        }
        if(deviceWidth <= 480) {
            return config[480].init;
        }
        return config[1200].init;
    }

    function getStepMovies(deviceWidth) {
        if(deviceWidth <= 768) {
            return config[768].step;
        }
        if(deviceWidth <= 480) {
            return config[480].step;
        }
        return config[1200].step;
    }

    const [moviesShowed, setMoviesShowed] = useState(() => getInitMovies(deviceWidth));

    const mainApi = new MainApi(localStorage.getItem("jwt"));

    useEffect(() => {
        // const localStorageFilmsSaved = localStorage.getItem("favourites");
        const localStorageFilmsSaved = null;

        if (!localStorageFilmsSaved) {
            mainApi.getSaved().then((res) => {
                setFavorites(res);
                // localStorage.setItem("favourites", JSON.stringify(res));
            });
        } else {
            setFavorites(JSON.parse(localStorageFilmsSaved));
        }

    }, []);

    function handleFavouriteChange(event, data) {
        const newFavourites = [...favorites];

        if(event === "DELETE") {
            const index = newFavourites.findIndex((item) => item.movieId === data);
            newFavourites.splice(index, 1);
        }
        else {
            newFavourites.push(data)
        }

        setFavorites(newFavourites);

     
        // mainApi.getSaved().then((res) => {
        //     setFavorites(res);
        //     // localStorage.setItem("favourites", JSON.stringify(res));
        // });
    }



    function handleClickMoreMovies() {
        setMoviesShowed(moviesShowed + getStepMovies(deviceWidth))
    }

    return (
        <main className="movies">
            <SearchForm isChecked={filter} handleCheckBox={onFilter} search={search} handleSearch={onSearch}/>
            <MoviesCardList 
                moviesList={searchedFilms.slice(0, moviesShowed)}
                moviesRemain={searchedFilms.length - moviesShowed}
                 loading={loading}
                 favorites={favorites}
                 handleFavouriteChange={handleFavouriteChange}
                 handleClickMoreMovies={handleClickMoreMovies}
                />
        </main>
    );
}

export default Movies;
