import React from "react";
import SmallCard from "../SongCards/SmallCard/SmallCard";
import DeleteModal from "../DeleteModal/DeleteModal";

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

  function handleEnter() {
    setIsHovered(true);
  }
  function handleLeave() {
    setIsHovered(false);
  }

  function toggleDelete() {
    setAskDelete((prev) => !prev);
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div style={{ position: "relative" }}>
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
        />
      </div>
      {isHovered && !askDelete && (
        <button onClick={toggleDelete}>Remove</button>
      )}
    </div>
  );
};

export default IndvPlaylist;
