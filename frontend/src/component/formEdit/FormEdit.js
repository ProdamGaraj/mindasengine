import axios from "axios";
import baseURL from "../../axios.js";
import { useState, useEffect } from "react";
import inpFile from "../../img/Vector.svg";
import "../formEdit/formEdit.scss";
import trash from "../../img/trash.svg";
import { useNavigate } from "react-router";

import { ModalDeleteConfirm } from "../modal/Modal.js";

export const FormEdit = (props) => {
  useEffect(() => {
    if (props.state == null) {
      navigate("/adminmain");
    }
  }, []);
  const cookiesString = document.cookie;
  const cookiesArray = cookiesString.split(";"); // Разделить строку на отдельные пары ключ-значение
  const cookiesObject = {}; // Создать объект для хранения каждого cookie
  let navigate = useNavigate();
  const [state, setState] = useState({
    id:
      props.state.state.show == "news"
        ? props.state.el.news.id
        : props.state.el.project.id,
    idDefault:
      props.state.state.show == "news"
        ? props.state.el.news.id
        : props.state.el.project.id,
    name:
      props.state.state.show == "news"
        ? props.state.el.news.name
        : props.state.el.project.name,
    nameDefault:
      props.state.state.show == "news"
        ? props.state.el.news.name
        : props.state.el.project.name,
    description:
      props.state.state.show == "news"
        ? props.state.el.news.description
        : props.state.el.project.description,
    descriptionDefault:
      props.state.state.show == "news"
        ? props.state.el.news.description
        : props.state.el.project.description,
    publication:
      props.state.state.show == "news"
        ? props.state.el.news.publication
        : props.state.el.project.publication,
    publicationDefault:
      props.state.state.show == "news"
        ? props.state.el.news.publication
        : props.state.el.project.publication,
    files:
      props.state.state.show == "news"
        ? props.state.el.files
        : props.state.el.files,
    filesDefault:
      props.state.state.show == "news"
        ? props.state.el.files
        : props.state.el.files,
    kind: props.state.state.show,
    modalStatus: false,
    imgDeleteModal: false,
    modalConfirm: false,
    indexDel: 0,
    preview: [],
  });

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key.trim()] = value.trim();
  });

  useEffect(() => {
    if (cookiesString === "") {
      navigate("/auth");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // создаем новый массив файлов из объекта FileList

    const updatedFiles = newFiles.map((file) => {
      file.preview = URL.createObjectURL(file); // добавляем свойство 'preview' к каждому файлу со значением URL-адреса предварительного просмотра
      return file;
    });

    setState({ ...state, files: [...state.files, ...updatedFiles] }); // обновляем состояние, добавляя новые файлы с превью в конец существующего массива файлов
    //const newFiles = Array.from(e.target.files); // создаем новый массив файлов из объекта FileList
    //state.files.push(...newFiles); // используем оператор spread для добавления новых файлов в конец существующего массива файлов
    //setState({ ...state, files: state.files }); // обновляем состояние, передавая новый массив файлов
  };

  const handleButtonDelete = () => {
    const updatedPhotos = [...state.files];
    updatedPhotos.splice(state.indexDel, 1);
    setState({ ...state, files: updatedPhotos, imgDeleteModal: false });
  };

  const handleUpload = () => {
    const { name, description, files, publication, id } = state;
    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);

    for (let i = 0; i < files.length; i++) {
      if (typeof files[i] !== "string") {
        formData.append("multipartFiles", files[i]);
      }
    }

    if (props.state.state.show == "news") {
      formData.append("publication", publication);
    }

    console.log(formData);
    formData.forEach((value, name) => {
      console.log(name, value);
    });

    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await axios.put(
          baseURL + "/moderator/update/" + state.kind,
          formData,
          {
            headers: {
              //"Content-Type": "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `${cookiesObject.tokenType} ${cookiesObject.accessToken}`,
            },
          }
        );
        setState({ ...state, projectList: response.data });
        setState({ ...state, loading: false });
        setState({ ...state, modalConfirm: false });
        navigate("/adminmain");
      } catch (error) {
        setState({ ...state, loading: false });
        setState({ ...state, modalConfirm: false });
        console.log(error);
      }
    }

    fetchData();
  };

  const handleDelete = () => {
    const { id } = state;
    const formData = new FormData();

    formData.append("id", id);
    async function fetchData() {
      try {
        setState({ ...state, loading: true });
        const response = await axios.delete(
          baseURL + "/moderator/delete/" + state.kind,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${cookiesObject.tokenType} ${cookiesObject.accessToken}`,
            },
            data: formData,
          }
        );
        setState({ ...state, loading: false });
        navigate("/adminmain");
      } catch (error) {
        setState({ ...state, loading: false });
        console.log(error);
      }
    }

    fetchData();
  };

  const handleOpenModal = () => {
    setState({ ...state, modalStatus: true });
  };

  const handleCloseModal = () => {
    setState({ ...state, modalStatus: false });
  };

  const handleOpenModalImg = (index) => {
    setState({ ...state, indexDel: index, imgDeleteModal: true });
  };
  const handleCloseModalImg = () => {
    setState({ ...state, imgDeleteModal: false });
  };

  const handleOpenUpdateModal = () => {
    setState({ ...state, modalConfirm: true });
  };
  const handleCloseUpdateModal = () => {
    setState({ ...state, modalConfirm: false });
  };
  return (
    <div className="form__news" id="form__news">
      {state.loading ? (
        <div className="loading__wrapper">
          <div className="loading"></div>
        </div>
      ) : (
        <></>
      )}
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

      <div
        className="edit__photo flex row"
        style={
          state.files.length > 2
            ? { overflow: "scroll", overflowY: "hidden" }
            : {}
        }
      >
        {state.files.length > 0
          ? state.files.map((file, index) => (
              <>
                <div className="col-6 img__wrapper" key={index}>
                  {state.files[index].preview == undefined ? (
                    <img
                      src={baseURL + "/images/" + file}
                      alt="Don't show"
                      style={{ maxWidth: "100%" }}
                    />
                  ) : (
                    <img
                      src={state.files[index].preview}
                      alt="Don't show"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                  <button onClick={() => handleOpenModalImg(index)}>
                    <img src={trash} alt="" />
                  </button>
                </div>
              </>
            ))
          : ""}
      </div>
      <label htmlFor="admin__uploadFile" className="input__file">
        <span className="flex align-cent">
          <img src={inpFile} /> Добавить медиафайлы
        </span>
        <input
          style={{ display: "none" }}
          type="file"
          name="multipartFiles"
          id="admin__uploadFile"
          accept=".png,.jpg,.jpeg,.gif,.raw, .tiff,.bmp, .psd, .svg, .pdf, .eps, .HEIF"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <div className="flex justif-ss-betw">
        <button
          onClick={handleOpenModal}
          className="form__btn"
          style={{background:"#dd586d"}}
        >
          Удалить запись
        </button>

        <button
          onClick={
            state.description === state.descriptionDefault &&
            state.files === state.filesDefault &&
            state.publication === state.publicationDefault
              ? () => navigate("/adminmain")
              : handleOpenUpdateModal
          }
          className="form__btn"
        >
          Сохранить
        </button>

        <ModalDeleteConfirm
          open={state.modalStatus}
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
        />
        <ModalDeleteConfirm
          open={state.imgDeleteModal}
          handleCloseModal={handleCloseModalImg}
          handleDelete={handleButtonDelete}
        />
        <ModalDeleteConfirm
          open={state.modalConfirm}
          handleCloseModal={handleCloseUpdateModal}
          handleDelete={handleUpload}
        />
      </div>
    </div>
  );
};
