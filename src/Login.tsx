import { useState } from "react";
import './styles.css';
import useLogin from "./hooks/useLogin";

const Login = () => {
    const { error, loading, login } = useLogin();
    const [email, setEmail] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await login(email, password);
        setToken(response || "");
    }
    return (
        <div className="register">
            <h1>login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                <button type="submit">login</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {token && <p>{token}</p>}
        </div>
    );
}

export default Login;