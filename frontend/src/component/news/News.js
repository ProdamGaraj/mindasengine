import "../news/news.scss";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import baseURL from "../../axios";
import Collapsible from "react-collapsible";

//const baseUrl = "http://localhost:1337"

export const News = (props) => {
  const [state, setState] = useState({
    newsList: [],
    newsImgList: [],
    limit: 3,
    loading: false,
    isOpen: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await axios.get(baseURL + "/news");
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
          state.newsList.map((el, i) => (
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
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    className="item__swiper"
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
                        ></img>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="item__date-mob">
                  <p>{el.news.publication}</p>
                </div>
                <div className="item__trigger">
                  {el.news.description.split(" ").length > 60 ? (
                    <>
                      <p className="title">
                        {el.news.description.split(" ").slice(0, 10).join(" ")}
                      </p>
                      <Collapsible
                        trigger={"Вся новость"}
                        className="item__collapsible"
                      >
                        <div className="item__content">
                          {el.news.description}
                        </div>
                      </Collapsible>
                    </>
                  ) : (
                    <div className="item__content">{el.news.description}</div>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
