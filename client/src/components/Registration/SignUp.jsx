import React from "react";

export default function SignUp() {
  const [data, setData] = React.useState({
    username: " ",
    email: " ",
    address: "",
    password: "",
    status: " ",
    phonenumber: "",
  });
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value });
  async function submit() {
    try {
      const body = data;
      console.log(body);
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      <div style={{ marginTop: "40px" }}>
        <form onSubmit={submit}>
          <fieldset style={{ width: "30%", margin: "auto" }}>
            <legend>Sign Up</legend>
            <input
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={onChange("username")}
              placeholder="username"
              required
            />
            <br />
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChange("email")}
              placeholder="Email"
              required
            />
            <br />
            <br />

            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={onChange("address")}
              placeholder="Address"
              required
            />
            <br />
            <br />
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={onChange("password")}
              placeholder="Password"
              required
            />
            <br />
            <br />

            <input
              type="phonenumber"
              id="phonenumber"
              name="phonenumber"
              value={data.phonenumber}
              onChange={onChange("phonenumber")}
              placeholder="phone number"
              required
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </fieldset>
        </form>
      </div>
    </div>
  );
}
