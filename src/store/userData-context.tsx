import React from "react";

const userDataContext = React.createContext({
  recents: [""],
  playlists: [{}],
  addRecentlyPlayed: (songId: string) => {},
});

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<string[]>([]);
  const [playlists, setPlaylists] = React.useState<
    { name: string; songs: string[] }[]
  >([]);

  function addRecentlyPlayed(songId: string) {
    if (recentlyPlayed.length >= 6) {
      setRecentlyPlayed((prev) => {
        prev.shift();
        return [...prev, songId];
      });
    } else {
      setRecentlyPlayed((prev) => [...prev, songId]);
    }
  }

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
    addRecentlyPlayed,
    addPlaylist,
  };

  return (
    <userDataContext.Provider value={contextValues}>
      {props.children}
    </userDataContext.Provider>
  );
};

export default userDataContext;
