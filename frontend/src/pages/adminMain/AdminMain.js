import { Header3 } from "../../component/header3/Header3";
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import edit from "../../img/edit.svg";
import { useNavigate } from "react-router";

import "../adminMain/adminMain.scss";
import plus from "../../img/plus.svg";

export const AdminMain = (props) => {
  const [state, setState] = useState({
    publList: [],
    limit: 3,
  });

  
  let navigate = useNavigate();

  useEffect(() => {
    if (!props.admin) {
      return navigate("/")      
    }
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
      publicDisc: "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
    {
      publicTitle: "BilimBank",
      publicSubtitle: "Разработка сайта",
      publicDisc: "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
    {
      publicTitle: "Новость 1",
      publicSubtitle: "23 июня 2024",
      publicDisc: "ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание ОПисание описание",
      publicPhoto: "",
    },
  ];
  return (
    <>
      <Header3 />
      <main className="adminMainPage container container-admin">
        <div className="adminMain__filter flex justif-ss-betw">
          <input type="text" name="" id="" placeholder="Поиск" />

          <div className="filter__radio">
            <label>
              <span>Новости</span>
              <input type="radio" name="show" id="" value="news" />
            </label>
            <label>
              <span>Проекты</span>
              <input type="radio" name="show" id="" value="projects" />
            </label>
          </div>
        </div>
        <button className="adminMain__add flex align-cent">
          <img src={plus} alt="" />
          Новая публикация
        </button>
        {list.map((el, i) => (
          <li className="item">
              <div className="item__title flex justif-ss-betw">
                {el.publicTitle}
                <button className="item__edit">
                    <img src={edit} alt="" />
                </button>
                </div>
              <div className="item__subtitle">{el.publicSubtitle}</div>
              <div className="item__text">
                {el.publicDisc}
              </div>
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
      </main>
    </>
  );
};
