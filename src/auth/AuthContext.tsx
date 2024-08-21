// context/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import useCheckLoggedIn from "../hooks/auth/useCheckLoggedIn";
import useLogout from "../hooks/auth/useLogout";

interface AuthContextType {
	isLoggedIn: boolean;
	checkLoggedIn: () => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { isLoggedIn, checkLoggedIn } = useCheckLoggedIn();
	const { logout } = useLogout();

	useEffect(() => {
		const updateLoggedInStatus = async () => {
			await checkLoggedIn();
		};
		updateLoggedInStatus();
	}, [isLoggedIn, checkLoggedIn]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, checkLoggedIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
