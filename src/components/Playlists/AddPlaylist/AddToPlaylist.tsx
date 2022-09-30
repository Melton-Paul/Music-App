import React from "react";
import userDataContext from "../../../store/userData-context";
import Playlists from "../Playlists";
import styles from "./AddToPlaylist.module.css";

const AddToPlaylist: React.FC<{
  song: {
    name: string;
    id: string;
    img: string;
    desc: string;
    artist: string;
    mp3: string;
  };
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ song, setIsAdding }) => {
  const userDataCtx = React.useContext(userDataContext);
  const [playlistName, setPlaylistName] = React.useState("");

  function handleChange(e: any) {
    setPlaylistName(e.target.value);
  }

  function addPlaylist(e: any) {
    e.preventDefault();
    userDataCtx.addPlaylist(playlistName, song);
    setIsAdding(false);
  }

  return (
    <div className={styles["addplaylist-container"]}>
      <form onSubmit={addPlaylist}>
        <input
          placeholder="Playlist Name"
          onChange={handleChange}
          value={playlistName}
        />
        <button>Add Playlist</button>
      </form>
    </div>
  );
};
export default AddToPlaylist;
