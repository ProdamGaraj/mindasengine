import "../project/projects.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../axios";
import Collapsible from "react-collapsible";

export const Projects = (props) => {
  const [state, setState] = useState({
    projectList: [],
    projectImgList: [],
    limit: 3,
    isOpen: false,
    loadingProject: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loadingProject: true });
        const response = await axios.get(baseURL + "/projects");
        setState({ ...state, loadingProject: false });
        setState({ ...state, projectList: response.data });
      } catch (error) {
        setState({ ...state, loadingProject: false });
        console.log(error);
      }
    }

    fetchData();
  }, [state.limit]);

  return (
    <>
      <div className="main__project container">
        <h1 className="preview__title">
          {props.language == "RU" ? "Наши проекты" : " Our projects"}
        </h1>
        <ul className="project__list">
          {state.loadingProject ? (
            <div className="news__loading-project"></div>
          ) : (
            state.projectList.map((el, i) => (
              <li className="item flex justif-ss-betw">
                <div className="item__info">
                  <div className="info__name">{el.project.name}</div>
                  <div className="info__desc">
                    <Collapsible
                      trigger={"О проекте"}
                      className="item__collapsible"
                      style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                      }}
                    >
                      <div className="item__content">
                        {el.project.description}
                      </div>
                    </Collapsible>
                  </div>
                </div>
                <div>
                  <p className="slider__title">{el.projectKind}</p>
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={2}
                    className="item__swiper project__slider"
                    breakpoints={{
                      750: {
                        slidesPerView: el.files.length > 1 ? 2 : 1,
                      },
                      700: {
                        slidesPerView: 1,
                      },
                      100: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {el.files.map((file, index) => (
                      <SwiperSlide>
                        <img
                          src={baseURL + "/images/" + file}
                          alt="Don't show"
                          style={{ maxWidth: "100%" }}
                        ></img>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <Collapsible
                    trigger={"О проекте"}
                    className="item__collapsible mob"
                    style={{ display: "flex", flexDirection: "column-reverse" }}
                  >
                    <div className="item__content">
                      {el.project.description}
                    </div>
                  </Collapsible>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
