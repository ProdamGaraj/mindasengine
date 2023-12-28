import PhotoAlbum from "react-photo-album";
import img1 from "../../img/preview__img.png";
import img2 from "../../img/preview__img.png";
import img3 from "../../img/preview__img.png";
import img4 from "../../img/about__img.png";
import { useState } from "react";

export const Galery = () => {
  const [state, setState] = useState({
    model: false,
    tempimgSrc: "",
  });
  let data = [
    {
      id: 1,
      imgSrc: img1,
    },
    {
      id: 2,
      imgSrc: img2,
    },
    {
      id: 3,
      imgSrc: img3,
    },
    {
      id: 4,
      imgSrc: img4,
    },
  ];

  const getImg = (imgSrc) => {
    setState({ ...state, model: true, tempimgSrc: imgSrc });
  };
  return (
    <>
      <div className={state.model ? "model open" : "model"}>
        <div className="model__body">
          <div style={{ width: "100%" }}>
            <button
              style={{ marginLeft: "100%" }}
              onClick={() => setState({ ...state, model: false })}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                  fill="#0F0F0F"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                  fill="#0F0F0F"
                />
              </svg>
            </button>
          </div>

          <img src={state.tempimgSrc} alt="" />
        </div>
      </div>
      <div className="galery">
        {data.map((item, index) => {
          return (
            <div className="pics" key={index}>
              <img
                src={item.imgSrc}
                alt=""
                style={{ width: "100%" }}
                onClick={() => getImg(item.imgSrc)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
