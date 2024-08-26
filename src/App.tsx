import { useEffect, useState } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import LoginStatus from "./Auth/LoginStatus";
import useLogout from "./hooks/auth/useLogout";
import ListPage from "./Lists/ListPage";
import { useAuth } from "./Auth/AuthContext";
import { Button, Container, Navbar, Nav } from "reactstrap";

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
		if (isLoggedIn) {
			setCurrentPage("lists");
		}
	}, [isLoggedIn, checkLoggedIn]);

	return (
		<div className="App">
			<Navbar color="dark" dark expand="md">
				<Container>
					<LoginStatus isLoggedIn={isLoggedIn} />
					<Nav className="ml-auto" navbar>
						{!isLoggedIn && (
							<Button
								color="primary"
								onClick={handleRegisterButtonClick}
								className="me-2"
							>
								Register
							</Button>
						)}
						{!isLoggedIn && (
							<Button
								color="primary"
								onClick={handleLoginButtonClick}
								className="me-2"
							>
								Login
							</Button>
						)}
						{isLoggedIn && (
							<Button
								color="danger"
								onClick={handleLogoutButtonClick}
								className="me-2"
							>
								Logout
							</Button>
						)}
						<Button color="info" onClick={handleListsButtonClick}>
							Lists
						</Button>
					</Nav>
				</Container>
			</Navbar>
			<Container className="mt-3">
				<CurrentComponent onChange={onLoginStatusChanged} />
			</Container>
		</div>
	);
};

export default App;
