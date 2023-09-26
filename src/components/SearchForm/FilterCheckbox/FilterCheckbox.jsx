function FilterCheckbox({isChacked, onChange}) {

  return (
    <div className="filter">
        <input type="checkbox" className="filter__input link" onChange={onChange} checked={isChacked}/>
        <label className="filter__label text">Короткометражки</label>
    </div>
  );
}

export default FilterCheckbox;
  