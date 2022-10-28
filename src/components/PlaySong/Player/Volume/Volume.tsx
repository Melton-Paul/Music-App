import React from "react";
import ToolTip from "../../../ToolTip/ToolTip";
import styles from "./Volume.module.css";

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
      <ToolTip content={isMuted ? "Unmute" : "Mute"}>
        <i
          className={
            isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"
          }
          aria-label="Change the volume"
          onClick={handleMute}
        ></i>
      </ToolTip>
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
