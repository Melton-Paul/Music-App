import React from "react";

interface song {
  name: string;
  id: string;
  img: string;
  desc: string;
  artist: string;
}

const songIntitial: song = {
  name: "",
  id: "",
  img: "",
  desc: "",
  artist: "",
};

const userDataContext = React.createContext({
  recents: [songIntitial],
  playlists: [{}],
  playSong: (obj: song) => {},
  song: songIntitial,
});

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<song[]>([]);
  const [playlists, setPlaylists] = React.useState<
    { name: string; songs: string[] }[]
  >([]);
  const [song, setSong] = React.useState(songIntitial);

  function playSong(obj: song) {
    setSong(obj);
    addRecentlyPlayed(obj);
  }

  function addRecentlyPlayed(obj: song) {
    if (recentlyPlayed.some((song) => song.id === obj.id)) {
      return;
    }
    if (recentlyPlayed.length >= 6) {
      setRecentlyPlayed((prev) => {
        const arr = prev;
        arr.shift();
        return [...arr, obj];
      });
    } else {
      setRecentlyPlayed((prev) => [...prev, obj]);
    }
  }
  console.log(recentlyPlayed);

  function addPlaylist(name: string, songId: string) {
    if (playlists.find((playlist) => playlist.name === name)) {
      setPlaylists((prev) => {
        return prev.map((playlist) => {
          return playlist.name === name
            ? { ...playlist, songs: [...playlist.songs, songId] }
            : playlist;
        });
      });
    } else {
      setPlaylists((prev) => {
        return [...prev, { name: name, songs: [songId] }];
      });
    }
  }

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
