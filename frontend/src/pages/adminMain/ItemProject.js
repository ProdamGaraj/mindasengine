import { Link } from "react-router-dom";
import edit from "../../img/edit.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import baseURL from "../../axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ItemProject = (props) => {
  const [state, setState] = useState({
    publList: [],
    pubListProject: [],
    loading: false,
    show: "project",
  });
  let navigate = useNavigate();
  const cookiesString = document.cookie;
  const cookiesArray = cookiesString.split(";"); // Разделить строку на отдельные пары ключ-значение
  const cookiesObject = {}; // Создать объект для хранения каждого cookie

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });
  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const res = await axios.get(baseURL + `/moderator/get/projects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookiesObject.tokenType} ${cookiesObject.accessToken}`,
          },
        });
        setState({ ...state, loading: false });
        console.log(res.data);
        setState({ ...state, publList: res.data });
        console.log(state.publList);
        //setState({ ...state, publListCon: res.data.news });
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  }, [state.show]);

  return (
    <>
      {state.loading == false ? (
        state.publList.map((el, i) => (
          <li className="item">
            <div className="item__title flex justif-ss-betw align-cent">
              {el.project.name}
              <button className="item__edit">
                <Link to="/adminmain/edit" state={{ el, state }}>
                  <img src={edit} alt="" />
                </Link>
              </button>
            </div>
            <div className="item__subtitle">{el.project.publication}</div>
            <div className="item__text">{el.project.description}</div>
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              className="item__swiper"
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
          </li>
        ))
      ) : (
        <div className="loading__wrapper">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
};
