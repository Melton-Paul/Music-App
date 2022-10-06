import React from "react";
import styles from "./Volume.module.css";
const volumeIcon = require("../../../../images/high-volume.png");
const muteIcon = require("../../../../images/mute.png");

const Volume: React.FC<{
  checkWidth: (e: any) => void;
  volumeRef: React.RefObject<HTMLDivElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  volume: number;
}> = ({ checkWidth, volumeRef, volume, audioRef }) => {
  const volumeStyle = {
    width: volume ? `${volume * 100}%` : "100%",
  };
  const [isMuted, setIsMuted] = React.useState(false);
  const [prevVolume, setPrevVolume] = React.useState(volume);

  function handleMute() {
    setIsMuted((prev) => !prev);
  }

  React.useEffect(() => {
    setPrevVolume(volume);
  }, [volume]);

  React.useEffect(() => {
    isMuted
      ? (audioRef.current!.volume = 0)
      : (audioRef.current!.volume = prevVolume);
  }, [isMuted, audioRef, prevVolume]);

  return (
    <section className={styles["volume-changer"]}>
      <img
        src={isMuted ? muteIcon : volumeIcon}
        alt="Change the volume"
        onClick={handleMute}
      />
      {!isMuted && (
        <div
          className={styles["progress_bar-outer"]}
          onClick={checkWidth}
          ref={volumeRef}
        >
          <div
            className={styles["progress_bar-inner"]}
            style={volumeStyle}
          ></div>
        </div>
      )}
    </section>
  );
};
export default Volume;