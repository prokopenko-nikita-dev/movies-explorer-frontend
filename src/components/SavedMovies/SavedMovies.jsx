import MoviesCardList from "../MoviesCardList";
import SearchForm from "../SearchForm";
import MainApi from "../../utils/MainApi";
import { useSearchMovie } from "../../utils/hooks/useSearchMovie";

function SavedMovies() {

  const api = new MainApi(localStorage.getItem("jwt"));
  const {
    searchedFilms,
    search,
    filter,
    loading,
    onSearch,
    onFilter,
  } = useSearchMovie(api.getSaved.bind(api));

  return (
    <main className="movies">
        <SearchForm isChecked={filter} handleCheckBox={onFilter} search={search} handleSearch={onSearch} />
      <MoviesCardList moviesList={searchedFilms} loading={loading} />
    </main>
  );
}

export default SavedMovies;
