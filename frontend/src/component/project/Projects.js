import "../project/projects.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState,useEffect } from "react";
import axios from "axios";

export const Projects = () => {
  const projectArray = [
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Разработка сайта",
      projectImg: "",
    },
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Чат-бот",
      projectImg: "",
    },
    {
      projectName: "BilimBank",
      projectDesc:
        "ОписаниеОписаниеОписание ОписаниеОписаниеОписание ОписаниеОписаниеОписание",
      projectKind: "Лэндинг",
      projectImg: "",
    },
  ];
  const [state, setState] = useState({
    projectList: [],
    limit:3 
  });

useEffect(() => {
    axios
      .get(`https://s14nv2bq-1337.euw.devtunnels.ms/user/project`)
      .then((res) => {
        setState({ ...state, projectList: res.data });
        console.log(state.projectList);
      })
      .catch((er) => {
        console.log(er);
      });
  }, [state.limit]);

  const dataHandler = () => {
    setState({ ...state, limit: ++state.limit });
  }
  return (
    <div className="main__project container">
      <h1 className="preview__title">Наши проекты</h1>
      <ul className="project__list">
        {state.projectList.map((el, i) => (
          <li className="item flex justif-ss-betw">
            <div className="item__info">
              <div className="info__name">{el.projectName}</div>
              <div className="info__desc">{el.projectDesc}</div>
            </div>
            <div >
              <p className="slider__title">{el.projectKind}</p>
              <Swiper
                spaceBetween={20}
                slidesPerView={2}
                className="item__swiper"
                breakpoints={{
                  500: {
                    slidesPerView: 2,
                  },
                  100: {
                    slidesPerView: 1,
                  },
                }}
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
            </div>
                
          </li>
        ))}
      </ul>
    </div>
  );
};