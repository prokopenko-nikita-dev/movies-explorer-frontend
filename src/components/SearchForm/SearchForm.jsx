import FilterCheckbox from "./FilterCheckbox";
import { useState } from "react";

function SearchForm({isChecked, search, handleSearch, handleCheckBox}) {
  const [input, setInput] = useState(search);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(input);
  }

  function handleCheckBoxChenge(e) {
    handleCheckBox(!isChecked);
  }

  return (
    <section className="search ">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__movie">
        <input type="text" className="search__form-input" placeholder="Фильм" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="search__submit link" type="submit"></button>
        </div>
        <FilterCheckbox onChange={handleCheckBoxChenge} isChacked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;