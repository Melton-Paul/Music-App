import React from "react";
import styles from "./Navbar.module.css";
import authContext from "../../store/auth-context";
import { Link } from "react-router-dom";
const logo = require("../../images/logomusic.png");
const expand = require("../../images/expand-arrow.png");

const Navbar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const authCtx = React.useContext(authContext);

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }
  function logOut() {
    authCtx.logOut();
    toggleExpanded();
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles["logo-container"]}>
        <img src={logo} alt="" width="60px" height="50px" />
        <p>Music App</p>
      </Link>
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
        {authCtx.isLoggedIn ? (
          <button onClick={logOut}>Log Out</button>
        ) : (
          <Link to="login">
            <button>Log In</button>
          </Link>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
