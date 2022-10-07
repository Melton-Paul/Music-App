import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal: React.FC<{
  deleteFunction: () => void;
  cancelFunction: () => void;
}> = (props) => {
  function onYes() {
    props.deleteFunction();
  }
  function onNo() {
    props.cancelFunction();
  }

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.modal}>
        <h3 className={styles["modal-title"]}>
          Are you sure you want to delete this?
        </h3>
        <p className={styles["modal-warning"]}>
          This action cannot be reversed
        </p>
        <div>
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
