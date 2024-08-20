import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { getJwtToken } from "../../utils";

const useCheckLoggedIn = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const checkLoggedIn = async (): Promise<void> => {
		const fullUrl = `${BASE_URL}/auth/is-logged-in`;
		const token = await getJwtToken();
		if (!token) {
			setIsLoggedIn(false);
		}
		try {
			const response = await axios.get(fullUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.data.isLoggedIn === true) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		} catch (err: unknown) {
			setIsLoggedIn(false);
		}
	};
	return { checkLoggedIn, isLoggedIn };
};

export default useCheckLoggedIn;
