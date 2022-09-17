import Auth from "./components/Auth/Auth";
import MostRecent from "./components/MostRecent/MostRecent";
import Navbar from "./components/Navbar/Navbar";
import SimilarSongs from "./components/SimilarSongs/SimilarSongs";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Auth />
        <MostRecent />
        <SimilarSongs />
      </main>
    </div>
  );
}

export default App;
