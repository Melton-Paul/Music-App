import React from "react";
import styles from "./SimilarSongs.module.css";
import MediumCard from "../SongCards/MediumCard/MediumCard";
import songContext from "../../store/song-context";
import userDataContext from "../../store/userData-context";
import { Link } from "react-router-dom";

export default function SimilarSongs() {
  const songCtx = React.useContext(songContext);
  const userDataCtx = React.useContext(userDataContext);

  const temp = [...songCtx.songs];
  const songArr =
    userDataCtx.recents.length > 0 ? temp.splice(0, 8) : songCtx.songs;

  const songHtml = songArr.map((song) => (
    <MediumCard
      img={song.img}
      name={song.name}
      desc={song.desc}
      id={song.id}
      artist={song.artist}
      key={song.id}
      mp3={song.mp3}
    />
  ));

  return (
    <section className={styles["similar-page"]}>
      <div className={styles["similar-header"]}>
        <h2>
          {userDataCtx.recents.length > 0
            ? "Similar to what you listen to"
            : "Our Catalog"}
        </h2>
        {userDataCtx.recents.length > 0 && (
          <Link to="search" className={styles.link}>
            See All
          </Link>
        )}
      </div>
      <article className={styles.similarSongs}>{songHtml}</article>
    </section>
  );
}
