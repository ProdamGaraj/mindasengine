import "../aboutUs/about.scss";
import aboutImg from "../../img/about__img.png";

export const AboutUs = () => {
  return (
    <div className="main__about wrapper">
      <div className="main__about container">
        <div className="text__wrapper">
          <h2 className="about__title">О нас</h2>
          <p className="about__text">
            Инновационное предприятие «Mind As Engine» (МАЕ),созданное
            специалистами в области информационных технологий с 35 летним
            стажем, осуществляет разработку и эксплуатацию информационных систем
            и ресурсов, обеспечивающих повышение эффективности работы крупных
            отраслевых холдингов и корпораций. Руководители и специалисты МАЕ
            принимали участие и управляли проектами в создании систем управления
            международных вертикально интегрированных компаний EVRAZ,
            Северсталь, Сбербанк, Qiwi, МТС, МЕЧЕЛ, ММК и т.д.
          </p>
        </div>
        <div>
          <img src={aboutImg} alt="" className="about__img"/>
        </div>
      </div>
    </div>
  );
};
