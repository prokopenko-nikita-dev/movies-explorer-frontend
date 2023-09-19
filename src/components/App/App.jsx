import { useEffect, useState } from "react";

import Header from "../Header";
import Main from "../Main";
import Movies from "../Movies";
import Footer from "../Footer";
import { Routes, Route } from "react-router-dom";
import { Login, Register } from "../Auth";

import api from "../../utils/api";
import auth from "../../utils/auth";

import SavedMovies from "../SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage";
import InfoToolTip from "../InfoToolTip";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", email: "" });


  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  const [infoToolTip, setInfoTooltip] = useState({
    message: "",
    isOpen: false,
    success: false,
  });

  useEffect(() => {
    api
      .getMovies()
      .then((movies) => {
        setMoviesList(movies);
        setFavoriteMovies(movies.slice(0, 3));
        setTimeout(() => setLoading(false), 2000);
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка в запросе фильмов! ${err}`,
          isOpen: true,
          success: false,
        });
      });
  }, []);

  function onClosePopup() {
    setInfoTooltip({ ...infoToolTip, isOpen: false });
  }

  function handleUpdateUser(body) {
    api
      .updateUser(body)
      .then((data) => {
        setUser({ ...user, ...data });
        setInfoTooltip({
          message: `Вы успешно изменили свои данные!`,
          isOpen: true,
          success: true,
        });
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка редактирования пользователя! ${err}`,
          isOpen: true,
          success: false,
        });
      });
  }

  function onLogin(body) {
    return auth
      .login(body)
      .then(({ token }) => {
        setIsAuth(true);
        setInfoTooltip({
          message: "Вы успешно вошли!",
          isOpen: true,
          success: true,
        });
        return true;
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка авторизации! ${err}`,
          isOpen: true,
          success: false,
        });
        return false;
      });
  }

  function onRegister(body) {
    return auth
      .registration(body)
      .then((data) => {
        setUser({ ...user, ...data });
        setInfoTooltip({
          message: "Вы успешно зарегистрировались!",
          isOpen: true,
          success: true,
        });
        return true;
      })
      .catch((err) => {
        setInfoTooltip({
          message: `Ошибка регистрации! ${err}`,
          isOpen: true,
          success: false,
        });
        return false;
      });
  }

  const Wrap = ({ children, header = true, footer = true }) => {
    return (
      <>
        {header && <Header isAuth={isAuth} />}
        <main>
          {children}
        </main>
        {footer && <Footer />}
      </>
    );
  };

  return (
    <div className="page">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Wrap>
              <Main />
            </Wrap>
          }
        />
        <Route
          path="/movies"
          element={
            <Wrap>
              <Movies moviesList={moviesList} loading={loading} />
            </Wrap>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <Wrap>
              <SavedMovies moviesList={favoriteMovies} />
            </Wrap>
          }
        />
        <Route
          path="/profile"
          element={
            <Wrap footer={false}>
              <Profile user={user} handleUpdateUser={handleUpdateUser} />
            </Wrap>
          }
        />
        <Route
          path="/signin"
          element={<main><Login onLogin={onLogin} success={infoToolTip.success} /></main>}
        />
        <Route
          path="/signup"
          element={<main><Register onRegister={onRegister} success={infoToolTip.success} /></main>}
        />
        <Route path="*" element={<main><NotFoundPage /></main>} />
      </Routes>
      <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip} />
    </div>
  );
}

export default App;