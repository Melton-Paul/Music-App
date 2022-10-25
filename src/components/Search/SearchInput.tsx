import React from "react";
import songContext from "../../store/song-context";
import styles from "./Search.module.css";
const searchIcon = require("../../images/search.png");

export default function SearchInput() {
  const songCtx = React.useContext(songContext);
  const [value, setValue] = React.useState("");
  const { searchSongs } = songCtx;

  function handleChange(e: any) {
    setValue(e.target.value);
    searchSongs(e.target.value);
  }

  // React.useEffect(()=>{
  //   searchSongs(value)
  // }, [value, searchSongs])

  return (
    <div className={styles["search-input"]}>
      <img src={searchIcon} alt="search button" />
      <input
        type="text"
        placeholder="What do you want to listen to?"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
