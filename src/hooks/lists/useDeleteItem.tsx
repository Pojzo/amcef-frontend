import axios from "axios";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";
import { useState } from "react";

const useDeleteItem = () => {
	const [deleteItemError, setDeleteItemError] = useState<string | null>(null);
	const [deleteItemLoading, setDeleteItemLoading] = useState<boolean>(false);

	const deleteItem = async (listId: number, itemId: number) => {
		try {
			setDeleteItemError(null);
			setDeleteItemLoading(true);

			const fullUrl = `${BASE_URL}/lists/${listId}/items/${itemId}`;
			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			const response = await axios.delete(fullUrl, {
				headers: { Authorization: `Bearer ${token}` },
			});

		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setDeleteItemError(err.message);
			}
			if (err instanceof Error) {
				setDeleteItemError(err.message);
			} else {
				setDeleteItemError("An error occurred");
			}
		} finally {
			setDeleteItemLoading(false);
		}
	};

	return { deleteItem, deleteItemError, deleteItemLoading };
};

export default useDeleteItem;
