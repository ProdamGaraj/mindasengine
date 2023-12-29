import "../news/news.scss";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import baseURL from "../../axios";
import ReactResizeDetector from "react-resize-detector";
import ShowMoreCustom from "./ShowMoreCustom";
import { ShowMoreContent } from "./ShowMore";

export const News = (props) => {
  const [state, setState] = useState({
    newsList: [],
    newsImgList: [],
    loading: false,
    counter: 3,
  });

  const [heightArray, setHeightArray] = useState([]);
  const [heightArray1, setHeightArray1] = useState([]);
  const handleResize = (entry, width, height) => {
    setHeightArray((prevHeightArray) => {
      const newArray = [...prevHeightArray];
      newArray[entry] = height > 17 ? height : 200;
      return newArray;
    });
  };

  const handleResize1 = (entry, width, height) => {
    setHeightArray1((prevHeightArray) => {
      const newArray = [...prevHeightArray];
      newArray[entry] = height;
      return newArray;
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await axios.get(baseURL + "/news", {});
        console.log(response.data);
        setState({ ...state, loading: false });
        setState({ ...state, newsList: response.data });
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  }, [state.limit]);
  return (
    <div className="main__news container">
      <div className="news__title">
        {props.language == "RU" ? <p>Новости</p> : <p>News</p>}
      </div>
      <ul className="news__list">
        {state.loading ? (
          <div className="news__loading"></div>
        ) : (
          state.newsList.slice(0, state.counter).map((el, i) => (
            <li className="item">
              <div className="item__title flex justif-ss-betw">
                <div
                  className={
                    el.news.name.length > 50 ? "item__name bg" : "item__name"
                  }
                >
                  {el.news.name}
                </div>
                <div className="item__date">
                  <p>{el.news.publication}</p>
                </div>
              </div>
              <div className="item__main flex justif-ss-betw">
                <div className="item__img">
                  <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={(width, height) => handleResize(i, width, height)}
                  >
                    {({ width, height }) => (
                      <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        className="item__swiper news__slider"
                        breakpoints={{
                          750: {
                            slidesPerView: "auto",
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
                              key={i}
                            ></img>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </ReactResizeDetector>
                </div>

                <div className="item__date-mob">
                  <p>{el.news.publication}</p>
                </div>
                <div className="item__trigger">
                  <div className="item__content">
                    <ShowMoreContent
                      content={el.news.description}
                      i={i}
                      height={heightArray[i]}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
      <div className="news__button">
        {state.counter < state.newsList.length ? (
          <button
            onClick={() => setState({ ...state, counter: state.counter + 1 })}
          >
            Показать ещё новость
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
