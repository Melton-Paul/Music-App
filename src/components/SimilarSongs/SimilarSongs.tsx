import React from "react";
import styles from "./SimilarSongs.module.css";
import MediumCard from "../SongCards/MediumCard/MediumCard";

export default function SimilarSongs() {
  const [songs, setSongs] = React.useState<
    { img: string; name: string; desc: string; id: string; artist: string }[]
  >([]);

  React.useEffect(() => {
    fetch(`https://songs-34a41-default-rtdb.firebaseio.com/.json`)
      .then((res) => res.json())
      .then((data) => {
        const newArr = [];
        for (let song in data) {
          newArr.push(data[song]);
        }
        setSongs(newArr);
      });
  }, []);

  const songHtml = songs.map((song) => (
    <MediumCard
      img={song.img}
      name={song.name}
      desc={song.desc}
      id={song.id}
      artist={song.artist}
      key={song.id}
    />
  ));

  return (
    <section>
      <h2>Similar to what you listen to</h2>
      <article className={styles.similarSongs}>{songHtml}</article>
    </section>
  );
}
