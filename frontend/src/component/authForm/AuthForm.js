import "../authForm/AuthForm.scss";
import axios from "axios";
import baseURL from "../../axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";

export const BasicForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const cookiesString = document.cookie;

  // Разделить строку на отдельные пары ключ-значение
  const cookiesArray = cookiesString.split(";");

  // Создать объект для хранения каждого cookie
  const cookiesObject = {};

  // Заполнить объект каждым cookie
  /* cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });*/

  console.log(document.cookie);
  const onSubmit = async (values, actions) => {
    axios
      .post(baseURL + "/api/auth/signin", values)
      .then((res) => {
        // Обработка успешного ответа
        console.log(res.data);
        setCookie("type", res.data.type, { path: "/" });
        setCookie("token", res.data.token, { path: "/" });
      })
      .catch((error) => {
        console.log(error);
        // Обработка ошибки
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="authForm">
      <div className="authForm__body">
        <div className="authForm__title">Вход</div>
        <div className="authForm__form">
          <input
            value={values.username}
            onChange={handleChange}
            id="username"
            type="text"
            placeholder="Логин"
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}

          <button disabled={isSubmitting} type="submit">
            Вход
          </button>
        </div>
        <div className="authForm__subtitle">
          Если у вас не получается войти в кабинет администратора, обратитесь за
          помощью туда-то и туда-то
        </div>
      </div>
    </form>
  );
};
