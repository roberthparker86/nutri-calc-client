import React from 'react';
import Modal from 'react-modal';

export default function SubmitMessage (props) {
  const { isOpen, open, handleOpen, changeUI, modalClass, btnClass, title, body } = props;
  const handleModalClose = () => {
    return (
      open.success
        ? changeUI({ list: true })
        : handleOpen((prev) => {
          return ({
            ...prev,
            error: false
          });
        })
    );
  };
  return (
    <Modal 
        isOpen={isOpen}
        ariaHideApp={false}
        className={modalClass}
        overlayClassName="modal__overlay"
        onRequestClose={handleModalClose}
      > 
        <h2 className="modal__title">{title}</h2>
        <p className="modal__body">{body}</p>
        <button className={`button ${btnClass}`} onClick={handleModalClose}>Close</button>
      </Modal>
  );
};