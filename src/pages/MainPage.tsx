import React from "react";
import SimilarSongs from "../components/SimilarSongs/SimilarSongs";
import MostRecent from "../components/MostRecent/MostRecent";
import authContext from "../store/auth-context";

export default function MainPage() {
  const authCtx = React.useContext(authContext);

  return (
    <>
      <MostRecent />
      <SimilarSongs />
    </>
  );
}
