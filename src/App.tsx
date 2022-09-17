import Auth from "./components/Auth/Auth";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage";
import authContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";

function App() {
  const authCtx = React.useContext(authContext);
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
    </div>
  );
}

export default App;
