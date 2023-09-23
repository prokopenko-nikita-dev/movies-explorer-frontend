import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import {useSearchMovie} from "../../utils/hooks/useSearchMovie";
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
    } = useSearchMovie(moviesApi.getMovies.bind(moviesApi) ,true);
    const mainApi = new MainApi(localStorage.getItem("jwt"));

    useEffect(() => {
        const localStorageFilmsSaved = localStorage.getItem("favourites");

        if (!localStorageFilmsSaved) {
            mainApi.getSaved().then((res) => {
                setFavorites(res);
                localStorage.setItem("favourites", JSON.stringify(res));
            });
        } else {
            setFavorites(JSON.parse(localStorageFilmsSaved));
        }

    }, []);

    return (
        <main className="movies">
            <SearchForm isChecked={filter} handleCheckBox={onFilter} search={search} handleSearch={onSearch}/>
            <MoviesCardList moviesList={searchedFilms} loading={loading} favorites={favorites}/>
        </main>
    );
}

export default Movies;
