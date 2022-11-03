import React from "react";
import styles from "./PasswordChange.module.css";
import authContext from "../../store/auth-context";

const PasswordChange: React.FC<{ cancelFunction: () => void }> = ({
  cancelFunction,
}) => {
  const authCtx = React.useContext(authContext);
  const [newPass, setNewPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState({
    pass: "",
    isTouched: false,
  });
  const [statusMessage, setStatusMessage] = React.useState(
    authCtx.isDeveloper
      ? "This feature is not available to the developer account"
      : ""
  );

  const passwordIsValid = newPass.length >= 6;
  const passwordConfirmIsValid =
    confirmPass.pass.length >= 6 && confirmPass.pass === newPass;

  function handleChange(e: any) {
    setNewPass(e.target.value);
  }
  function confirmPassChange(e: any) {
    setConfirmPass(() => ({ pass: e.target.value, isTouched: true }));
  }

  function reset() {
    setNewPass("");
    setConfirmPass({
      pass: "",
      isTouched: false,
    });
  }

  function submitHandler(e: any) {
    e.preventDefault();
    if (!passwordIsValid || !passwordConfirmIsValid || authCtx.isDeveloper) {
      return;
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAasBNs63AV_6TlQIsEbmOQZa_ffeo9qn0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          password: newPass,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then(() => {
        reset();
        setStatusMessage("Password Successfully Changed");
      })
      .catch((err) => {
        setStatusMessage(err.toISOString());
      });
  }

  return (
    <>
      <h2>Change Password</h2>
      <form className={styles.password}>
        <input
          type="password"
          max="25"
          min="7"
          placeholder="Password"
          value={newPass}
          onChange={handleChange}
          name="newPass"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass.pass}
          onChange={confirmPassChange}
        />
        {confirmPass.isTouched && newPass !== confirmPass.pass && (
          <p className={styles.warning}>Passwords must match</p>
        )}
        <div className={styles["button-container"]}>
          <button
            className={styles.submit}
            onClick={submitHandler}
            disabled={authCtx.isDeveloper}
          >
            Change Password
          </button>
          <button className={styles.submit} onClick={cancelFunction}>
            Cancel
          </button>
        </div>
      </form>
      {statusMessage && <p className={styles.warning}>{statusMessage}</p>}
    </>
  );
};
export default PasswordChange;
