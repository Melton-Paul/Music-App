import React from "react";
import styles from "./PlaySong.module.css";
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
  const [shuffledSongs, setShuffledSongs] = React.useState<song[]>([]);
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
  const [shouldRepeat, setShouldRepeat] = React.useState(false);
  const [isShuffling, setIsShuffling] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    setSongs(userDataCtx.currentPlaylist.songs);

    if (userDataCtx.currentPlaylist.songs.length === 0) {
      setSongData(userDataCtx.song);
    }

    resetPlayer();
  }, [userDataCtx.song, userDataCtx.currentPlaylist]);

  function resetPlayer() {
    setIsShuffling(false);
    setIsPlaying(true);
    setShouldRepeat(false);
    setSongNum(0);
  }

  function shuffle(boolean: boolean) {
    if (userDataCtx.currentPlaylist.songs.length <= 1) {
      return;
    }
    setIsShuffling((prev) => !prev);
    if (boolean === false) {
      setSongs(userDataCtx.currentPlaylist.songs);
      return;
    }
    const unshuffled = [...songs];
    const shuffled: song[] = [];

    for (let i = 0; i < songs.length; i++) {
      let randomNum = Math.floor(Math.random() * unshuffled.length);
      const spliced = unshuffled.splice(randomNum, randomNum + 1);
      shuffled.push(...spliced);
    }

    if (JSON.stringify(shuffled) === JSON.stringify(songs)) {
      shuffle(true);
      return;
    }

    setShuffledSongs(shuffled);
  }

  React.useEffect(() => {
    if (songs.length > 0) {
      console.log("greater than 0");
      if (isShuffling) {
        setSongData(shuffledSongs[songNum]);
      } else {
        setSongData(songs[songNum]);
      }
    }
  }, [songNum, songs, shuffledSongs, isShuffling]);

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
    if (duration === currentTime) {
      if (shouldRepeat) {
        audioRef.current!.currentTime = 0;
        audioRef.current!.play();
      } else if (songs.length > 0) {
        if (songNum + 1 < songs.length) {
          setSongNum((prev) => (prev += 1));
        } else {
          setIsPlaying(false);
        }
      } else {
        setIsPlaying(false);
      }
    }
  }

  function changeSong(direction: string) {
    if (direction === "forward") {
      if (songNum < songs.length - 1) {
        setSongNum((prev) => (prev += 1));
      } else setSongNum(0);
    } else {
      if (songNum === 0) {
        setSongData((prev) => ({
          ...prev,
          progress: 0,
        }));
        audioRef.current!.currentTime = 0;
      } else {
        setSongNum((prev) => (prev -= 1));
      }
    }
    setIsPlaying(true);
    setShouldRepeat(false);
  }

  function toggleRepeat() {
    setShouldRepeat((prev) => !prev);
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
        changeSong={changeSong}
        toggleRepeat={toggleRepeat}
        shouldRepeat={shouldRepeat}
        shuffle={shuffle}
        isShuffling={isShuffling}
      />
    </section>
  );
}
