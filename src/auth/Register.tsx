import { useState } from "react";
import useRegister from "../hooks/auth/useRegister";
import { useAuth } from "./AuthContext";
import { storeJwtToken } from "../utils";
import { Form, FormGroup, Input, Button, Spinner, Alert } from "reactstrap";
import "./authStyles.css";

const Register = ({ onChange }: { onChange: () => void }) => {
	const { error, loading, register } = useRegister();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { checkLoggedIn } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		onChange();
		e.preventDefault();
		const response = await register(email, password);
		await storeJwtToken(response || "");
		await checkLoggedIn();
	};

	return (
		<div className="register-container">
			<h1 className="text-center">Register</h1>
			<Form className="register-form" onSubmit={handleSubmit}>
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
					Register
				</Button>
			</Form>
			{loading && (
				<div className="text-center mt-3">
					<Spinner color="primary" />
				</div>
			)}
			{error && (
				<Alert color="danger" className="mt-3">
					{error.includes("409") ? "User already exists" : error}
				</Alert>
			)}
		</div>
	);
};

export default Register;
