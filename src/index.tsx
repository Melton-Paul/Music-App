import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { UserDataContextProvider } from "./store/userData-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserDataContextProvider>
        <App />
      </UserDataContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
