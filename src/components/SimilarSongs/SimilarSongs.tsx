import React from "react";
import styles from "./SimilarSongs.module.css";
import MediumCard from "../SongCards/MediumCard/MediumCard";
import songContext from "../../store/song-context";
import userDataContext from "../../store/userData-context";
import { gsap, Power4 } from "gsap";
import { Link } from "react-router-dom";

export default function SimilarSongs() {
  const songCtx = React.useContext(songContext);
  const userDataCtx = React.useContext(userDataContext);
  const [width, setWidth] = React.useState(getWidth());
  const containerRef = React.useRef(null);

  function getWidth() {
    return window.innerWidth;
  }

  React.useEffect(() => {
    function handleResize() {
      setWidth(getWidth());
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from("article", {
        y: 3000,
        duration: 1.8,
        stagger: 0.08,
        ease: Power4.easeOut,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const temp = [...songCtx.songs];
  const songArr =
    userDataCtx.recents.length > 0
      ? width > 1399
        ? songCtx.songs
        : temp.splice(0, 8)
      : songCtx.songs;

  const songHtml = songArr.map((song) => (
    <MediumCard
      img={song.img}
      name={song.name}
      desc={song.desc}
      id={song.id}
      artist={song.artist}
      key={song.id}
      mp3={song.mp3}
    />
  ));
  const style = {
    height:
      userDataCtx.recents.length > 0
        ? width > 1399
          ? "630px"
          : "auto"
        : "auto",
  };

  return (
    <section ref={containerRef} className={styles["similar-page"]}>
      <div className={styles["similar-header"]}>
        <h2 className="titleh2">
          {userDataCtx.recents.length > 0
            ? "Similar to what you listen to"
            : "Our Catalog"}
        </h2>
        {userDataCtx.recents.length > 0 && (
          <Link to="search" className={styles.link}>
            See All
          </Link>
        )}
      </div>
      <article className={styles.similarSongs} style={style}>
        {songHtml}
      </article>
    </section>
  );
}
