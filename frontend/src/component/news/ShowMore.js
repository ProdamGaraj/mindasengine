import ShowMore from "react-show-more-button";
import { useEffect, useState, useRef } from "react";
import ShowMoreText from "react-show-more-text";

export const ShowMoreContent = (props) => {
  const [state, setState] = useState({
    button: true,
    showMore: false,
  });
  //console.log("Фотка " + props.height / 31);
  console.log(props.content.length);
  return (
    <>
      {/* Принимаем 60 символов за 1 строку 
        Чтобы проверить больше ли наша ебала фотки: 
      */}
      {state.showMore
        ? props.content
        : `${props.content.substring(0, (props.height / 31) * 53)}`}
      {props.content.length / 50 > props.height / 31 ? (
        <>
          <div className="flex" style={{justifyContent:"end"}}>
            
            <button
              onClick={() => setState({ ...state, showMore: !state.showMore })}
            >
              {!state.showMore ? "Показать всю новость" : "Скрыть новость"}
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
