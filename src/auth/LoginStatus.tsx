const LoginStatus = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	return (
		<div className="login-status">
			<p style={{ color: isLoggedIn ? "green" : "red" }}>
				Login status: {isLoggedIn ? "logged in" : "not logged in"}
			</p>
		</div>
	);
};

export default LoginStatus;
