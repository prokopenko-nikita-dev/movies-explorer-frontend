import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "./Input";

function Login({ onLogin, success }) {
  const [error, setError] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData).then((isRedirect) => {
      isRedirect && navigate("/movies");
    });
  };

  return (
    <section className="auth">
      <Link to="/">
        <img className="auth__logo link" src={logo} alt="Логотип" href="/"/>
      </Link>
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={error.email}
            placeholder="Ваш email"
            value
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={error.password}
            placeholder="Введите пароль"
            minLength={6}
            maxLenght={30}
            value
          />
        </div>
        <button type="submit" className="auth__submit-login text_submit link">Войти</button>
        <div className="auth__link-container">
          <p className="color_text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__link">
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
