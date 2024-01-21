import "../project/projects.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../axios";
import ReactResizeDetector from "react-resize-detector";
import { ShowMoreContent } from "./ShowMore";
import AltPhoto from "../../img/mae_placeholder.png";
import RUalt from "../../img/altPhoto/mae_placeholder_ru.png";
import ENalt from "../../img/altPhoto/mae_placeholder_en.png";
import UZalt from "../../img/altPhoto/mae_placeholder_uz.png";

export const Projects = (props) => {
  const [state, setState] = useState({
    projectList: [],
    projectImgList: [],
    limit: 3,
    isOpen: false,
    loadingProject: false,
  });

  const [heightArray, setHeightArray] = useState([]);
  const handleResize = (entry, width, height) => {
    setHeightArray((prevHeightArray) => {
      const newArray = [...prevHeightArray];
      newArray[entry] = height > 17 ? height : 200;
      return newArray;
    });
  };

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
          {props.language == "RU"
            ? "Наши проекты"
            : props.language == "EN"
            ? " Our projects"
            : props.language == "UZ"
            ? "Bizning loyihalarimiz"
            : ""}
        </h1>
        <ul className="project__list">
          {state.loadingProject ? (
            <div className="news__loading-project"></div>
          ) : (
            state.projectList.map((el, i) => (
              <>
                <div className="info__name" id={i + "pr"}>
                  {el.project.name}
                </div>
                <li className="item flex">
                  <div className="item__info">
                    <div className="info__desc">
                      <ShowMoreContent
                        i={i}
                        height={heightArray[i] - 45}
                        content={el.project.description}
                      />
                    </div>
                  </div>
                  <div>
                    <ReactResizeDetector
                      handleWidth
                      handleHeight
                      onResize={(width, height) =>
                        handleResize(i, width, height)
                      }
                    >
                      {({ width, height }) => (
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
                          {el.files.length > 0 ? (
                            el.files.map((file, index) => (
                              <SwiperSlide>
                                <img
                                  src={baseURL + "/images/" + file}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    switch (props.language) {
                                      case "RU":
                                        e.target.src = RUalt;
                                        break;
                                      case "EN":
                                        e.target.src = ENalt;
                                        break;
                                      case "UZ":
                                        e.target.src = UZalt;
                                        break;
                                      default:
                                        e.target.src = ""; // Пустая строка, если значение props.language не соответствует ни одному из указанных случаев
                                    }
                                  }}
                                  alt="пусто"
                                  key={props.language + file}
                                />
                              </SwiperSlide>
                            ))
                          ) : props.language == "RU" ? (
                            <img src={RUalt} alt={"пусто"} key={i}></img>
                          ) : props.language == "EN" ? (
                            <img src={ENalt} alt={"пусто"} key={i}></img>
                          ) : props.language == "UZ" ? (
                            <img src={UZalt} alt={"пусто"} key={i}></img>
                          ) : (
                            ""
                          )}
                        </Swiper>
                      )}
                    </ReactResizeDetector>
                  </div>
                </li>
              </>
            ))
          )}
        </ul>
      </div>
    </>
  );
};
