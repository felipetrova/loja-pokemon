import * as Style from "./ModalStyle";

const Modal = ({
  children,
  activeModal,
  iconCloseModal,
  closeModal
}) => {
  
  return (
    <Style.Modal className={activeModal ? "is-active" : ""}>
      <div className="modal-background"></div>
      <div className="modal-content">
        {iconCloseModal && (
          <div className="icon-close" onClick={closeModal}>
            X
          </div>
        )}

        <div className="max-content__modal">{children}</div>
      </div>
    </Style.Modal>
  );
}

export default Modal;
