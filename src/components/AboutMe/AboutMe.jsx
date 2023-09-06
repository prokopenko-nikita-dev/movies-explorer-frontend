import { forwardRef } from "react";
import foto from "../../images/profile.jpeg";

const AboutMe = forwardRef((props, ref) => {
  return (
    <section className="about" id="student" ref={ref}>
      <h2 className="about__header text_subtitle underline-about">Студент</h2>
      <div className="about__info">
        <div className="about__info-description">
          <h3 className="about__info-title text_title">Никита</h3>
          <p className="about__info-subtitle">Фронтенд-разработчик, 28 лет</p>
          <p className="about__info-description text">
          Я&nbsp;живу в&nbsp;Санкт-Петербурге. <br />
          На&nbsp;данный момент работаю барбером, параллельно занимаюсь разработкой.<br />
          Женат.<br />
          Увлекаюсь спортом и&nbsp;искусством. Нравится изучать новое. <br />
          Учусь в&nbsp;Яндекс.Практикуме на&nbsp;веб-разработчика.<br />
          </p>
          <ul className="about__links text">
            <li>
              <a href="https://github.com/prokopenko-nikita-dev" className="link" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <img className="about__info-image" src={foto} alt="Фотография студента" />
      </div>
    </section>
  );
});

export default AboutMe;