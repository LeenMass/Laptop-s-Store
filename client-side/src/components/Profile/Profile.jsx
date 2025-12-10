import React from "react";

export default function Profile() {
  const [userName, setUserName] = React.useState({});
  let user_id = document.cookie.slice(7);
  const userObj = async () => {
    try {
      const res = await fetch(`http://localhost:4000/users/${user_id}`);
      const resj = await res.json();

      setUserName(resj);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    userObj()
  }, []);
  return (
    <div>
      {userName.username}
      <input type="text" value={userName.email} />
    </div>
  );
}
