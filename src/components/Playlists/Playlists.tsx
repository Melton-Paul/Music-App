import React from "react";
import userDataContext from "../../store/userData-context";
import IndvPlaylist from "./IndvPlaylist";

export default function Playlists() {
  const userDataCtx = React.useContext(userDataContext);

  console.log(userDataCtx.playlists);

  const playlistHtml = userDataCtx.playlists.map((playlist) => {
    return (
      <IndvPlaylist
        name={playlist.name}
        cover={playlist.songs[0].img}
        songs={playlist.songs}
      />
    );
  });

  return (
    <div>
      <h2>Playlists</h2>
      {playlistHtml}
    </div>
  );
}
