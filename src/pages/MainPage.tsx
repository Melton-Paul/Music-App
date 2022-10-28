import React from "react";
import SimilarSongs from "../components/SimilarSongs/SimilarSongs";
import SmallSection from "../components/SmallSection/SmallSection";
import Playlists from "../components/Playlists/Playlists";
import userDataContext from "../store/userData-context";
import songContext from "../store/song-context";

export default function MainPage() {
  const userDataCtx = React.useContext(userDataContext);
  const songCtx = React.useContext(songContext);

  console.log(songCtx.suggestedSongs);
  console.log(userDataCtx.recents);

  return (
    <>
      {userDataCtx.recents.length > 0 ? (
        <div style={{ marginTop: "3rem" }}>
          <SmallSection title="Your Recents" songData={userDataCtx.recents} />
        </div>
      ) : (
        <SmallSection
          title="Our Suggestions"
          songData={songCtx.suggestedSongs}
        />
      )}
      <SimilarSongs />
      {userDataCtx.recents.length > 0 && (
        <SmallSection
          title="Our Suggestions"
          songData={songCtx.suggestedSongs}
        />
      )}
      {userDataCtx.playlists.length > 0 && <Playlists />}
    </>
  );
}
