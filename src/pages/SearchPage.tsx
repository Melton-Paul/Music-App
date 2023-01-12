import React from "react";
import songContext from "../store/song-context";
import MediumCard from "../components/SongCards/MediumCard/MediumCard";
import styles from "./SearchPage.module.css";
import SearchInput from "../components/Search/SearchInput";

export default function SearchPage() {
  const songCtx = React.useContext(songContext);
  const songs =
    songCtx.filteredSongs.length > 0 ? songCtx.filteredSongs : songCtx.songs;

  const songHtml = songs.map((song) => (
    <MediumCard
      img={song.img}
      id={song.id}
      name={song.name}
      desc={song.desc}
      artist={song.artist}
      mp3={song.mp3}
      key={song.id}
    />
  ));

  return (
    <>
      <div className={styles["search-header"]}>
        <h2>Search Songs</h2>
      </div>
      <div className={styles["search-wrapper"]}>
        <SearchInput />
      </div>
      <div className={styles["songs-container"]}>{songHtml}</div>
    </>
  );
}
