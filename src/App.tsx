import { createContext, useEffect, useState } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import LoginStatus from "./Auth/LoginStatus";
import useCheckLoggedIn from "./hooks/auth/useCheckLoggedIn";
import useLogout from "./hooks/auth/useLogout";
import ListPage from "./Lists/ListPage";
import { useAuth } from "./Auth/AuthContext";

const elementMap = {
	login: Login,
	register: Register,
	lists: ListPage,
};

const App = () => {
	const [currentPage, setCurrentPage] =
		useState<keyof typeof elementMap>("login");

	const CurrentComponent = elementMap[currentPage];

	const handleRegisterButtonClick = () => {
		setCurrentPage("register");
	};

	const handleLoginButtonClick = () => {
		setCurrentPage("login");
	};
	const { isLoggedIn, checkLoggedIn } = useAuth();

	const onLoginStatusChanged = async () => {
		await checkLoggedIn();
	};

	const handleListsButtonClick = () => {
		setCurrentPage("lists");
	};

	const { logout } = useLogout();
	const handleLogoutButtonClick = async () => {
		await logout();
		await checkLoggedIn();
	};

	useEffect(() => {
		checkLoggedIn();
	}, [isLoggedIn, checkLoggedIn]);

	return (
		<div className="App">
			<LoginStatus isLoggedIn={isLoggedIn} />
			<div className="nav-buttons">
				{!isLoggedIn && (
					<button
						className="nav-button"
						type="button"
						onClick={handleRegisterButtonClick}
					>
						<p style={{ color: "white" }}>Go to register</p>
					</button>
				)}
				{!isLoggedIn && (
					<button
						className="nav-button"
						type="button"
						onClick={handleLoginButtonClick}
					>
						<p style={{ color: "white" }}>Go to login</p>
					</button>
				)}
				{isLoggedIn && (
					<button
						className="nav-button"
						style={{ backgroundColor: "red" }}
						type="button"
						onClick={handleLogoutButtonClick}
					>
						<p style={{ color: "white" }}>Logout</p>
					</button>
				)}
				<button
					className="nav-button"
					type="button"
					onClick={handleListsButtonClick}
				>
					<p style={{ color: "white" }}>Lists</p>
				</button>
			</div>
			<CurrentComponent onChange={onLoginStatusChanged} />
		</div>
	);
};

export default App;
