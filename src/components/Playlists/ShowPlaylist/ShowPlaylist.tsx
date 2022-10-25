import React from "react";
import userDataContext from "../../../store/userData-context";
import SmallCard from "../../SongCards/SmallCard/SmallCard";
import { Link } from "react-router-dom";
import styles from "./ShowPlaylist.module.css";
const backIcon = require("../../../images/arrow.png");

const ShowPlaylist = () => {
  const userDataCtx = React.useContext(userDataContext);
  const name = userDataCtx.currentView.name;

  console.log(userDataCtx.currentView);

  const playlistHtml = userDataCtx.currentView.songs.map((song) => (
    <div>
      <SmallCard
        img={song.img}
        name={song.name}
        id={song.id}
        artist={song.artist}
        mp3={song.mp3}
        desc={song.desc}
      />
      <button
        onClick={() => {
          userDataCtx.removeSong(song.id);
        }}
      >
        Remove
      </button>
    </div>
  ));

  function startPlaylist() {
    userDataCtx.setPlaylist(name, userDataCtx.currentView.songs);
  }

  function removePlaylist() {
    userDataCtx.removePlaylist(name);
    userDataCtx.setView("", []);
  }

  return (
    <div>
      <Link to="/" className={styles["back-button"]}>
        <i className="fa-solid fa-arrow-left"></i>
        <span>Go back</span>
      </Link>
      <div className={styles.header}>
        <h2 className={styles["playlist-name"]}>
          {userDataCtx.currentView.name}
        </h2>
        <div className={styles["button-container"]}>
          <button onClick={removePlaylist}>Delete Playlist</button>
          <button onClick={startPlaylist}>Start Playlist</button>
        </div>
      </div>
      {playlistHtml}
    </div>
  );
};

export default ShowPlaylist;
