import React from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import styles from "./Account.module.css";
import userDataContext from "../../store/userData-context";
import authContext from "../../store/auth-context";
import PasswordChange from "./PasswordChange";
import { useNavigate } from "react-router";

export default function Account() {
  const userDataCtx = React.useContext(userDataContext);
  const authCtx = React.useContext(authContext);
  const navigate = useNavigate();
  const [askConfirm, setAskConfirm] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [clicked, setClicked] = React.useState("");

  function deleteFunction() {
    clicked === "reset" ? resetData() : deleteAccount();
    setAskConfirm(false);
    navigate("/");
  }

  function resetData() {
    userDataCtx.resetData();
  }
  function handleClick(name: string) {
    setAskConfirm(true);
    setClicked(name);
  }
  function deleteAccount() {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAasBNs63AV_6TlQIsEbmOQZa_ffeo9qn0",
      {
        method: "POST",
        body: JSON.stringify({ idToken: localStorage.getItem("token") }),
      }
    );
    authCtx.logOut();
  }

  return (
    <section className={styles["account-module"]}>
      {askConfirm && (
        <DeleteModal
          deleteFunction={deleteFunction}
          cancelFunction={() => setAskConfirm(false)}
        />
      )}
      {!changePassword ? (
        <>
          <h2>Your Account</h2>
          <ul className={styles["account-list"]}>
            <li onClick={() => setChangePassword(true)}>Change Password</li>
            <li onClick={() => handleClick("delete")}>Delete Account</li>
            <li onClick={() => handleClick("reset")}>Reset Data</li>
          </ul>
        </>
      ) : (
        <PasswordChange cancelFunction={() => setChangePassword(false)} />
      )}
    </section>
  );
}
