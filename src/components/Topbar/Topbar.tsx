import React from "react";
import styles from "./Topbar.module.css";
import authContext from "../../store/auth-context";
import SearchInput from "../Search/SearchInput";
import { Link, useLocation } from "react-router-dom";

const Topbar: React.FC<{ scroll: number }> = ({ scroll }) => {
  const authCtx = React.useContext(authContext);
  const [isShowing, setIsShowing] = React.useState(false);
  const pathName = useLocation();
  function toggleShowing() {
    setIsShowing((prev) => !prev);
  }
  console.log(pathName);

  const style = {
    background:
      scroll > 0
        ? scroll > 100
          ? "rgba(46, 6, 6, 1)"
          : "rgba(46, 6, 6,.5)"
        : "transparent",
  };
  const buttonStyle = {
    background: isShowing ? "rgb(36, 33, 33)" : "black",
  };

  return (
    <div className={styles.topBar} style={style}>
      {!authCtx.userId ? (
        <Link to="login">
          <button className={styles["profile-button"] + " " + styles.link}>
            Log In
          </button>
        </Link>
      ) : (
        <button
          className={styles["profile-button"]}
          style={buttonStyle}
          onClick={toggleShowing}
        >
          <div className={styles["profile-button-icon"]}>
            <i className="fa-regular fa-user"></i>
          </div>
          <p>Your Profile</p>
          <div className={styles["profile-button-carat"]}>
            <i
              className={
                !isShowing ? "fa-solid fa-caret-down" : "fa-solid fa-caret-up"
              }
            ></i>
          </div>
        </button>
      )}
      {authCtx.isLoggedIn && isShowing && (
        <div className={styles.modal}>
          <ul className={styles["profile-list"]}>
            <Link to="account">
              <li>Account</li>
            </Link>
            <Link to="settings">
              <li>Settings</li>
            </Link>
            <li
              onClick={() => authCtx.logOut()}
              className={styles["profile-list_logout"]}
            >
              Log Out
            </li>
          </ul>
        </div>
      )}
      <div className={styles["button-container"]}>
        {pathName.pathname !== "/" && (
          <Link to="/" className={styles["back-button"]}>
            <i className="fa-solid fa-arrow-left"></i>
            <span>Go back</span>
          </Link>
        )}
        {pathName.pathname === "/search" && <SearchInput />}
      </div>
    </div>
  );
};
export default Topbar;
