import React from "react";
import SmallCard from "../SongCards/SmallCard/SmallCard";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useNavigate } from "react-router";
import userDataContext from "../../store/userData-context";
import styles from "./IndvPlaylist.module.css";

const IndvPlaylist: React.FC<{
  cover: string;
  songs: {
    name: string;
    id: string;
    img: string;
    desc: string;
    artist: string;
    mp3: string;
  }[];
  name: string;
  removePlaylist: () => void;
}> = ({ cover, songs, name, removePlaylist }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [askDelete, setAskDelete] = React.useState(false);
  const navigate = useNavigate();
  const userDataCtx = React.useContext(userDataContext);
  let timer: any;

  function handleEnter() {
    timer = setTimeout(() => {
      setIsHovered(true);
    }, 400);
  }
  function handleLeave() {
    clearTimeout(timer);
    setIsHovered(false);
  }

  function toggleDelete() {
    setAskDelete((prev) => !prev);
  }
  function handleClick() {
    userDataCtx.setView(name, songs);
    navigate("/playlist");
  }

  return (
    <div
      className={styles.playlist}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        style={{ position: "relative" }}
        onClick={() => {
          if (askDelete) return;
          handleClick();
        }}
      >
        {askDelete && (
          <DeleteModal
            deleteFunction={removePlaylist}
            cancelFunction={toggleDelete}
          />
        )}
        <SmallCard
          img={cover}
          name={name}
          id={name}
          key={name}
          desc={""}
          artist={""}
          mp3={""}
          queue={songs}
          shouldNotPlay={true}
        />
      </div>
      {isHovered && !askDelete && (
        <button className={styles["delete-button"]} onClick={toggleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default IndvPlaylist;
