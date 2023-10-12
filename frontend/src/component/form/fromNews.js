import { Formik, Form, Field } from "formik";
import { basicSchema } from "../../component/form/schema.js";
import { useState } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useCookies } from "react-cookie";
import baseURL from "../../axios.js";

export const FormNews = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const header = {
    Authorization:`${cookies.tokenType} ${cookies.accessToken}`
  }

  return (
    <>
      <Formik
        initialValues={{
          picked: "",
          name: "",
          description: "",
          file: "",
          publication:'2023-12-12'
        }}
        onSubmit={async (values, actions) => {
            await axios
            .post(`${baseURL}/moderator/upload/news`, values, header)
            .then(actions.resetForm())
            .catch(er => console.log(er))

          if (values.picked == "project") {
            await axios
            .post(`${baseURL}/moderator/upload/project`, values, header)
            .then(actions.resetForm())
            .catch(er => console.log(er))
          }
        }}
        validationSchema={basicSchema}
      >
        {({ values, errors, touched }) => (
          <Form className="form__news">
            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="news__radio flex"
            >
              <label className={"project" === values.picked ? "active" : ""}>
                <Field
                  type="radio"
                  name="picked"
                  value="project"
                  style={{ display: "none" }}
                />
                проект
              </label>
              <label className={"news" === values.picked ? "active" : ""}>
                <Field
                  type="radio"
                  name="picked"
                  value="news"
                  style={{ display: "none" }}
                />
                новости
              </label>
            </div>
            <Field
              id="title"
              type="text"
              placeholder="Заголовок"
              value={values.title}
              className={errors.title && touched.title ? "input-error" : ""}
            />
            {errors.title && touched.title && (
              <p className="error">{errors.title}</p>
            )}
            <Field
              as="textarea"
              id="text"
              type="text"
              placeholder="Текст"
              value={values.text}
              className={errors.text && touched.text ? "input-error" : ""}
            />
            {errors.text && touched.text && (
              <p className="error">{errors.text}</p>
            )}
            <label className="input__file">
              <span className="flex align-cent">
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.4383 10.857L11.2483 20.047C10.1225 21.1728 8.59552 21.8053 7.00334 21.8053C5.41115 21.8053 3.88418 21.1728 2.75834 20.047C1.63249 18.9211 1 17.3941 1 15.802C1 14.2098 1.63249 12.6828 2.75834 11.557L11.9483 2.36696C12.6989 1.61639 13.7169 1.19473 14.7783 1.19473C15.8398 1.19473 16.8578 1.61639 17.6083 2.36696C18.3589 3.11752 18.7806 4.1355 18.7806 5.19696C18.7806 6.25841 18.3589 7.27639 17.6083 8.02696L8.40834 17.217C8.03306 17.5922 7.52406 17.8031 6.99334 17.8031C6.46261 17.8031 5.95362 17.5922 5.57834 17.217C5.20306 16.8417 4.99222 16.3327 4.99222 15.802C4.99222 15.2712 5.20306 14.7622 5.57834 14.387L14.0683 5.90696"
                    stroke="#515151"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Прикрепить медиафайлы
              </span>
              <input
                type="file"
                name="file"
                id="file"
                value={values.file}
                accept=".png, .jpg"
              />
            </label>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
