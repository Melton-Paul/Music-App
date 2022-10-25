import React from "react";
import styles from "./SimilarSongs.module.css";
import MediumCard from "../SongCards/MediumCard/MediumCard";
import songContext from "../../store/song-context";

export default function SimilarSongs() {
  const songCtx = React.useContext(songContext);

  const songHtml = songCtx.songs.map((song) => (
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
    <section>
      <h2>Similar to what you listen to</h2>
      <article className={styles.similarSongs}>{songHtml}</article>
    </section>
  );
}
