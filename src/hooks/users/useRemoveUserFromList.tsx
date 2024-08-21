import axios from "axios";
import React from "react";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";

const useRemoveUserFromList = () => {
	const [removeUserFromListError, setRemoveUserFromListError] =
		React.useState<string | null>(null);
	const [removeUserFromListLoading, setRemoveUserFromListLoading] =
		React.useState<boolean>(false);

	const removeUserFromList = async (listId: number, email: string) => {
		try {
			setRemoveUserFromListError(null);
			setRemoveUserFromListLoading(true);
			const url = `${BASE_URL}/lists/${listId}/users/${email}`;
			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			console.log("removing user from list", listId, email);
			await axios.delete(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setRemoveUserFromListError(err.message);
			}
			if (err instanceof Error) {
				setRemoveUserFromListError(err.message);
			} else {
				setRemoveUserFromListError("An error occurred");
			}
		} finally {
			setRemoveUserFromListLoading(false);
		}
	};
	return {
		removeUserFromList,
		removeUserFromListError,
		removeUserFromListLoading,
	};
};
export default useRemoveUserFromList;
