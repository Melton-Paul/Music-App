import React from "react";
import styles from "./PlaySong.module.scss";
import userDataContext from "../../store/userData-context";
import Player from "./Player/Player";

export default function PlaySong() {
  const userDataCtx = React.useContext(userDataContext);
  const [songs, setSongs] = React.useState();
  const [songData, setSongData] = React.useState({
    img: "",
    name: "",
    artist: "",
    desc: "",
    id: "",
    mp3: "",
  });

  const [isPlaying, setIsPlaying] = React.useState(true);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    setSongData(userDataCtx.song);

    setIsPlaying(true);
  }, [userDataCtx.song]);

  React.useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
  }, [isPlaying]);

  function onPlaying() {
    const duration = audioRef.current?.duration;
    const currentTime = audioRef.current?.currentTime;

    if (duration && currentTime) {
      setSongData((prev) => ({
        ...prev,
        progress: ((currentTime / duration) * 100).toFixed(2),
        length: duration,
      }));
    }
  }

  return (
    <section className={styles.container}>
      <audio
        hidden
        controls
        src={songData.mp3}
        autoPlay
        ref={audioRef}
        onTimeUpdate={onPlaying}
      ></audio>
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songData={songData}
      />
    </section>
  );
}
