import axios from "axios";
import { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";
import { GetListsResponse } from "../../types";

const useGetLists = () => {
	const [getListsError, setGetListsError] = useState<string | null>(null);
	const [getListsLoading, setGetListsLoading] = useState<Boolean>(false);

	const getLists = async (getAll: boolean = true) => {
		try {
			setGetListsError(null);
			setGetListsLoading(true);
			const fullUrl = `${BASE_URL}/lists${getAll ? "" : "/my-lists"}`;

			const token = await getJwtToken();

			const response = await axios.get<GetListsResponse>(fullUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data.lists;
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setGetListsError(
					err.response?.data.message || "An unknown error occurred"
				);
			} else {
				setGetListsError("An unknown error occurred");
			}
		} finally {
			setGetListsLoading(false);
		}
	};
	return { getListsError, getListsLoading, getLists };
};

export default useGetLists;
