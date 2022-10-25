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

const songContext = React.createContext({
  songs: [songIntitial],
  filteredSongs: [songIntitial],
  searchSongs: (name: string) => {},
});

export const SongContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [songs, setSongs] = React.useState<song[]>([]);
  const [filteredSongs, setFilteredSongs] = React.useState<song[]>([]);

  const searchSongs = React.useCallback(
    (name: string) => {
      const temp = songs;
      setFilteredSongs(
        temp.filter((songs) =>
          songs.name.toLowerCase().includes(name.toLowerCase())
        )
      );
    },
    [songs]
  );

  const contextValues = {
    songs,
    filteredSongs,
    searchSongs,
  };

  React.useEffect(() => {
    fetch(`https://songs-34a41-default-rtdb.firebaseio.com/.json`)
      .then((res) => res.json())
      .then((data) => {
        const newArr = [];
        for (let song in data) {
          newArr.push(data[song]);
        }
        newArr.sort((a, b) => a.name.localeCompare(b.name));
        setSongs(newArr);
      });
  }, []);

  return (
    <songContext.Provider value={contextValues}>
      {props.children}
    </songContext.Provider>
  );
};

export default songContext;
