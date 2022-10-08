import authContext from "./auth-context";
import React from "react";

interface song {
  name: string;
  id: string;
  img: string;
  desc: string;
  artist: string;
  mp3: string;
  queue?: song[];
}

const songIntitial: song = {
  name: "",
  id: "",
  img: "",
  desc: "",
  artist: "",
  mp3: "",
};

const userDataContext = React.createContext({
  recents: [songIntitial],
  playlists: [{ name: "", songs: [songIntitial] }],
  playSong: (obj: song) => {},
  setPlaylist: (mame: string, songs: song[]) => {},
  setView: (mame: string, songs: song[]) => {},
  currentPlaylist: { name: "", songs: [songIntitial] },
  currentView: { name: "", songs: [songIntitial] },
  song: songIntitial,
  addPlaylist: (name: string, song: song) => {},
  removePlaylist: (name: string) => {},
});

let firstRender = true;

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<song[]>([]);

  const [playlists, setPlaylists] = React.useState<
    {
      name: string;
      songs: song[];
    }[]
  >([]);
  const [song, setSong] = React.useState(songIntitial);
  const [currentPlaylist, setCurrentPlaylist] = React.useState<{
    name: string;
    songs: song[];
  }>({ name: "", songs: [] });

  const [currentView, setCurrentView] = React.useState<{
    name: string;
    songs: song[];
  }>({ name: "", songs: [] });
  const authCtx = React.useContext(authContext);

  function playSong(obj: song) {
    if (obj.queue) {
      setSong(obj.queue[0]);
      addRecentlyPlayed(obj.queue[0]);
    } else {
      setSong(obj);
      addRecentlyPlayed(obj);
    }
  }

  function addRecentlyPlayed(obj: song) {
    if (recentlyPlayed.some((song) => song.id === obj.id)) {
      setRecentlyPlayed((prev) => prev.filter((songs) => songs.id !== obj.id));
      setRecentlyPlayed((prev) => [obj, ...prev]);
      return;
    }
    if (recentlyPlayed.length >= 6) {
      setRecentlyPlayed((prev) => {
        const arr = prev;
        arr.shift();
        return [...arr, obj];
      });
    } else {
      setRecentlyPlayed((prev) => [obj, ...prev]);
    }
  }

  function setPlaylist(name: string, songs: song[]) {
    setCurrentPlaylist({ name, songs });
  }
  function setView(name: string, songs: song[]) {
    setCurrentView({ name, songs });
  }

  function addPlaylist(name: string, song: song) {
    if (playlists.some((playlist) => playlist.name === name)) {
      setPlaylists((prev) => {
        return prev.map((playlist) => {
          return playlist.name === name
            ? playlist.songs.includes(song)
              ? playlist
              : { ...playlist, songs: [...playlist.songs, song] }
            : playlist;
        });
      });
    } else {
      setPlaylists((prev) => {
        return [...prev, { name: name, songs: [song] }];
      });
    }
  }

  function removePlaylist(name: string) {
    setPlaylists((prev) => {
      return prev.filter((playlist) => playlist.name !== name);
    });
  }

  React.useEffect(() => {
    if (authCtx.isLoggedIn || firstRender) {
      return;
    }

    setSong(songIntitial);
    setRecentlyPlayed([]);
  }, [authCtx.isLoggedIn]);

  React.useEffect(() => {
    if (!authCtx.userId || firstRender || recentlyPlayed.length === 0) {
      return;
    }

    fetch(
      `https://musicapp-ae1d2-default-rtdb.firebaseio.com/${authCtx.userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ recents: recentlyPlayed, playlists: playlists }),
      }
    );
  }, [authCtx.userId, recentlyPlayed, playlists]);

  React.useEffect(() => {
    if (!authCtx.userId || !firstRender) {
      return;
    }
    firstRender = false;

    fetch(
      `https://musicapp-ae1d2-default-rtdb.firebaseio.com/${authCtx.userId}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (let song in data.recents) {
          if (
            recentlyPlayed.some((songs) => songs.id === data.recents[song].id)
          ) {
            continue;
          }
          setRecentlyPlayed((prev) => [...prev, data.recents[song]]);
        }
        for (let playlist in data.playlists) {
          if (
            playlists.some(
              (list) => list.name === data.playlists[playlist].name
            )
          ) {
            continue;
          }
          setPlaylists((prev) => [...prev, data.playlists[playlist]]);
        }
      });
  }, [authCtx.userId, recentlyPlayed, playlists]);

  const contextValues = {
    recents: recentlyPlayed,
    setPlaylist,
    setView,
    playlists,
    addPlaylist,
    removePlaylist,
    currentPlaylist,
    currentView,
    playSong,
    song,
  };

  return (
    <userDataContext.Provider value={contextValues}>
      {props.children}
    </userDataContext.Provider>
  );
};

export default userDataContext;
