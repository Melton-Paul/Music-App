import React from "react";
import styles from "./PlaySong.module.scss";
import userDataContext from "../../store/userData-context";
import SmallCard from "../SongCards/SmallCard/SmallCard";

export default function PlaySong() {
  const userDataCtx = React.useContext(userDataContext);
  const [songData, setSongData] = React.useState({
    img: "",
    name: "",
    artist: "",
    desc: "",
    id: "",
  });

  // React.useEffect(() => {
  //   if (!userDataCtx.song.id) {
  //     return;
  //   }
  //   fetch(
  //     `https://songs-34a41-default-rtdb.firebaseio.com/${userDataCtx.song.id}.json`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setSongData(data));
  // }, [userDataCtx.song.id]);

  React.useEffect(() => {
    setSongData(userDataCtx.song);
  }, [userDataCtx.song]);

  console.log(songData);

  return (
    <section className={styles.container}>
      <SmallCard
        img={songData.img}
        name={songData.name}
        id={songData.id}
        desc={songData.desc}
        artist={songData.artist}
      />
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
        <audio controls></audio>
      </div>
    </section>
  );
}
