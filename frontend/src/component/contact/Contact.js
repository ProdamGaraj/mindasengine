import contactImg from "../../img/contact__img.png";
import "../contact/contact.scss";

export const Contact = (props) => {
  return (
    <div className="main__contact container flex justif-ss-betw align-cent">
      <div className="contact__list ">
        <div className="list__title">
          {props.language == "RU" ? (
            <p>Контакты</p>
          ) : props.language == "EN" ? (
            <p>Contacts</p>
          ) : props.language == "UZ" ? (
            <p>Kontaktlar</p>
          ) : (
            ""
          )}
        </div>

        <div className="list__item">
          <div className="item__numb">
            <p>+998971220211</p>
            <p>+998909336674</p>
          </div>
          <div className="item__mail">
            <p>Mindasengine@gmail.com</p>
          </div>
          <div className="item__adress">
            {props.language == "RU" ? (
              <p>Узбекистан г. Ташкент Хамида Олимжана, 4б</p>
            ) : props.language == "EN" ? (
              <p>Uzbekistan Tashkent Hamida Olimzhan, 4b</p>
            ) : props.language == "UZ" ? (
              <p>O'zbekiston Toshkent shahri Hamid Olimjon, 4B</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="contact__img">
        <img src={contactImg} alt="" />
      </div>
    </div>
  );
};
