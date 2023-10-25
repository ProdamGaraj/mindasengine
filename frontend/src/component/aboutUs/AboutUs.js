import "../aboutUs/about.scss";
import aboutImg from "../../img/about__img.png";

export const AboutUs = (props) => {
  return (
    <div className="main__about wrapper">
      <div className="main__about container">
        <div className="text__wrapper">
          {props.language == "RU" ? (
            <>
              <h2 className="about__title">О нас</h2>
              <p className="about__text">
                Инновационное предприятие «Mind As Engine» (МАЕ),созданное
                специалистами в области информационных технологий с 35 летним
                стажем, осуществляет разработку и эксплуатацию информационных
                систем и ресурсов, обеспечивающих повышение эффективности работы
                крупных отраслевых холдингов и корпораций. Руководители и
                специалисты МАЕ принимали участие и управляли проектами в
                создании систем управления международных вертикально
                интегрированных компаний EVRAZ, Северсталь, Сбербанк, Qiwi, МТС,
                МЕЧЕЛ, ММК и т.д.
              </p>
            </>
          ) : (
            <>
              <h2 className="about__title">About us</h2>
              <p className="about__text">
                The innovative enterprise "Mind As Engine" (MAY), created by
                information technology specialists with 35 years of experience,
                develops and operates information systems and resources that
                improve the efficiency of large industry holdings and
                corporations. Managers and specialists of MAY participated and
                managed projects in the creation of management systems of
                international vertically integrated companies EVRAZ, Severstal,
                Sberbank, Qiwi, MTS, MECHEL, MMK, etc.
              </p>
            </>
          )}
        </div>
        <div>
          <img src={aboutImg} alt="" className="about__img" />
        </div>
      </div>
    </div>
  );
};
