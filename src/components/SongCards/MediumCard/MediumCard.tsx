import React from "react";
import styles from "./MediumCard.module.css";
import userDataContext from "../../../store/userData-context";
import AddToPlaylist from "../../Playlists/AddPlaylist/AddToPlaylist";
const play = require("../../../images/play-circle.png");

const MediumCard: React.FC<{
  img: string;
  name: string;
  desc: string;
  id: string;
  artist: string;
  mp3: string;
}> = (props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const userDataCtx = React.useContext(userDataContext);
  const { name, img, desc } = props;

  function handleMouseLeave() {
    setIsHovered(false);
    setIsAdding(false);
  }
  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleClick() {
    userDataCtx.playSong(props);
    userDataCtx.setPlaylist("", []);
  }

  return (
    <article
      className={styles["medium-card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.img}>
        <img className={styles.album} src={img} alt={`${img} song`} />
        {isHovered && (
          <img
            className={styles.play}
            src={play}
            alt="Play song"
            onClick={handleClick}
          />
        )}
      </div>
      <h3 className={styles.text}>{name}</h3>
      <p className={styles.desc}>{desc}</p>
      {isHovered && !isAdding && (
        <p className={styles["playlist-add"]} onClick={() => setIsAdding(true)}>
          Add to Playlist
        </p>
      )}
      {isAdding && isHovered && (
        <AddToPlaylist song={props} setIsAdding={setIsAdding} />
      )}
    </article>
  );
};

export default MediumCard;
