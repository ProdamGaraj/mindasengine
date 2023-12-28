import { Header3 } from "../../component/header3/Header3";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import edit from "../../img/edit.svg";
import { Router, Routes, useNavigate } from "react-router";
import { Link, Route } from "react-router-dom";

import { AdminEdit } from "../admidEdit/AdminEdit";
import "../adminMain/adminMain.scss";
import plus from "../../img/plus.svg";
import search from "../../img/search.svg";
import baseURL from "../../axios";

import { ItemNews } from "./ItemNews";
import { ItemProject } from "./ItemProject";
import { useLocation } from 'react-router-dom';

 const AdminMain = (props) => {
  const [state, setState] = useState({
    publList: [],
    pubListProject: [],
    limit: 3,
    show: "news",
    search: "",
    publListCon: [],
    loading: false,
  });
  let navigate = useNavigate();
  const location = useLocation();
  const cookiesString = document.cookie;
  const cookiesArray = cookiesString.split(";"); // Разделить строку на отдельные пары ключ-значение
  const cookiesObject = {}; // Создать объект для хранения каждого cookie

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });

  useEffect(() => {
    if (cookiesString == "") {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const res = await axios.get(baseURL + `/moderator/get/` + state.show, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookiesObject.tokenType} ${cookiesObject.accessToken}`,
          },
        });
        setState({ ...state, loading: false });
        setState({ ...state, publList: res.data });
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  }, [state.show]);

  function radioHandler(e) {
    setState({ ...state, show: e.target.value });
  }

  return (
    <>
      <Header3 />
      <main className="adminMainPage container container-admin">
        <div className="adminMain__filter flex justif-ss-betw align-cent">
          <label htmlFor="" className="search__label flex align-cent">
            <img
              src={search}
              alt=""
              style={{ maxHeight: "24px", maxWidth: "24px" }}
            />
            <input
              type="text"
              className="input__search"
              name=""
              id=""
              placeholder="Поиск"
            />
          </label>
          <div className="filter__radio">
            <Link to="">
              <label
                className={location.pathname == "/adminmain" ? "active" : ""}
                onChange={radioHandler}
              >
                <span>Новости</span>
                <input type="radio" name="show" id="" value="news" />
              </label>
            </Link>
            <Link to="project">
              <label
                className={location.pathname == "/adminmain/project" ? "active" : ""}
                onChange={radioHandler}
              >
                <span>Проекты</span>
                <input type="radio" name="show" id="" value="projects" />
              </label>
            </Link>
          </div>
        </div>

        <Link to="add">
          <button className="adminMain__add flex align-cent">
            <img src={plus} alt="" />
            Новая публикация
          </button>
        </Link>

        <Routes>
          <Route path="/" element={<ItemNews state={state} />} />
          <Route path="project" element={<ItemProject state={state} />} />
        </Routes>
      </main>
    </>
  );
};
export default AdminMain;