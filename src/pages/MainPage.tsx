import React from "react";
import SimilarSongs from "../components/SimilarSongs/SimilarSongs";
import MostRecent from "../components/MostRecent/MostRecent";
import Playlists from "../components/Playlists/Playlists";

export default function MainPage() {
  return (
    <>
      <MostRecent />
      <SimilarSongs />
      <Playlists />
    </>
  );
}
