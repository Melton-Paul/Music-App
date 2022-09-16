import React from "react";
import styles from "./SmallCard.module.css";
const play = require("../../../images/play.png");

const SmallCard: React.FC<{ img: string; name: string }> = ({ name, img }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseLeave() {
    setIsHovered(false);
  }
  function handleMouseEnter() {
    setIsHovered(true);
  }

  return (
    <article
      className={styles["small-card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img className={styles.album} src={img} alt={`${img} song`} />
      <h3 className={styles.text}>{name}</h3>
      {isHovered && <img className={styles.play} src={play} alt="Play song" />}
    </article>
  );
};

export default SmallCard;
