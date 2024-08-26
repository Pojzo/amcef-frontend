import { useState } from "react";
import useLogin from "../hooks/auth/useLogin";
import { storeJwtToken } from "../utils";
import { Form, FormGroup, Input, Button, Spinner, Alert } from "reactstrap";
import "./authStyles.css";

const Login = ({ onChange }: { onChange: () => void }) => {
	const { error, loading, login } = useLogin();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await login(email, password);
		storeJwtToken(response || "");
		onChange();
	};

	return (
		<div className="login-container">
			<h1 className="text-center mb-4">Login</h1>
			<Form className="login-form" onSubmit={handleSubmit}>
				<FormGroup>
					<Input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="mb-3"
					/>
				</FormGroup>
				<FormGroup>
					<Input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className="mb-3"
					/>
				</FormGroup>
				<Button color="primary" type="submit" block>
					Login
				</Button>
			</Form>
			{loading && (
				<div className="text-center mt-3">
					<Spinner color="primary" />
				</div>
			)}
			{error && (
				<Alert color="danger" className="mt-3">
					{error}
				</Alert>
			)}
		</div>
	);
};

export default Login;
