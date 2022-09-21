import React from "react";
import styles from "./MediumCard.module.css";
import userDataContext from "../../../store/userData-context";
const play = require("../../../images/play.png");

const MediumCard: React.FC<{
  img: string;
  name: string;
  desc: string;
  id: string;
  artist: string;
}> = (props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const userDataCtx = React.useContext(userDataContext);
  const { name, img, desc } = props;

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
      className={styles["medium-card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.img}>
        <img className={styles.album} src={img} alt={`${img} song`} />
        {isHovered && (
          <img
            className={styles.play}
            src={play}
            alt="Play song"
            onClick={handleClick}
          />
        )}
      </div>
      <h3 className={styles.text}>{name}</h3>
      <p className={styles.desc}>{desc}</p>
    </article>
  );
};

export default MediumCard;
