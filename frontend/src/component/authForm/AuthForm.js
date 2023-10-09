import { Formik, Form, Field, useFormik } from "formik";
import "../authForm/AuthForm.scss";
import axios from "axios";
import baseURL from '../../axios';

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export const AuthForm = () => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);


  const onSubmit = async (values, actions) => {
    axios.post(`https://s14nv2bq-1337.euw.devtunnels.ms/api/auth/signin`, values)
    .then((res) => {
      setCookie("tokenType", res.data.tokenType, { path: '/' });
      setCookie("accessToken", res.data.accessToken, { path: '/' });

      if (res.status == 200) {
        return navigate('/adminmain')
      }
    })
    .catch((er) => {
      console.log(er);
    })

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
    <>
      <div className="authForm container">
        <div className="authForm__body">
          <div className="authForm__title">
            <p>Вход</p>
          </div>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="authForm__form"
          >
            <input
              id="username"
              type="text"
              placeholder="Логин"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.username && touched.username ? "input-error" : ""}
            />
            
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "input-error" : ""}
            />
            <button disabled={isSubmitting} type="submit">
              Войти
            </button>
          </form>
          <div className="authForm__subtitle">
            <p>
              Если у вас не получается войти в кабинет администратора,
              обратитесь за помощью туда-то и туда-то
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
