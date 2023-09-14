import FilterCheckbox from "./FilterCheckbox";

function SearchForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="search ">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__movie">
        <input type="text" className="search__form-input" placeholder="Фильм" required />
        <button className="search__submit link" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;