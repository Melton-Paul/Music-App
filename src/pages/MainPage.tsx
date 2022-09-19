import React from "react";
import SimilarSongs from "../components/SimilarSongs/SimilarSongs";
import MostRecent from "../components/MostRecent/MostRecent";
import authContext from "../store/auth-context";

export default function MainPage() {
  const authCtx = React.useContext(authContext);

  React.useEffect(() => {
    if (!authCtx.userId) return;
    fetch(
      `https://musicapp-ae1d2-default-rtdb.firebaseio.com/${authCtx.userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ [authCtx.userId]: "Test" }),
      }
    );
  }, [authCtx.userId]);

  return (
    <>
      <MostRecent />
      <SimilarSongs />
    </>
  );
}
