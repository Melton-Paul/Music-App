import React from "react";
import styles from "./MostRecent.module.css";
import SmallCard from "../SongCards/SmallCard/SmallCard";
import userDataContext from "../../store/userData-context";

export default function MostRecent() {
  const userDataCtx = React.useContext(userDataContext);

  const recentHtml = userDataCtx.recents.map((song) => (
    <SmallCard
      img={song.img}
      name={song.name}
      id={song.id}
      artist={song.artist}
      desc={song.desc}
      key={song.id}
      mp3={song.mp3}
    />
  ));

  return (
    <section>
      <h2>Your Recents</h2>
      <article className={styles.mostrecent}>{recentHtml}</article>
    </section>
  );
}
