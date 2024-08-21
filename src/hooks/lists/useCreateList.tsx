import axios from "axios";
import { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";

const useCreateList = () => {
	const [createListError, setCreateListError] = useState<string | null>(null);
	const [createListLoading, setCreateListLoading] = useState<Boolean>(false);

	const createList = async (title: string) => {
		try {
			const fullUrl = `${BASE_URL}/lists`;

			const token = await getJwtToken();

			if (!token) {
				setCreateListError("Not logged in ");
				return;
			}
			await axios.post(
				fullUrl,
				{ title },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setCreateListError(
					err.response?.data.message || "An unknown error occurred"
				);
			} else {
				setCreateListError("An unknown error occurred");
			}
		}
	};
	return { createListError, createListLoading, createList };
};

export default useCreateList;
