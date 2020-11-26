import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../config/api";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      api
        .post("/api/user/register", {
          name,
          email,
          password,
        })
        .then((resp) => {
          setLoading(false);
          history.push("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    },
    [email, history, name, password]
  );

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
        />
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter e-mail"
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter password"
        />
        <button type="submit">{loading ? "Saving ..." : "Save"}</button>
      </form>

      <Link to="/">Login</Link>
    </>
  );
}

export default SignUp;
