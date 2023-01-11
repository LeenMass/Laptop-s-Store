import React from "react";

const RESPONSE_STATUS = {
  FAIL: false,
  SUCCESS: true,
};
export default function LogIn() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const logIn = async () => {
    try {
      const body = user;
      const result = await fetch("http://localhost:4000/LogIn", {
        method: "POST",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const bodyPar = await result.json();
      console.log(bodyPar, "bodyPar");
      if (bodyPar?.status === RESPONSE_STATUS.SUCCESS) {
        console.log("good user and pass");
        window.location.href = "/";
      } else {
        console.log("bad input. try again and show message");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const onChange = (key) => (e) => setUser({ ...user, [key]: e.target.value });

  return (
    <div>
      <form style={{ width: "290px ", margin: "auto", padding: "40px" }}>
        <fieldset>
          <legend>Log In</legend>

          <input
            type="text"
            placeholder="username"
            name="username"
            value={user.username}
            onChange={onChange("username")}
          />

          <br />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={onChange("password")}
          />
          <br />
          <br />
          <input type="button" value="LogIn" onClick={logIn} />
          <p>
            Dont have an account yet ? <a href="./SignUp">SignUp</a>
          </p>
        </fieldset>
      </form>
    </div>
  );
}
