import { forwardRef } from "react";

const AboutProject = forwardRef((props, ref) => {
  return (
    <section className="project" id="aboutProject" ref={ref}>
      <h2 className="project__title text_subtitle underline-project">О проекте</h2>
      <ul className="project__about">
        <li className=".project__about-column">
          <h3 className="project__about-title text_subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__about-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </li>
        <li className=".project__about-column">
          <h3 className="project__about-title text_subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__about-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__duration">
        <div className="project__duration-area">
          <p className="project__duration-time text color_primary">1 неделя</p>
          <h3 className="project__duration-name text color_text">Back-end</h3>
        </div>
        <div className="project__duration-area">
          <p className="project__duration-time text color_secondary">4 недели</p>
          <h3 className="project__duration-name text color_text">Front-end</h3>
        </div>
      </div>
    </section>
  );
});

export default AboutProject;
