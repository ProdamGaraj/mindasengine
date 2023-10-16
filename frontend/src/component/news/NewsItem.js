import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import baseURL from "../../axios";

export const NewsItem = (props) => {

    const [state, setState] = useState({
        newsImgList: [],
      });
    return(
        <li className="item">
                        <div className="item__title flex justif-ss-betw">
                            <div className="item__name">
                                {props.el.news.name}
                            </div>
                            <div className="item__date">
                                {props.el.news.publication}
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
                                    {props.el.files.map((file, index) => (
                                        <SwiperSlide style={{ backgroundColor: "black" }}>
                                           <img src={"http://localhost:1337/images/" + file} alt="Don't show" ></img>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="item__content">
                                {props.el.news.description}
                            </div>
                        </div>
                    </li>
    )
}