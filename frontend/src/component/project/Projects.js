import "../project/projects.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import axios from "axios";
import baseURL from "../../axios";
import Collapsible from "react-collapsible";
import ReactResizeDetector from "react-resize-detector";
import ShowMore from "react-show-more-button/dist";
import { ShowMoreContent } from "./ShowMore";
import ShowMoreCustom from "./ShowMoreCustom";

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
          {props.language == "RU" ? "Наши проекты" : " Our projects"}
        </h1>
        <ul className="project__list">
          {state.loadingProject ? (
            <div className="news__loading-project"></div>
          ) : (
            state.projectList.map((el, i) => (
              <>
                <div className="info__name">{el.project.name}</div>
                <li className="item flex justif-ss-betw">
                  <div className="item__info">
                    <div className="info__desc">
                      <ShowMoreContent
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
