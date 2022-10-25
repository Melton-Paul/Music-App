import Auth from "./components/Auth/Auth";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage";
import authContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";
import PlaySong from "./components/PlaySong/PlaySong";
import userDataContext from "./store/userData-context";
import ShowPlaylist from "./components/Playlists/ShowPlaylist/ShowPlaylist";
import Topbar from "./components/Topbar/Topbar";
import SearchPage from "./components/Search/SearchPage";

function App() {
  const authCtx = React.useContext(authContext);
  const userDataCtx = React.useContext(userDataContext);
  const [scroll, setScroll] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ref = scrollRef.current!;
    ref.addEventListener("scroll", () => {
      setScroll(ref.scrollTop);
    });
    return () =>
      ref.removeEventListener("scroll", () => {
        setScroll(ref.scrollTop);
      });
  }, []);

  const style = {
    height: userDataCtx.song.name === "" ? "100vh" : "92vh",
  };

  return (
    <>
      <main style={style}>
        <Navbar />
        <div className="content" ref={scrollRef}>
          <Topbar scroll={scroll} />
          <div className="content-lower">
            <Routes>
              {userDataCtx.currentView.songs.length > 0 && (
                <Route path="/playlist" element={<ShowPlaylist />} />
              )}
              <Route path="/" element={<MainPage />} />
              {!authCtx.isLoggedIn && (
                <Route path="/login" element={<Auth />} />
              )}
              <Route path="*" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
        </div>
      </main>
      {(userDataCtx.song.id ||
        userDataCtx.currentPlaylist.songs.length > 0) && <PlaySong />}
    </>
  );
}

export default App;
