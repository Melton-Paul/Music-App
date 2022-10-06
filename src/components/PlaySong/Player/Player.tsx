import React from "react";
import styles from "./Player.module.css";
import userDataContext from "../../../store/userData-context";
import AddToPlaylist from "../../Playlists/AddPlaylist/AddToPlaylist";
import Volume from "./Volume/Volume";
const pauseIcon = require("../../../images/pause.png");
const playIcon = require("../../../images/play.png");
const forwardIcon = require("../../../images/fast-forward.png");
const backIcon = require("../../../images/rewind.png");
const shuffleIcon = require("../../../images/shuffle.png");
const repeatIcon = require("../../../images/repeat.png");

interface PlayerProps {
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
  changeSong: (direction: string) => void;
  toggleRepeat: () => void;
  shouldRepeat: boolean;
  shuffle: (boolean: boolean) => void;
  isShuffling: boolean;
}

const Player: React.FC<PlayerProps> = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songData,
  changeSong,
  toggleRepeat,
  shouldRepeat,
  shuffle,
  isShuffling,
}) => {
  const progressRef = React.useRef<HTMLDivElement>(null);
  const volumeRef = React.useRef<HTMLDivElement>(null);
  const userDataCtx = React.useContext(userDataContext);
  const [isAdding, setIsAdding] = React.useState(false);
  const [volume, setVolume] = React.useState(0.8);

  function togglePlaying() {
    setIsPlaying((prev) => !prev);
  }

  const progressStyle = {
    width: songData.progress ? `${songData.progress}%` : "0%",
  };

  const repeatStyle = {
    boxShadow: shouldRepeat ? "0px 0px 3px #ccc" : "none",
    borderRadius: "100%",
  };
  const shuffleStyle = {
    boxShadow: isShuffling ? "0px 0px 3px #ccc" : "none",
    borderRadius: "100%",
  };

  function checkWidth(e: any) {
    let width;
    if (e.target.id === "progress" || e.target.id === "progress1") {
      width = progressRef.current!.clientWidth;
    } else {
      width = volumeRef.current!.clientWidth;
    }
    const offset = e.nativeEvent.offsetX;
    const progress = offset / width;
    if (e.target.id === "progress" || e.target.id === "progress1") {
      audioRef.current!.currentTime = progress * songData.length!;
    } else {
      audioRef.current!.volume = progress;
      setVolume(audioRef.current!.volume);
    }
  }

  function shufflePlaylist() {
    shuffle(!isShuffling);
  }

  return (
    <article className={styles.player}>
      <div className={styles["songInfo-container"]}>
        <img
          onClick={() => {
            userDataCtx.addPlaylist(songData.name, songData);
          }}
          className={styles.album}
          src={songData.img}
          alt={`${songData.name}'s song`}
        />
        <div className={styles.text}>
          <h3 className={styles.name}>{songData.name}</h3>
          <h3 className={styles.artist}>{songData.artist}</h3>
          {isAdding ? (
            <AddToPlaylist song={songData} setIsAdding={setIsAdding} />
          ) : (
            <button onClick={() => setIsAdding((prev) => !prev)}>
              Add To Playlist
            </button>
          )}
        </div>
      </div>
      <div className={styles["control-container"]}>
        <div className={styles["control-group"]}>
          <div className={styles.controls}>
            <>
              <img
                className={styles.play}
                src={repeatIcon}
                alt="Repeat current song"
                onClick={toggleRepeat}
                style={repeatStyle}
              />
              <img
                className={styles.play}
                src={backIcon}
                alt="Go to previous song"
                onClick={() => {
                  changeSong("back");
                }}
              />
            </>
            <div className={styles.control}>
              <img
                onClick={togglePlaying}
                className={styles.play}
                src={isPlaying ? pauseIcon : playIcon}
                alt={isPlaying ? "Pause Song" : "Play song"}
              />
            </div>
            <>
              <img
                className={styles.play}
                src={forwardIcon}
                alt="Go to next song"
                onClick={() => {
                  changeSong("forward");
                }}
              />
              <img
                className={styles.play}
                src={shuffleIcon}
                alt="Shuffle playlist"
                onClick={shufflePlaylist}
                style={shuffleStyle}
              />
            </>
          </div>
          <div
            className={styles["progress_bar-outer"]}
            onClick={checkWidth}
            ref={progressRef}
            id="progress"
          >
            <div
              className={styles["progress_bar-inner"]}
              style={progressStyle}
              id="progress1"
            ></div>
          </div>
        </div>
        <Volume
          checkWidth={checkWidth}
          audioRef={audioRef}
          volume={volume}
          volumeRef={volumeRef}
        />
      </div>
    </article>
  );
};
export default Player;
