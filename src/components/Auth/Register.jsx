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
    console.log(formData);
    onRegister(formData).then((isRedirect) => {
      isRedirect && navigate("/signin");
    });
  };

  return (
    <section className="auth">
      <Link to="/">
        <img className="auth__logo link" src={logo} alt="Логотип"/>
      </Link>
      <h1 className="auth__title">Добро пожаловать!</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input-container">
          <Input 
            name="name" 
            title="Имя" 
            onChange={handleChange} 
            error={error.name}
            placeholder="Ваше имя"
            required />
          <Input
            type="email"
            name="email"
            title="E-mail"
            onChange={handleChange}
            error={error.email}
            placeholder="Ваш email"
            minLength={6}
            maxLenght={30}
            required />
          <Input
            type="password"
            name="password"
            title="Пароль"
            onChange={handleChange}
            error={error.password}
            placeholder="Придумайте пароль"
            minLength={6}
            maxLenght={30}
            required />
        </div>
        <button type="submit" className="auth__submit-register text_submit link">Зарегистрироваться</button>
      </form>
      <div className="auth__link-container">
        <p className="color_text">Уже зарегестрированны?</p>
        <Link to="/signin" className="auth__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
