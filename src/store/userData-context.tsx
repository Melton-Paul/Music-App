import React from "react";

const userDataContext = React.createContext({
  recents: [
    {
      name: "",
      id: "",
      img: "",
      desc: "",
      artist: "",
    },
  ],
  playlists: [{}],
  playSong: (obj: {
    name: string;
    id: string;
    img: string;
    desc: string;
    artist: string;
  }) => {},
  song: {
    name: "",
    id: "",
    img: "",
    desc: "",
    artist: "",
  },
});

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<
    {
      name: string;
      id: string;
      img: string;
      desc: string;
      artist: string;
    }[]
  >([]);
  const [playlists, setPlaylists] = React.useState<
    { name: string; songs: string[] }[]
  >([]);
  const [song, setSong] = React.useState({
    name: "",
    id: "",
    img: "",
    desc: "",
    artist: "",
  });

  function playSong(obj: {
    name: string;
    id: string;
    img: string;
    desc: string;
    artist: string;
  }) {
    setSong(obj);
    addRecentlyPlayed(obj);
  }

  function addRecentlyPlayed(obj: {
    name: string;
    id: string;
    img: string;
    desc: string;
    artist: string;
  }) {
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
