import React from "react";

const authContext = React.createContext({
  userId: "",
  logIn: (userId: string, token: string, exptime: string) => {},
  isDeveloper: false,
  logOut: () => {},
  isLoggedIn: false,
});

function calcTime(expTime: string) {
  const currentTime = new Date().getTime();
  const adjustedTime = new Date(expTime).getTime();

  return adjustedTime - currentTime;
}

function retrieveToken() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const expiration = localStorage.getItem("expiration");
  let remainingTime = 0;
  if (expiration) {
    remainingTime = calcTime(expiration!);
  }

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");

    return null;
  }

  return { remainingTime, userId, token };
}
let logoutTimer: any;

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const data = retrieveToken();
  let intitalUser = null;
  let intitalToken = null;
  if (data) {
    intitalToken = data.token;
    intitalUser = data.userId;
  }
  const [userId, setUserId] = React.useState(intitalUser || "");
  const [token, setToken] = React.useState(intitalToken);
  const [isDeveloper, setIsDeveloper] = React.useState(false);
  const isLoggedIn = !!token;

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserId("");
    setToken("");
    clearTimeout(logoutTimer);
  }

  function logIn(userId: string, token: string, exptime: string) {
    setUserId(userId);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiration", exptime);
    const timeTilExpire = calcTime(exptime);
    logoutTimer = setTimeout(logOut, timeTilExpire);
  }
  React.useEffect(() => {
    if (userId === "NGYVNsxPYzOZSpXVYDRYXgRMUt63") {
      setIsDeveloper(true);
    } else {
      setIsDeveloper(false);
    }
  }, [userId]);

  React.useEffect(() => {
    if (data?.remainingTime) {
      logoutTimer = setTimeout(logOut, data.remainingTime);
    }
  }, [data?.remainingTime]);

  return (
    <authContext.Provider
      value={{ userId, logIn, logOut, isLoggedIn, isDeveloper }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
