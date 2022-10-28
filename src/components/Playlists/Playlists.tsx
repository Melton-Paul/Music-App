import React from "react";
import userDataContext from "../../store/userData-context";
import IndvPlaylist from "./IndvPlaylist";

export default function Playlists() {
  const userDataCtx = React.useContext(userDataContext);

  const playlistHtml = userDataCtx.playlists.map((playlist) => {
    return (
      <IndvPlaylist
        name={playlist.name}
        cover={playlist.songs[0].img}
        songs={playlist.songs}
        key={playlist.name}
        removePlaylist={userDataCtx.removePlaylist.bind(null, playlist.name)}
      />
    );
  });

  return (
    <section>
      <h2>Playlists</h2>
      {playlistHtml}
    </section>
  );
}
