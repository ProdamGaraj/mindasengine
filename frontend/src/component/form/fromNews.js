import { Formik, Form, Field } from "formik";
import { basicSchema } from "../../component/form/schema.js";
import { useState } from "react";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useCookies } from "react-cookie";
import baseURL from "../../axios.js";
import { useFormik } from "formik";
import React, { Component } from 'react';

export const FormNews = () => {
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

        console.log(cookiesObject);

  const header = {
    Authorization:`${cookies.tokenType} ${cookies.accessToken}`
  }

  const formik = useFormik({
    initialValues: {
      namee: '123123',
      description: '132131',
      //email: '',
    },
    onSubmit: (values,) => {
      console.log(values);
       axios
        .post(`${baseURL}/moderator/upload/news`, values, header)
        .catch(er => console.log(er))
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};