import axios from "axios";
import React, { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";
import { GetListsResponse } from "../../types";

const useGetLists = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<Boolean>(false);

	const getLists = async (getAll: boolean = true) => {
		try {
			const fullUrl = `${BASE_URL}/lists${getAll ? "" : "/my-lists"}`;

			const token = getJwtToken();
			if (!token && !getAll) {
				setError("Not logged in ");
				return;
			}

			const response = await axios.get<GetListsResponse>(fullUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data.lists;
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
	return { error, loading, getLists };
};

export default useGetLists;
