import React from "react";
import songContext from "../../store/song-context";
import styles from "./Search.module.css";

export default function SearchInput() {
  const songCtx = React.useContext(songContext);
  const [value, setValue] = React.useState("");
  const { searchSongs } = songCtx;

  function handleChange(e: any) {
    setValue(e.target.value);
    searchSongs(e.target.value);
  }

  return (
    <label htmlFor="search" className={styles["search-input"]}>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        id="search"
        type="text"
        placeholder="What do you want to listen to?"
        onChange={handleChange}
        value={value}
      />
    </label>
  );
}
