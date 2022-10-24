import React from "react";
import styles from "./Topbar.module.css";

const Topbar: React.FC<{ scroll: number }> = ({ scroll }) => {
  const style = {
    background:
      scroll > 0
        ? scroll > 100
          ? "rgba(0,0,0,1)"
          : "rgba(0,0,0,.5)"
        : "transparent",
  };
  return (
    <div className={styles.topBar} style={style}>
      <h2>Top</h2>
    </div>
  );
};
export default Topbar;
