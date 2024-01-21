import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import "../dropdownHeader/dropdownH.scss";

export const DropdownHeader = (props) => {
  const [state, setState] = useState({
    language: "RU",
  });
  const options = ["RU", "EN", "UZ"];
  const defaultOption = options[0];
  const handleOption = (e) => {
    setState({ ...state, language: e.target });
    props.setState({...props.state, language: e.value}) 
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
