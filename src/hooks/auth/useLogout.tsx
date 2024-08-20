import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { deleteJwtToken, getJwtToken } from "../../utils";

const useLogout = () => {
	const logout = async (): Promise<void> => {
		try {
			const token = await getJwtToken();
			if (!token) {
				throw new Error("No token stored");
			}

			const fullUrl = `${BASE_URL}/auth/logout`;
			await axios.post(
				fullUrl,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			deleteJwtToken();
		} catch (err: unknown) {}
	};
	return { logout };
};

export default useLogout;
