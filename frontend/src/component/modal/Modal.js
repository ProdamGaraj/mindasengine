import ReactModal from "react-modal";
import "../modal/modal.scss";
import { useState } from "react";

export const ModalDeleteConfirm = ({
  open,
  handleCloseModal,
  handleDelete,
}) => {
  return (
    <ReactModal isOpen={open} className="form__delete_modal">
      <div className="modal__back"></div>
      <div className="modal__wrapper">
        <p>Вы уверены что хотите сделать это?</p>

        <div className="flex justif-ss-betw">
          <button onClick={handleDelete}>Согласиться</button>
          <button onClick={handleCloseModal}>Отмена</button>
        </div>
      </div>
    </ReactModal>
  );
};