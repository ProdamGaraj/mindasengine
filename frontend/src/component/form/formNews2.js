import axios from "axios";
import { useCookies } from "react-cookie";
import baseURL from "../../axios.js";
import { useState } from "react";
import inpFile from "../../img/Vector.svg";

export const FormNews2 = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    files: null,
  });

  const [cookies, setCookie, removeCookie] = useCookies();

  const header = {
    Authorization: `${cookies.tokenType} ${cookies.accessToken}`,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, name: value });
  };
  const handleInputChange2 = (e) => {
    const { description, value } = e.target;
    setState({ ...state, description: value });
  };

  const handleFileChange = (e) => {
    setState({ ...state, files: e.target.files });
  };

  const handleUpload = () => {
    const { name, description, files } = state;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFiles", files[i]);
    }

    axios
      .post(baseURL + "/moderator/upload/project", formData, header)
      .then((response) => {
        console.log(response.data);
        console.log(formData);
        // Handle the success response here
      })
      .catch((error) => {
        console.error(error);
        // Handle the error response here
      });
  };
  return (
    <div className="form__news">
      <input
        type="text"
        name="namee"
        placeholder="Project Name"
        onChange={handleInputChange}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Project Description"
        onChange={handleInputChange2}
      />
      <label htmlFor="" className="input__file">
        <span className="flex align-cent">
          <img src={inpFile} /> Добавить медиафайлы
        </span>
        <input
          type="file"
          name="multipartFiles"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <button onClick={handleUpload} className="form__btn">
        Опубликовать
      </button>
    </div>
  );
};
