import "../authForm/AuthForm.scss";
import axios from "axios";
import baseURL from "../../axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const AuthForm = () => {
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const [cookies, setCookie, removeCookie] = useCookies();

  const handleInputChange = (e) => {
    const { login, value } = e.target;
    setState({ ...state, login: value });
  };
  const handleInputChange2 = (e) => {
    const { password, value } = e.target;
    setState({ ...state, password: value });
  };

  const handleUpload = () => {
    const { login, password } = state;
    const formData = new FormData();

    formData.append("login", login);
    formData.append("password", password);

    axios
      .post(baseURL + "/api/auth/signin", formData)
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
    <div className="authForm">
      <div className="authForm__body">
        <div className="authForm__title">Вход</div>
        <div className="authForm__form">
          <input
            type="text"
            name="login"
            placeholder="Логин"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="password"
            placeholder="Пароль"
            onChange={handleInputChange2}
          />
        </div>
        <button onClick={handleUpload}>Войти</button>
        <div className="authForm__subtitle">
          Если у вас не получается войти в кабинет администратора, обратитесь за
          помощью туда-то и туда-то
        </div>
      </div>
    </div>
  );
};
