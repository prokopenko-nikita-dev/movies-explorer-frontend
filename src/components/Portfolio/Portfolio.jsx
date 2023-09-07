import arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title text color_text">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href="https://github.com/prokopenko-nikita-dev/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item underline-portfolio">
          <a
            className="portfolio__link link"
            href="https://prokopenko-nikita-dev.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link link"
            href="https://prokopenko-nikita-dev.github.io/mesto"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <img src={arrow} alt="Иконка - ссылочная стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
