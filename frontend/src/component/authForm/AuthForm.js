import { Formik, Form, Field, useFormik } from "formik";
import "../authForm/AuthForm.scss";
import axios from "axios";
import baseURL from "../../axios";

const onSubmit = async (values, actions) => {
  axios.post(`${baseURL}/`, values)
  .then((res) => {
    //res.data
  })
  .catch((er) => {
    console.log(er);
  })

  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export const AuthForm = () => {
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
      password: "",
      login: "",
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
              id="login"
              type="text"
              placeholder="Логин"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.login && touched.login ? "input-error" : ""}
            />
            
            <input
              id="password"
              type="text"
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
