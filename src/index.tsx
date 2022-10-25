import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { SongContextProvider } from "./store/song-context";
import { AuthContextProvider } from "./store/auth-context";
import { UserDataContextProvider } from "./store/userData-context";
import "@fortawesome/fontawesome-free/css/all.min.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserDataContextProvider>
        <SongContextProvider>
          <App />
        </SongContextProvider>
      </UserDataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
