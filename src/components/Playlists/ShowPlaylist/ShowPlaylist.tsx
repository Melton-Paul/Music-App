import React from "react";
import userDataContext from "../../../store/userData-context";
import SmallCard from "../../SongCards/SmallCard/SmallCard";
import { Link } from "react-router-dom";
import styles from "./ShowPlaylist.module.css";
const backIcon = require("../../../images/arrow.png");

const ShowPlaylist = () => {
  const userDataCtx = React.useContext(userDataContext);

  const playlistHtml = userDataCtx.currentView.songs.map((song) => (
    <SmallCard
      img={song.img}
      name={song.name}
      id={song.id}
      artist={song.artist}
      mp3={song.mp3}
      desc={song.desc}
    />
  ));

  return (
    <div>
      <Link to="/" className={styles["back-button"]}>
        <img src={backIcon} alt="Go back to main page" />
        <span>Go back</span>
      </Link>
      <h2 className={styles["playlist-name"]}>
        {userDataCtx.currentView.name}
      </h2>
      {playlistHtml}
    </div>
  );
};

export default ShowPlaylist;
