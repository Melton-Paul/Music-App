import React from "react";
import userDataContext from "../../../store/userData-context";
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
  const [isTouched, setIsTouched] = React.useState(false);

  function handleChange(e: any) {
    setPlaylistName(e.target.value);
    setIsTouched(true);
  }
  let error;

  const playlistValid = playlistName.length > 0 && playlistName.length < 21;

  if (playlistName.length < 1) error = "Please Input a name";
  if (playlistName.length > 21) error = "Name can't be greater than 20 char.";

  function addPlaylist(e: any) {
    e.preventDefault();
    if (!playlistValid) {
      return;
    }
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
          min="1"
          max="20"
        />
        {!playlistValid && isTouched && <p>{error}</p>}
        <button onClick={addPlaylist}>Add Playlist</button>
        <button onClick={() => setIsAdding(false)}>Cancel</button>
      </form>
    </div>
  );
};
export default AddToPlaylist;
