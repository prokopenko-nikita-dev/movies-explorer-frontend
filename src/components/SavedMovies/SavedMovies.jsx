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
    setState,
    state,
  } = useSearchMovie(api.getSaved.bind(api));

    function handleFavouriteChange(event, data) {
      const newFavourites = [...state];

      if(event === "DELETE") {
          const index = newFavourites.findIndex((item) => item.movieId === data);
          newFavourites.splice(index, 1);
      }
      else {
          newFavourites.push(data)
      }

      setState(newFavourites);

  
      // mainApi.getSaved().then((res) => {
      //     setFavorites(res);
      //     // localStorage.setItem("favourites", JSON.stringify(res));
      // });
  }

  console.log(searchedFilms)
  return (
    <main className="movies">
        <SearchForm isChecked={filter} handleCheckBox={onFilter} search={search} handleSearch={onSearch} />
      <MoviesCardList isFavouritesPage={true} handleFavouriteChange={handleFavouriteChange} moviesList={searchedFilms} loading={loading} favorites={searchedFilms} />
    </main>
  );
}

export default SavedMovies;
