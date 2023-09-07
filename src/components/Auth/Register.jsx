import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import Input from "./Input";

function Register({ onRegister, success }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.validationMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData).then((isRedirect) => {
      isRedirect && navigate("/sign-in");
    });
  };

  return (
    <section className="auth">
      <img src={logo} alt="Логотип" className="auth__logo" />
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input 
            name="name" 
            title="Имя" 
            onChange={handleChange} 
            error={error.name}
            placeholder="Ваше имя"
            minLength="2"
            maxLength="30" />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={error.email}
            placeholder="Ваш email"
            minLength="6"
            required
          />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={error.password}
            placeholder="Придумайте пароль"
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="auth__submit text">Зарегистрироваться</button>
      </form>
      <div className="auth__link-container">
        <p className="text color_text">Уже зарегестрированны?</p>
        <Link to="/sign-in" className="auth__link text">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
