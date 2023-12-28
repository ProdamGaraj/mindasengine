import ShowMore from "react-show-more-button";
import { useEffect, useState } from "react";

export const ShowMoreContent = (props) => {
  console.log(props);
  const [state, setState] = useState({
    button: true,
  });
  return (
    <ShowMore
      maxHeight={props.height}
      button={
        <button>{state.button ? "Открыть новость" : "Скрыть новость"}</button>
      }
      classNameButtonDiv="show-more__button"
      onChange={(showValue) => setState({ ...state, button: showValue })}
    >
      {props.content}
    </ShowMore>
  );
};
