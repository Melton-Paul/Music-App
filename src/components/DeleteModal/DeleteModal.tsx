import React from "react";
import styles from "./DeleteModal.module.css";
import authContext from "../../store/auth-context";

const DeleteModal: React.FC<{
  deleteFunction: () => void;
  cancelFunction: () => void;
}> = (props) => {
  const authCtx = React.useContext(authContext);
  function onYes() {
    props.deleteFunction();
  }
  function onNo() {
    props.cancelFunction();
  }

  return (
    <>
      <div className={styles.background} onClick={onNo}></div>
      <div className={styles.modal}>
        {!authCtx.isDeveloper ? (
          <>
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
          </>
        ) : (
          <>
            <h3 className={styles["modal-title"]}>
              Developer login cannot perform this action.
            </h3>
            <div>
              <button onClick={onNo}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default DeleteModal;
