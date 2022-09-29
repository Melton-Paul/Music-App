import React from "react";
import styles from "./Player.module.css";
const pauseIcon = require("../../../images/pause.png");
const playIcon = require("../../../images/play.png");

const Player: React.FC<{
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  songData: {
    img: string;
    name: string;
    artist: string;
    desc: string;
    id: string;
    mp3: string;
  };
}> = ({ isPlaying, setIsPlaying, audioRef, songData }) => {
  function togglePlaying() {
    setIsPlaying((prev) => !prev);
  }

  return (
    <article className={styles.player}>
      <div className={styles["songInfo-container"]}>
        <img
          className={styles.album}
          src={songData.img}
          alt={`${songData.name}'s song`}
        />
        <div className={styles.text}>
          <h3 className={styles.name}>{songData.name}</h3>
          <h3 className={styles.artist}>{songData.artist}</h3>
        </div>
      </div>
      <div className={styles.control}>
        <img
          onClick={togglePlaying}
          className={styles.play}
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? "Pause Song" : "Play song"}
        />
      </div>
    </article>
  );
};
export default Player;
