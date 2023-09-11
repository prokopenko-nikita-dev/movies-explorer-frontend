import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import React, { useRef } from "react";

function Header({ isAuth }) {
  const menuRef = useRef();
  const location = useLocation();
  const path = location.pathname;

  const handleOpenMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "flex";
  };

  const handleCloseMenu = () => {
    const menu = menuRef.current;
    menu.style.display = "";
  };

  return (
    <header className="header">
      {isAuth ? (
        <nav className="header__navigate header__navigate-movies">
          <ul className="header__movies text" ref={menuRef}>
            <li>
            <Link to="/">
            <img className="link" src={logo} alt="Логотип" href="/"/>
            </Link>
            </li>
{/*          <li className={`header__movies-item ${path === "/" && "header__movies-item_selected"}`}>
            <Link to="/" className="link" onClick={handleCloseMenu}>
              Главная
            </Link>
      </li> */}
            <li className="header__block">
            <div className={`header__movies-item ${path === "/movies" && "header__movies-item_selected"}`}>
              <Link to="/movies" className="link" onClick={handleCloseMenu}>
                Фильмы
              </Link>
            </div>
            <div className={`header__movies-item ${path === "/saved-movies" && "header__movies-item_selected"}`}>
              <Link to="/saved-movies" className="link" onClick={handleCloseMenu}>
                Сохранённые фильмы
              </Link>
            </div>
            </li>
            <li className="header__movies-item header__profile">
              <Link to="/profile" className="header__link-profile color_secondary link" onClick={handleCloseMenu}>
                Аккаунт
              </Link>
            </li>
            <li className="header__burger-open">
              <button type="button" className="header__burger link" onClick={handleOpenMenu}>
                <div className="header__burger-line"></div>
                <div className="header__burger-line"></div>
                 <div className="header__burger-line"></div>
              </button>
            </li>
          </ul>
        </nav>

      ) : (
        <div className="header__navigate-auth">
           <Link to="/">
            <img className="link" src={logo} alt="Логотип" href="/"/>
            </Link>
        <nav className="header__navigate">
          <ul className="header__auth text">
            <li className="header__auth-item link">
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            </li>
            <li className="header__auth-item color_primary link">
              <Link to="/signin" className="header__link">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
        </div>
      )}

      <div className="burger">
      <ul className="burger__movies" ref={menuRef}>
            <li className="burger__button-close">
            <button type="button" className="burger__close link" onClick={handleCloseMenu}></button>
            </li>
            <li className={`burger__movies-item ${path === "/" && "burger__movies-item_selected"}`}>
              <Link to="/" className="link-burger" onClick={handleCloseMenu}>
                Главная
              </Link>
            </li> 
            <li className={`burger__movies-item ${path === "/movies" && "burger__movies-item_selected"}`}>
              <Link to="/movies" className="link-burger" onClick={handleCloseMenu}>
                Фильмы
              </Link>
            </li>
            <li className={`burger__movies-item ${path === "/saved-movies" && "burger__movies-item_selected"}`}>
              <Link to="/saved-movies" className="link-burger" onClick={handleCloseMenu}>
                Сохранённые фильмы
              </Link>
            </li>
            <li className="burger__movies-item">
              <Link to="/profile" className="burger__link-profile color_secondary link-burger" onClick={handleCloseMenu}>
                Аккаунт
              </Link>
            </li>
            </ul>
      </div>
    </header>
  );
}

export default Header;