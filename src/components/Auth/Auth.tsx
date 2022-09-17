import React from "react";

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

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
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
  }

  return (
    <div>
      {isLogin ? "Welcome Back" : "Sign Up"}
      <form>
        <input
          type="email"
          placeholder="Email"
          max="50"
          min="3"
          value={userDetails.user}
          onChange={handleChange}
        />
        <input
          type="password"
          max="25"
          min="7"
          placeholder="Password"
          value={userDetails.pass}
          onChange={handleChange}
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
        {confirmPass.isTouched && userDetails.pass !== confirmPass.pass && (
          <p>Passwords must match</p>
        )}
      </form>
      <button onClick={handleSubmit}>{isLogin ? "Log In" : "Sign Up"}</button>
      <p onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? "Create New Account" : "Log in with existing account"}
      </p>
    </div>
  );
}
