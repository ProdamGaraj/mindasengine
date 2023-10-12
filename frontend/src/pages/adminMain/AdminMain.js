import { Header3 } from "../../component/header3/Header3";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import edit from "../../img/edit.svg";
import { useNavigate } from "react-router";
import { Link, Route } from "react-router-dom";

import { AdminEdit } from "../admidEdit/AdminEdit";
import "../adminMain/adminMain.scss";
import plus from "../../img/plus.svg";
import search from "../../img/search.svg";

export const AdminMain = (props) => {
  const [state, setState] = useState({
    publList: [],
    limit: 3,
    show: "news",
    search: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/?_limit=${state.limit}`)
      .then((res) => {
        setState({ ...state, projectList: res.data });
      })
      .catch((er) => {
        console.log(er);
      });
  }, [state.limit]);

  const list = [
    {
      publicTitle: "BilimBank",
      publicSubtitle: "Разработка сайта",
      publicDisc:
        "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
    {
      publicTitle: "BilimBank",
      publicSubtitle: "Разработка сайта",
      publicDisc:
        "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
    {
      publicTitle: "Новость 1",
      publicSubtitle: "23 июня 2024",
      publicDisc:
        "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
  ];
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
            <label className={state.show == "news" ? "active" : ""}>
              <span>Новости</span>
              <input type="radio" name="show" id="" value="news" />
            </label>
            <label className={state.show == "project" ? "active" : ""}>
              <span>Проекты</span>
              <input type="radio" name="show" id="" value="projects" />
            </label>
          </div>
        </div>
        <Link to="add">
          <button className="adminMain__add flex align-cent">
            <img src={plus} alt="" />
            Новая публикация
          </button>
        </Link>
        <ul className="adminMain__list">
          {list.map((el, i) => (
            <li className="item">
              <div className="item__title flex justif-ss-betw">
                {el.publicTitle}
                <button className="item__edit">
                  <Link to="edit">
                    <img src={edit} alt="" />
                  </Link>
                </button>
              </div>
              <div className="item__subtitle">{el.publicSubtitle}</div>
              <div className="item__text">{el.publicDisc}</div>
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                className="item__swiper"
              >
                <SwiperSlide style={{ backgroundColor: "black" }}>
                  Slide 1
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "black" }}>
                  Slide 2
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "black" }}>
                  Slide 3
                </SwiperSlide>
                <SwiperSlide style={{ backgroundColor: "black" }}>
                  Slide 4
                </SwiperSlide>
              </Swiper>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
