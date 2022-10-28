import React from "react";
import userDataContext from "../../../store/userData-context";
import SmallCard from "../../SongCards/SmallCard/SmallCard";
import { Link } from "react-router-dom";
import styles from "./ShowPlaylist.module.css";
import DeleteModal from "../../DeleteModal/DeleteModal";

const ShowPlaylist = () => {
  const userDataCtx = React.useContext(userDataContext);
  const name = userDataCtx.currentView.name;
  const [askDelete, setAskDelete] = React.useState(false);

  function toggleDelete() {
    setAskDelete((prev) => !prev);
  }

  const playlistHtml = userDataCtx.currentView.songs.map((song) => (
    <div onClick={() => userDataCtx.playSong(song)}>
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
        className={styles.button}
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
      {askDelete && (
        <DeleteModal
          deleteFunction={removePlaylist}
          cancelFunction={toggleDelete}
        />
      )}
      <Link to="/" className={styles["back-button"]}>
        <i className="fa-solid fa-arrow-left"></i>
        <span>Go back</span>
      </Link>
      <div className={styles.header}>
        <h2 className={styles["playlist-name"]}>
          {userDataCtx.currentView.name}
        </h2>
        <div className={styles["button-container"]}>
          <button className={styles.button} onClick={toggleDelete}>
            Delete Playlist
          </button>
          <button className={styles.button} onClick={startPlaylist}>
            Start Playlist
          </button>
        </div>
      </div>
      {playlistHtml}
    </div>
  );
};

export default ShowPlaylist;
