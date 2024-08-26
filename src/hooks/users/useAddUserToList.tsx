import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";

const useAddUserToList = () => {
	const [addUserToListError, setAddUserToListError] = useState<string | null>(
		null
	);
	const [addUserToListLoading, setAddUserToListLoading] =
		useState<boolean>(false);

	const addUserToList = async (listId: number, email: string) => {
		try {
			setAddUserToListError(null);
			setAddUserToListLoading(true);

			const url = `${BASE_URL}/lists/${listId}/users/`;
			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			await axios.post(
				url,
				{ email },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setAddUserToListError(err.message);
			}
			if (err instanceof Error) {
				setAddUserToListError(err.message);
			} else {
				setAddUserToListError("An error occurred");
			}
		} finally {
			setAddUserToListLoading(false);
		}
	};
	return { addUserToList, addUserToListError, addUserToListLoading };
};

export default useAddUserToList;
