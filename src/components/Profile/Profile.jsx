import { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../context/CurrentUserContext";

function Profile({ onUpdate }) {
  const { handleLogout, info } = useCurrentUser();

  const [userInfo, setUserInfo] = useState({ name: info.name, email: info.email });
  const [isDataChanged, setIsDataChanged] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    setIsDataChanged(value !== info[name]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isDataChanged) {
      onUpdate(userInfo);
    }
  }

  return (
    <section className="profile">
      <h1 className="profile__title text_medium">Привет, {info.name}!</h1>
      <form action="submit" className="profile__form text">
        <label className="profile__label underline-profile">
          Имя:
          <input
            name="name"
            type="text"
            className="profile__input"
            value={userInfo.name}
            onChange={handleChange}
          />
        </label>
        <label className="profile__label">
          E-mail:
          <input
            name="email"
            type="text"
            className="profile__input"
            value={userInfo.email}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          className={`profile__submit link text ${isDataChanged ? "profile__submit_active" : "profile__submit_inactive"}`}
          onClick={handleSubmit}
          disabled={!isDataChanged}
        >
          Редактировать
        </button>
      </form>
      <Link to="/" className="profile__logout link text" onClick={handleLogout}>
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;

