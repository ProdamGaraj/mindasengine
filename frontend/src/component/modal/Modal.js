import ReactModal from "react-modal";
import "../modal/modal.scss";

export const ModalDeleteConfirm = ({
  open,
  handleCloseModal,
  handleDelete,
}) => {
  return (
    <ReactModal isOpen={open} className="form__delete_modal">
      <div className="modal__back"></div>
      <div className="modal__wrapper">
        <p>Вы точно хотите удалить пост?</p>

        <div className="flex justif-ss-betw">
          <button onClick={handleDelete}>Удалить</button>
          <button onClick={handleCloseModal}>Отмена</button>
        </div>
      </div>
    </ReactModal>
  );
};
