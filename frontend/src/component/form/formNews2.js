import axios from "axios";
import { useCookies } from "react-cookie";
import baseURL from "../../axios.js";
import { useState } from "react";
import inpFile from "../../img/Vector.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormNews2 = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    files: null,
    selected: "news",
    date: null,
  });

  const [cookies, setCookie, removeCookie] = useCookies();

  const cookiesString = document.cookie;

  // Разделить строку на отдельные пары ключ-значение
  const cookiesArray = cookiesString.split(";");

  // Создать объект для хранения каждого cookie
  const cookiesObject = {};

  // Заполнить объект каждым cookie
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });

  const header = {
    Authorization: `${cookiesObject.type} ${cookiesObject.token}`,
  };

  const handleChangeDate = (date) => {
    setState({ ...state, date: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleInputChange2 = (e) => {
    const { description, value } = e.target;
    setState({ ...state, description: value });
  };

  const handleFileChange = (e) => {
    setState({ ...state, files: e.target.files });
  };
  const handleUpload = () => {
    const { name, description, files } = state;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFiles", files[i]);
    }

    axios
      .post(baseURL + "/moderator/upload/project", formData, { headers: {
        'Content-Type': 'application/json',
        Authorization: `${cookiesObject.type} ${cookiesObject.token}`,
      },})
      .then((response) => {
        console.log(response.data);
        console.log(formData);
        // Handle the success response here
      })
      .catch((error) => {
        console.error(error);
        // Handle the error response here
      });
  };
  return (
    <div className="form__news">
      <div className="news__radio flex align-cent">
        <label className={state.selected == "news" ? "active" : ""}>
          <span>Новости</span>
          <input
            type="radio"
            name="selected"
            id=""
            value="news"
            onChange={handleInputChange}
          />
        </label>

        <label className={state.selected == "project" ? "active" : ""}>
          <span>Проекты</span>
          <input
            type="radio"
            name="selected"
            id=""
            value="project"
            onChange={handleInputChange}
          />
        </label>
      </div>
      <input
        type="text"
        name="namee"
        placeholder="Заголовок"
        onChange={handleInputChange}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Текст"
        onChange={handleInputChange2}
      />
      <label htmlFor="" className="input__file">
        <span className="flex align-cent">
          <img src={inpFile} /> Добавить медиафайлы
        </span>
        <input
          type="file"
          name="multipartFiles"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <DatePicker selected={state.date} onChange={handleChangeDate} />
      <button onClick={handleUpload} className="form__btn">
        Опубликовать
      </button>
    </div>
  );
};
