import React from "react";
import styles from "./PlaySong.module.scss";
const playIcon = require("../../images/play.png");
const pauseIcon = require("../../images/pause.png");
const sampleAudio = require("../../songs/sample.mp3");

export default function PlaySong() {
  return (
    <section className={styles.container}>
      <div className={styles["controls-container"]}>
        {/* <div className={styles.controls}>
          <img
            onClick={togglePlaying}
            className={styles.play}
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "Pause Song" : "Play song"}
          />
        </div>
        <div className={styles.progress_outer}>
          <span>0:00</span>
          <div className={styles["progress_bar-outer"]}>
            <div className={styles["progress_bar-inner"]}></div>
          </div>
          <span>3:00</span>
        </div>  */}
        <audio controls>
          <source src="https://www.computerhope.com/jargon/m/example.mp3" />
        </audio>
      </div>
    </section>
  );
}
