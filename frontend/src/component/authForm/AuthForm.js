import "../authForm/AuthForm.scss";
import axios from "axios";
import baseURL from "../../axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
import { useNavigate } from "react-router";

export const BasicForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  let navigate = useNavigate();

  useEffect(() => {
    const cookiesBlock = document.cookie.split(";");
    const cookies2 = document.cookie;
    cookiesBlock.forEach((cookie) => {
      const [name, value] = cookie.split("=");

    });

    if (cookiesBlock.includes('tokenType') && cookiesBlock.includes('accessToken')) {
      navigate('/adminmain')
    }

  }, []);

  const onSubmit = async (values, actions) => {
    console.log(values);
    axios
      .post(baseURL + "/api/auth/signin", values)
      .then((res) => {
        // Обработка успешного ответа
        console.log(res.data);
        setCookie("tokenType", res.data.type, { path: "/" });
        setCookie("accessToken", res.data.token, { path: "/" });
        navigate('/adminmain')
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
