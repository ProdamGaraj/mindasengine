import axios, { AxiosHeaders } from "axios";
import baseURL from "../../axios.js";
import { useState, useEffect } from "react";
import inpFile from "../../img/Vector.svg";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FormNews2 = () => {
  const cookiesString = document.cookie;
  let navigate = useNavigate();
  const cookiesArray = cookiesString.split(";"); // Разделить строку на отдельные пары ключ-значение
  const cookiesObject = {}; // Создать объект для хранения каждого cookie
  const [state, setState] = useState({
    name: "",
    description: "",
    files: [],
    selected: "news",
    date: null,
    loading: false,
  });
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });

  useEffect(() => {
    if (cookiesString == "") {
      navigate("/auth");
    }
  }, []);

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
    const { name, description, files, date } = state;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFiles", files[i]);
    }
    
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    formData.append("publication", formattedDate);
    console.log(formData);
    formData.forEach((value, name) => {
      console.log(name, value);
    });

    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await axios.post(
          baseURL + "/moderator/upload/" + state.selected,
          formData,
          {
            headers: {
              //"Content-Type": "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `${cookiesObject.tokenType} ${cookiesObject.accessToken}`,
            },
          }
        );
        setState({ ...state, projectList: response.data });
        setState({ ...state, loading: false });
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  };

  return (
    <>
      <div className="form__news">
      {state.loading ? (
        <div className="loading__wrapper">
          <div className="loading"></div>
        </div>
      ) : (
        <></>
      )}
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
        name="name"
        placeholder="Заголовок"
        onChange={handleInputChange}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Текст"
        onChange={handleInputChange2}
      />
      <label htmlFor="admin__uploadFile" className="input__file">
        <span className="flex align-cent">
          <img src={inpFile} /> Добавить медиафайлы
        </span>
        <input
          style={{ display: "none" }}
          type="file"
          name="multipartFiles"
          id="admin__uploadFile"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <DatePicker
        selected={state.date}
        onChange={(date) => setState({ ...state, date: date })}
        timeInputLabel="Time:"
        dateFormat="MM.dd.yyyy"
        placeholderText="__.__.____"
      />
      <button onClick={handleUpload} className="form__btn">
        Опубликовать
      </button>
    </div> 
    </>
  );
};
