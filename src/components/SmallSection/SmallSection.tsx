import React from "react";
import styles from "./SmallSection.module.css";
import SmallCard from "../SongCards/SmallCard/SmallCard";

interface song {
  name: string;
  id: string;
  img: string;
  desc: string;
  artist: string;
  mp3: string;
  queue?: song[];
}
const SmallSection: React.FC<{ title: string; songData: song[] }> = ({
  title,
  songData,
}) => {
  const songHtml = songData.map((song) => (
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
      <h2>{title}</h2>
      <article className={styles.mostrecent}>{songHtml}</article>
    </section>
  );
};

export default SmallSection;
