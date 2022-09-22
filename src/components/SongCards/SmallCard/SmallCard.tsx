import React from "react";
import styles from "./SmallCard.module.css";
import userDataContext from "../../../store/userData-context";
const play = require("../../../images/play.png");

const SmallCard: React.FC<{
  img: string;
  name: string;
  desc: string;
  id: string;
  artist: string;
  mp3: string;
}> = (props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const userDataCtx = React.useContext(userDataContext);
  const { name, img, desc, artist } = props;

  function handleMouseLeave() {
    setIsHovered(false);
  }
  function handleMouseEnter() {
    setIsHovered(true);
  }
  function handleClick() {
    userDataCtx.playSong(props);
  }

  return (
    <article
      className={styles["small-card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={styles.album} src={img} alt={`${img} song`} />
      <h3 className={styles.text}>{name}</h3>
      {isHovered && (
        <img
          className={styles.play}
          src={play}
          alt="Play song"
          onClick={handleClick}
        />
      )}
    </article>
  );
};

export default SmallCard;