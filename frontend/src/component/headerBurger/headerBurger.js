import "../headerBurger/headerBurger.scss";
import { useState } from "react";

export const HeaderBurger = (props) => {
  const [state, setState] = useState({
    burger: false,
    notifOpen: false,
  });

  const { burger, notifOpen } = state;

  const handleBurger = (e) => {
    setState({ ...state, burger: !state.burger });
  };

  return (
    <>
      <div
        className={!burger ? "header__burger" : "header__burger active"}
        onClick={handleBurger}
      >
        <span></span>
        <span></span>
      </div>
    </>
  );
};
