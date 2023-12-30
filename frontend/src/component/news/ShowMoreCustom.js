import { useState, useEffect, useRef } from "react";

const ShowMoreCustom = (props) => {
  return (
    <div className="showContent">
      <div className="news__text-sh" style={{ maxHeight: props.height }}>
        <p>{props.text}</p>
        <button className="showContent__button">{props.heightArray1}</button>
      </div>
    </div>
  );
};

export default ShowMoreCustom;
