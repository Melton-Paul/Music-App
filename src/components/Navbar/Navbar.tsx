import React from "react";
import styles from "./Navbar.module.css";
import authContext from "../../store/auth-context";
import userDataContext from "../../store/userData-context";
import { Link } from "react-router-dom";
const logo = require("../../images/logomusic.png");
const expand = require("../../images/expand-arrow.png");

const Navbar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const authCtx = React.useContext(authContext);
  const userDataCtx = React.useContext(userDataContext);

  function toggleExpanded() {
    setIsExpanded((prev) => !prev);
  }
  function logOut() {
    authCtx.logOut();
    toggleExpanded();
  }
  function handleClick(name: string, songs: any) {
    userDataCtx.setView(name, songs);
  }


  const collapsedStyling = {
    transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
  };

  const playlistHtml = userDataCtx.playlists.map((playlist) => (
    <Link to="/playlist" key={playlist.name}>
      <li
        onClick={() => {
          handleClick(playlist.name, playlist.songs);
        }}
      >
        {playlist.name}
      </li>
    </Link>
  ));

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles["logo-container"]} >
        <img src={logo} alt="" width="60px" height="50px" />
        <p>Music App</p>
      </Link>
      <img
        onClick={toggleExpanded}
        className={styles.expand}
        src={expand}
        alt="Expand navbar content"
        style={collapsedStyling}
      />
      <ul
        className={`${styles["navbar-list"]} ${
          !isExpanded ? styles.collapsed : ""
        }`}
      >
        <li onClick={toggleExpanded}>
          <Link to="/">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </li>
        <li onClick={toggleExpanded}>
          <Link to="search">
            <i className="fa-solid fa-magnifying-glass"></i>
            Search
          </Link>
        </li>
        <li onClick={toggleExpanded}>
          {authCtx.isLoggedIn ? (
            <button className={styles.logOut} onClick={logOut}>
              Log Out
            </button>
          ) : (
            <Link to="login">
              <i className="fa-solid fa-right-to-bracket"></i>
              Log In
            </Link>
          )}
        </li>
      </ul>
      {userDataCtx.playlists.length > 0 && (
        <div className={styles.playlists}>
          <h3 className={styles["playlist-title"]}>Your Playlists</h3>
          <ul className={styles["playlist-list"]}>{playlistHtml}</ul>
        </div>
      )}
      <div className={styles["nav-copyright"]}>
        <p>Created by Paul Melton</p>
        <a href="https://paulcmelton.com" target="_blank" rel="noreferrer">
          PaulCMelton.com
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
