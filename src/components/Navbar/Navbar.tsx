import React from "react";
import styles from "./Navbar.module.css";
const logo = require("../../images/logomusic.png");
const expand = require("../../images/expand-arrow.png");

export default function Navbar() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-container"]}>
        <img src={logo} alt="" width="60px" height="50px" />
        <p>Music App</p>
      </div>
      <img
        onClick={toggleExpanded}
        className={styles.expand}
        src={expand}
        alt="Expand navbar content"
      />
      <ul
        className={`${styles["navbar-list"]} ${
          !isExpanded ? styles.collapsed : ""
        }`}
      >
        <li>Library</li>
        <li>Account</li>
        <li>Favorites</li>
      </ul>
    </nav>
  );
}
