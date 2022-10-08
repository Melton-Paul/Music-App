import React from "react";
import SimilarSongs from "../components/SimilarSongs/SimilarSongs";
import MostRecent from "../components/MostRecent/MostRecent";
import Playlists from "../components/Playlists/Playlists";
import userDataContext from "../store/userData-context";

export default function MainPage() {
  const userDataCtx = React.useContext(userDataContext);
  return (
    <>
      <MostRecent />
      <SimilarSongs />
      {userDataCtx.playlists.length > 0 && <Playlists />}
    </>
  );
}
