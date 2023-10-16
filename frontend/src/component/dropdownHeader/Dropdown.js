import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";

import "../dropdownHeader/dropdownH.scss";

export const DropdownHeader = () => {
  const [state, setState] = useState({
    language: "RU",
  });

  const options = ["RU", "EN"];
  const defaultOption = options[0];

  const handleOption = (e) => {
    setState({ ...state, language: e.target });
  };
  return (
    <Dropdown
      className="dropdown"
      id="details__dropdown"
      options={options}
      value={defaultOption}
      onChange={handleOption}
    />
  );
};
