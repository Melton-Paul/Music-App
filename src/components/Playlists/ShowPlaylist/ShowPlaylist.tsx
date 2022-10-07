import React from "react";
import userDataContext from "../../../store/userData-context";
import SmallCard from "../../SongCards/SmallCard/SmallCard";

const ShowPlaylist = () => {
  const userDataCtx = React.useContext(userDataContext);

  const playlistHtml = userDataCtx.currentPlaylist.songs.map((song) => (
    <SmallCard
      img={song.img}
      name={song.name}
      id={song.id}
      artist={song.artist}
      mp3={song.mp3}
      desc={song.desc}
    />
  ));

  return <div>{playlistHtml}</div>;
};

export default ShowPlaylist;
