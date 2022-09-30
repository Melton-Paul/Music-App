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
    progress?: number;
    length?: number;
  };
}> = ({ isPlaying, setIsPlaying, audioRef, songData }) => {
  const clickRef = React.useRef<HTMLDivElement>(null);

  function togglePlaying() {
    setIsPlaying((prev) => !prev);
  }

  const progressStyle = {
    width: songData.progress ? `${songData.progress}%` : "0%",
  };

  function checkWidth(e: any) {
    const width = clickRef.current!.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const progress = offset / width;

    audioRef.current!.currentTime = progress * songData.length!;
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
      <div
        className={styles["progress_bar-outer"]}
        onClick={checkWidth}
        ref={clickRef}
      >
        <div
          className={styles["progress_bar-inner"]}
          style={progressStyle}
        ></div>
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
