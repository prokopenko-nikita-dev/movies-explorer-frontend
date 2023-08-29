function Promo({ children }) {
    return (
      <section className="promo color_background">
        <h1 className="promo__title text_title">
          Учебный&nbsp;проект&nbsp;студента факультета&nbsp;Веб-разработки.
        </h1>
        {children}
      </section>
    );
  }
  
  export default Promo;
  