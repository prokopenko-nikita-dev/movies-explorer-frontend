import { forwardRef } from "react";

const Techs = forwardRef((props, ref) => {
  return (
    <section className="techs color_background" id="techs" ref={ref}>
      <h2 className="techs__header text_subtitle">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__title text_title">7 технологий</h3>
        <p className="tech__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__list text">
        <li className="techs__list-item color_stack">HTML</li>
        <li className="techs__list-item color_stack">CSS</li>
        <li className="techs__list-item color_stack">JS</li>
        <li className="techs__list-item color_stack">React</li>
        <li className="techs__list-item color_stack">Git</li>
        <li className="techs__list-item color_stack">Express.js</li>
        <li className="techs__list-item color_stack">mongoDB</li>
      </ul>
    </section>
  );
});

export default Techs;
