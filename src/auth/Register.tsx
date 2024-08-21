import { useState } from "react";
import useRegister from "../hooks/auth/useRegister";

import "./authStyles.css";
import { useAuth } from "./AuthContext";

const Register = ({ onChange }: { onChange: () => void }) => {
	const { error, loading, register } = useRegister();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { checkLoggedIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		onChange();
		e.preventDefault();
		await register(email, password);
		await checkLoggedIn();
	};
	return (
		<div className="register">
			<h1>Register</h1>
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
				<button type="submit">Register</button>
			</form>
			{loading && <p>Loading...</p>}
			{error && (
				<p style={{ color: "red" }}>
					{error.includes("409") ? "User already exists" : error}
				</p>
			)}
		</div>
	);
};

export default Register;
