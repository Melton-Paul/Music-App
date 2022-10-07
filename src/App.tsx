import Auth from "./components/Auth/Auth";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage";
import authContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";
import PlaySong from "./components/PlaySong/PlaySong";
import userDataContext from "./store/userData-context";

function App() {
  const authCtx = React.useContext(authContext);
  const userDataCtx = React.useContext(userDataContext);
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {!authCtx.isLoggedIn && <Route path="/login" element={<Auth />} />}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </main>
      {(userDataCtx.song.id ||
        userDataCtx.currentPlaylist.songs.length > 0) && <PlaySong />}
    </div>
  );
}

export default App;
