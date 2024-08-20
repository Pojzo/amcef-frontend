import { useState } from "react";
import useLogin from "../hooks/auth/useLogin";

import "./authStyles.css";
import { storeJwtToken } from "../utils";

const Login = ({ onChange }: { onChange: () => void }) => {
  const { error, loading, login } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(email, password);
    storeJwtToken(response || "");
    setToken(response || "");
    onChange();
  };
  return (
    <div className="register">
      <h1>login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">login</button>
      </form>
      {loading && <p style={{ color: "blue" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p style={{ color: "green" }}>Successfully logged in</p>}
    </div>
  );
};

export default Login;
