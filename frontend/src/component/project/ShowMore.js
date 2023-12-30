import ShowMore from "react-show-more-button";
import { useEffect, useRef, useState } from "react";


export const ShowMoreContent = (props) => {
  const [state, setState] = useState({
    button: true,
    showMore: false
  });
  
  return (
    <>
      {/* Принимаем 60 символов за 1 строку 
        Чтобы проверить больше ли наша ебала фотки: 
      */}
      {state.showMore
        ? props.content
        : `${props.content.substring(0, (props.height / 31) * 50)}`}
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
