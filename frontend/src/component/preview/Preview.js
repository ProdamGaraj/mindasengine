import previewImg from "../../img/preview__img.png";
import "../preview/preview.scss";

export const Preview = () => {
    return(
        <div className="main__preview container">
        <h2 className="preview__title">Mind As Engine (MAE)</h2>
        <div className="preview__text">
          <p>
            В Республике Узбекистан МАЕ реализует проекты в следующих областях,
            системы корпоративного обучения BilimBank, разрабатывает цифровые
            технологические решения для Uzmetall, Института ядерной физики
            Академии наук Узбекистана, разрабатывает системы обучения и
            управления сельскохозяйственными дронами проекта HUMOUN,
            консультирует международные компании в части трансфера технологий и
            цифровизации.
          </p>
        </div>
        <img className="prewiev__img" src={previewImg} alt="" />
      </div>
    )
}