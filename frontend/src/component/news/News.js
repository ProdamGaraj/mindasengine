import "../news/news.scss";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

const baseUrl = "http://localhost:1337"

export const News = () => {
    const [state, setState] = useState({
        newsList: [],
        newsImgList: [],
        limit:3
      });

    useEffect(() => {
        axios
          .get(baseUrl + `/news`)
          .then((res) => {
            setState({ ...state, newsList: res.data });
          })
          .catch((er) => {
            console.log(er);
          });
      }, [state.limit]);

      const dataHandler = () => {
        setState({ ...state, limit: ++state.limit });
      }
    return(
        <div className="main__news container">
            <div className="news__title">
                <p>Новости</p>
            </div>
            <ul className="news__list">
                {state.newsList.map((el,i) => (
                    <li className="item">
                        <div className="item__title flex justif-ss-betw">
                            <div className="item__name">
                                {el.news.name}
                            </div>
                            <div className="item__date">
                                {el.news.publication}
                            </div>
                        </div>
                        <div className="item__main flex justif-ss-betw">
                            <div className="item__img">
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    className="item__swiper"
                                    breakpoints={{
                                    750: {
                                        slidesPerView: 2,

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
                                        <SwiperSlide style={{ backgroundColor: "black" }}>
\                                           <img src={"http://localhost:1337/images/" + file} alt="Don't show" ></img>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="item__content">
                                {el.news.description}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="news__btn flex justif-ss-cent">
                {state.newsList.length > 3 ? <button onClick={dataHandler}>Показать ещё</button> : <></>}

            </div>
        </div>
    )
}