import axios from "axios";
import { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";
import { GetListsResponse } from "../../types";

const useDeleteList = () => {
	const [deleteListError, setDeleteListError] = useState<string | null>(null);
	const [deleteListLoading, setDeleteListLoading] = useState<Boolean>(false);
	const deleteList = async (listId: number) => {
		try {
			setDeleteListLoading(true);
			setDeleteListError(null);
			const fullUrl = `${BASE_URL}/lists/${listId}`;

			const token = await getJwtToken();

			if (!token) {
				setDeleteListError("Not logged in ");
				return;
			}
			const response = await axios.delete(fullUrl, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setDeleteListError(
					err.response?.data.message || "An unknown error occurred"
				);
			} else {
				setDeleteListError("An unknown error occurred");
			}
		} finally {
			setDeleteListLoading(false);
		}
	};
	return {
		deleteListError,
		deleteListLoading,
		deleteList,
	};
};

export default useDeleteList;
