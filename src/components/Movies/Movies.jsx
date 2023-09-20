import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import { useSearchMovie } from "../../utils/hooks/useSearchMovie";
import {moviesApi} from "../../utils/MoviesApi";

function Movies() {

  const {
    searchedFilms,
    search,
    filter,
    loading,
    onSearch,
    onFilter,
  } = useSearchMovie(moviesApi.getMovies.bind(moviesApi));

  return (
    <main className="movies">
      <SearchForm isChecked={filter} handleCheckBox={onFilter} search={search} handleSearch={onSearch} />
      <MoviesCardList moviesList={searchedFilms} loading={loading} />
    </main>
  );
}

export default Movies;
