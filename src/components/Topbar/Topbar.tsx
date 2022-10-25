import React from "react";
import styles from "./Topbar.module.css";

const Topbar: React.FC<{ scroll: number }> = ({ scroll }) => {
  const style = {
    background:
      scroll > 0
        ? scroll > 100
          ? "rgba(46, 6, 6, 1)"
          : "rgba(46, 6, 6,.5)"
        : "transparent",
  };
  return (
    <div className={styles.topBar} style={style}>
      <button className={styles["profile-button"]}>
        <div className={styles["profile-button-icon"]}>
          <i className="fa-regular fa-user"></i>
        </div>
        <p>Your Profile</p>
        <div className={styles["profile-button-carat"]}>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </button>
    </div>
  );
};
export default Topbar;
