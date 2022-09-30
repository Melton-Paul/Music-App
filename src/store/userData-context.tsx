import authContext from "./auth-context";
import React from "react";

interface song {
  name: string;
  id: string;
  img: string;
  desc: string;
  artist: string;
  mp3: string;
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
  song: songIntitial,
  addPlaylist: (name: string, song: song) => {},
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
  const [curentPlaylist, setCurrentPlaylist] = React.useState<song[]>([]);
  const [song, setSong] = React.useState(songIntitial);
  const authCtx = React.useContext(authContext);

  function playSong(obj: song) {
    setSong(obj);
    addRecentlyPlayed(obj);
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

  function addPlaylist(name: string, song: song) {
    if (playlists.find((playlist) => playlist.name === name)) {
      setPlaylists((prev) => {
        return prev.map((playlist) => {
          return playlist.name === name
            ? { ...playlist, songs: [...playlist.songs, song] }
            : playlist;
        });
      });
    } else {
      setPlaylists((prev) => {
        return [...prev, { name: name, songs: [song] }];
      });
    }
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
      { method: "PUT", body: JSON.stringify(recentlyPlayed) }
    );
  }, [authCtx.userId, recentlyPlayed]);

  React.useEffect(() => {
    if (!authCtx.userId) {
      return;
    }
    firstRender = false;

    fetch(
      `https://musicapp-ae1d2-default-rtdb.firebaseio.com/${authCtx.userId}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        for (let song in data) {
          if (recentlyPlayed.some((songs) => songs.id === data[song].id)) {
            continue;
          }
          setRecentlyPlayed((prev) => [...prev, data[song]]);
        }
      });
  }, [authCtx.userId, recentlyPlayed]);

  const contextValues = {
    recents: recentlyPlayed,
    playlists,
    addPlaylist,
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
