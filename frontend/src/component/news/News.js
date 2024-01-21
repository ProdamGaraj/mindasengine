import "../news/news.scss";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import baseURL from "../../axios";
import ReactResizeDetector from "react-resize-detector";
import { ShowMoreContent } from "./ShowMore";
import { format, parseISO } from "date-fns";
import { ru, enUS, uz } from "date-fns/locale";
import AltPhoto from "../../img/mae_placeholder.png";
import RUalt from "../../img/altPhoto/mae_placeholder_ru.png";
import ENalt from "../../img/altPhoto/mae_placeholder_en.png";
import UZalt from "../../img/altPhoto/mae_placeholder_uz.png";

export const News = (props) => {
  const [state, setState] = useState({
    newsList: [],
    newsImgList: [],
    loading: false,
    counter: 3,
    textHeight: 0,
  });
  const blockRef = useRef(null);
  const textDivRef = useRef(null);
  const [fontSize, setFontSize] = useState(18.5);
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
        setState({ ...state, loading: true });
        const response = await axios.get(baseURL + "/news", {});
        setState({ ...state, loading: false });
        setState({ ...state, newsList: response.data });
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  }, [state.limit]);

  useEffect(() => {
    const handleFontSizeChange = () => {
      if (blockRef.current) {
        const computedStyle = window.getComputedStyle(blockRef.current);
        const fontSizeValue = parseFloat(
          computedStyle.getPropertyValue("line-height")
        );
        setFontSize(fontSizeValue);
      }
    };

    handleFontSizeChange(); // Вызываем при монтировании, чтобы получить начальное значение font-size
    window.addEventListener("resize", handleFontSizeChange); // Добавляем слушатель на изменение размеров окна
    return () => {
      window.removeEventListener("resize", handleFontSizeChange); // Удаляем слушатель при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    const handleHeightChange = () => {
      if (textDivRef.current) {
        const height = textDivRef.current.offsetHeight;
        setState({ ...state, textHeight: height });
      }
    };

    handleHeightChange(); // Вызываем при монтировании, чтобы получить начальное значение font-size
    window.addEventListener("resize", handleHeightChange); // Добавляем слушатель на изменение размеров окна
    return () => {
      window.removeEventListener("resize", handleHeightChange); // Удаляем слушатель при размонтировании компонента
    };
  }, []);
  console.log(state.newsList[1]);
  return (
    <div className="main__news container">
      <div className="news__title">
        {props.language == "RU" ? (
          <p>Новости</p>
        ) : props.language == "EN" ? (
          <p>News</p>
        ) : props.language == "UZ" ? (
          <p>Yangiliklar</p>
        ) : (
          ""
        )}
      </div>
      <ul className="news__list">
        {state.loading ? (
          <div className="news__loading"></div>
        ) : (
          state.newsList.slice(0, state.counter).map((el, i) => (
            <li className="item" id={i}>
              <div className="item__title flex justif-ss-betw">
                <div
                  className={
                    el.news.name.length > 70 ? "item__name bg" : "item__name"
                  }
                >
                  {el.news.name}
                </div>
                <div className="item__date">
                  <p>
                    {props.language == "RU"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: ru,
                        })
                      : props.language == "EN"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: enUS,
                        })
                      : props.language == "UZ"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: uz,
                        })
                      : ""}
                  </p>
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

                <div className="item__date-mob">
                  <p>
                    {props.language == "RU"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: ru,
                        })
                      : props.language == "EN"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: enUS,
                        })
                      : props.language == "UZ"
                      ? format(parseISO(el.news.publication), "d MMMM yyyy", {
                          locale: uz,
                        })
                      : ""}
                  </p>
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
            onClick={() => {
              setState({ ...state, counter: state.counter + 1 });
            }}
          >
            {props.language == "RU" ? (
              <p>Показать ещё новость</p>
            ) : props.language == "EN" ? (
              <p>Show more news</p>
            ) : props.language == "UZ" ? (
              <p>Ko'proq yangiliklarni ko'rsating</p>
            ) : (
              ""
            )}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
