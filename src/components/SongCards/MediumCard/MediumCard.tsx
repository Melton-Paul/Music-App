import React from "react";
import styles from "./MediumCard.module.css";
const play = require("../../../images/play.png");

const MediumCard: React.FC<{ img: string; name: string; desc: string }> = ({
  name,
  img,
  desc,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  function handleMouseLeave() {
    setIsHovered(false);
  }
  function handleMouseEnter() {
    setIsHovered(true);
  }

  return (
    <article
      className={styles["medium-card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.img}>
        <img className={styles.album} src={img} alt={`${img} song`} />
        {isHovered && (
          <img className={styles.play} src={play} alt="Play song" />
        )}
      </div>
      <h3 className={styles.text}>{name}</h3>
      <p className={styles.desc}>{desc}</p>
    </article>
  );
};

export default MediumCard;
