import React from "react";
import authContext from "../../store/auth-context";
import { useNavigate } from "react-router";
import styles from "./Auth.module.css";
import ToolTip from "../ToolTip/ToolTip";
const loadingGif = require("../../images/loading1.gif")

export default function Auth() {
  const [userDetails, setUserDetails] = React.useState({
    user: "",
    pass: "",
  });
  const [confirmPass, setConfirmPass] = React.useState({
    pass: "",
    isTouched: false,
  });
  const [isLogin, setIsLogin] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)
  const authCtx = React.useContext(authContext);
  const navigate = useNavigate();

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function confirmPassChange(e: any) {
    setConfirmPass((prev) => ({ ...prev, pass: e.target.value }));
  }

  function handleBlur() {
    setConfirmPass((prev) => ({ ...prev, isTouched: true }));
  }

  function handleSubmit() {
    if (!isLogin && userDetails.pass !== confirmPass.pass) {
      setConfirmPass((prev) => ({ ...prev, isTouched: true }));
      return;
    }

    let apiCall;
    if (isLogin) {
      apiCall =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAasBNs63AV_6TlQIsEbmOQZa_ffeo9qn0";
    } else {
      apiCall =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAasBNs63AV_6TlQIsEbmOQZa_ffeo9qn0";
    }
    setIsLoading(true)

    fetch(apiCall, {
      method: "POST",
      body: JSON.stringify({
        email: userDetails.user,
        password: userDetails.pass,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Your request cannot be completed at this time");
        }
        return res.json();
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.logIn(data.localId, data.idToken, expirationTime.toISOString());
        navigate("/");
        setIsLoading(false)
      })
      .catch((err) => {
        setError("We could not log you in with this information");
        setIsLoading(false)
        console.log(err);
      });
  }

  function autoLog() {
    setUserDetails({
      user: "test@hotmail.com",
      pass: "test1234",
    });
  }

  return (
    <div className={styles.auth}>
      <h2>{isLogin ? "Welcome Back" : "Sign Up"}</h2>
      <form className={styles["auth-form"]}>
        <input
          type="email"
          placeholder="Email"
          max="50"
          min="3"
          value={userDetails.user}
          onChange={handleChange}
          name="user"
        />
        <input
          type="password"
          max="25"
          min="7"
          placeholder="Password"
          value={userDetails.pass}
          onChange={handleChange}
          name="pass"
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass.pass}
            onChange={confirmPassChange}
            onBlur={handleBlur}
          />
        )}
        {!isLogin &&
          confirmPass.isTouched &&
          userDetails.pass !== confirmPass.pass && (
            <p className={styles.warning}>Passwords must match</p>
          )}
      </form>
      <div className={styles["button-container"]}>
        {isLoading ? <img src={loadingGif} alt="loading" className={styles.loading}/> :
      <>
          <button className={styles.submit} onClick={handleSubmit}>
          {isLogin ? "Log In" : "Create Account"}
        </button>
        {isLogin && (
          <div className={styles["autofill-container"]}>
            <button onClick={autoLog}>Autofill Test Account Info</button>
            <ToolTip content="Test log in information for ease-of use testing purposes">
              <i className="fa-solid fa-circle-question"></i>
            </ToolTip>
          </div>
        )}
        </>
      }
      </div>
      {error && isLogin && <p className={styles.warning}>{error}</p>}
      <p className={styles.toggle} onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? "Create New Account" : "Log in with existing account"}
      </p>
    </div>
  );
}
