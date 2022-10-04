import React from "react";
import styles from "./PlaySong.module.scss";
import userDataContext from "../../store/userData-context";
import Player from "./Player/Player";

interface song {
  img: string;
  name: string;
  artist: string;
  desc: string;
  id: string;
  mp3: string;
}

export default function PlaySong() {
  const userDataCtx = React.useContext(userDataContext);
  const [songs, setSongs] = React.useState<song[]>([]);
  const [songData, setSongData] = React.useState({
    img: "",
    name: "",
    artist: "",
    desc: "",
    id: "",
    mp3: "",
  });
  const [songNum, setSongNum] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (userDataCtx.currentPlaylist) {
      setSongs(userDataCtx.currentPlaylist);
    }

    if (songs.length === 0) {
      setSongData(userDataCtx.song);
      setIsPlaying(true);
    }

    if (songs.length > 0) {
      setSongData(songs[songNum]);
    }
  }, [userDataCtx.song, userDataCtx.currentPlaylist, songs, songNum]);

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
    if (
      audioRef.current!.duration === audioRef.current!.currentTime &&
      songNum + 1 < songs.length
    ) {
      setSongNum((prev) => (prev += 1));
    }
  }
  console.log(songs.length);
  console.log(songNum);

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
