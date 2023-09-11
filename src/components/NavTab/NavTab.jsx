const NavTab = ({ handleButtonClick }) => {
    return (
      <nav>
        <ul className="promo__list">
          <li
            id="aboutProject"
            className="promo__list-item color_stack text"
            onClick={handleButtonClick}
          >
            О проекте
          </li>
          <li
            id="techs"
            className="promo__list-item color_stack text"
            onClick={handleButtonClick}
          >
            Технологии
          </li>
          <li
            id="student"
            className="promo__list-item color_stack text"
            onClick={handleButtonClick}
          >
            Студент
          </li>
        </ul>
      </nav>
    );
  };
  
  export default NavTab;
