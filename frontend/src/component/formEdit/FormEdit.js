import axios from "axios";
import { useCookies } from "react-cookie";
import baseURL from "../../axios.js";
import { useState } from "react";
import inpFile from "../../img/Vector.svg";
import "../formEdit/formEdit.scss";
import trash from "../../img/trash.svg";

export const FormEdit = (props) => {
  const [state, setState] = useState({
    name: props.state.el.news.name,
    description: props.state.el.news.description,
    publication: props.state.el.news.publication,
    files: props.state.el.files,
  });
  console.log(props.state.state.show);
  const [cookies, setCookie, removeCookie] = useCookies();

  const header = {
    Authorization: `${cookies.tokenType} ${cookies.accessToken}`,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleFileChange = (e) => {
    setState({ ...state, files: e.target.files });
  };
  const handleButtonDelete = (index) => {
    console.log(index);
    //state.files.splice()
  } 

  const handleUpload = () => {
    const { name, description, files } = state;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      formData.append("multipartFiles", files[i]);
    }

    axios
      .post(baseURL + "/moderator/update/" + props.state.state.show, formData, header)
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
        name="name"
        placeholder="Project Name"
        onChange={handleInputChange}
        value={state.name}
      />
      <textarea
        type="text"
        name="description"
        placeholder="Project Description"
        onChange={handleInputChange}
        value={state.description}
      />

      <div className="edit__photo flex row" style={state.files.length > 2 ? {overflow: "scroll",overflowY: 'hidden'}: {}}>
        {props.state.el.files.map((file, index) => (
          <div className="col-6 img__wrapper">
            <img
              src={baseURL + "/images/" + file}
              alt="Don't show"
              style={{ maxWidth: "100%" }}
            />
            <button onClick={handleButtonDelete(index)}><img src={trash} alt="" /></button>
          </div>
        ))}
      </div>
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
      <button onClick={handleUpload} className="form__btn">Сохранить</button>
    </div>
  );
};
