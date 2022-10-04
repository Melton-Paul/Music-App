import React from "react";
import SimilarSongs from "../SimilarSongs/SimilarSongs";
import SmallCard from "../SongCards/SmallCard/SmallCard";

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
}> = ({ cover, songs, name }) => {
  console.log(songs);
  return (
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
  );
};

export default IndvPlaylist;
