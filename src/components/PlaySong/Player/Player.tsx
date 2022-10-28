import React from "react";
import styles from "./Player.module.css";
import userDataContext from "../../../store/userData-context";
import AddToPlaylist from "../../Playlists/AddPlaylist/AddToPlaylist";
import Volume from "./Volume/Volume";
import ToolTip from "../../ToolTip/ToolTip";

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
  const [volume, setVolume] = React.useState(
    JSON.parse(localStorage.getItem("volume") || "0.5")
  );

  React.useEffect(() => {
    localStorage.setItem("volume", JSON.stringify(volume));
  }, [volume]);

  function togglePlaying() {
    setIsPlaying((prev) => !prev);
  }

  const progressStyle = {
    width: songData.progress ? `${songData.progress}%` : "0%",
  };

  const repeatStyle = {
    color: shouldRepeat ? "lightblue" : "grey",
  };
  const shuffleStyle = {
    color: isShuffling ? "lightblue" : "grey",
    cursor:
      userDataCtx.currentPlaylist.songs.length === 0
        ? "not-allowed"
        : "pointer",
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
    setIsPlaying(true);
  }

  function convertTime(sec: number) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
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
            <ToolTip content="Repeat Song">
              <i
                className="fa-solid fa-repeat"
                aria-label="Repeat current song"
                onClick={toggleRepeat}
                style={repeatStyle}
              ></i>
            </ToolTip>
            <ToolTip content="Previous Song">
              <i
                className="fa-solid fa-backward"
                aria-label="Go to previous song"
                onClick={() => {
                  changeSong("back");
                }}
              ></i>
            </ToolTip>
            <ToolTip content={isPlaying ? "Pause Song" : "Play Song"}>
              <i
                className={
                  isPlaying
                    ? "fa-solid fa-circle-pause"
                    : "fa-solid fa-circle-play"
                }
                style={{ fontSize: "4rem" }}
                onClick={togglePlaying}
                aria-label={isPlaying ? "Pause Song" : "Play song"}
              ></i>
            </ToolTip>
            <ToolTip content="Next Song">
              <i
                className="fa-solid fa-forward"
                aria-label="Go to next song"
                onClick={() => {
                  changeSong("forward");
                }}
              ></i>
            </ToolTip>
            <ToolTip content="Shuffle Songs">
              <i
                className="fa-solid fa-shuffle"
                aria-label="Shuffle playlist"
                onClick={shufflePlaylist}
                style={shuffleStyle}
              ></i>
            </ToolTip>
          </div>
          <div className={styles.progress_bar}>
            <p className={styles["progress_bar-time"]}>
              {convertTime(audioRef.current?.currentTime || 0)}
            </p>
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
            <p className={styles["progress_bar-time"]}>
              {convertTime(songData.length! || 0)}
            </p>
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
