import axios from "axios";
import { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";

const useCreateList = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<Boolean>(false);

	const createList = async (title: string) => {
		try {
			const fullUrl = `${BASE_URL}/lists`;

			const token = await getJwtToken();

			if (!token) {
				setError("Not logged in ");
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
				setError(
					err.response?.data.message || "An unknown error occurred"
				);
			} else {
				setError("An unknown error occurred");
			}
		}
	};
	return { error, loading, createList };
};

export default useCreateList;
