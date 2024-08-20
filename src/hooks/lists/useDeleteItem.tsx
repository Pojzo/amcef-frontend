import axios from "axios";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";
import { useState } from "react";

const useDeleteItem = () => {
	const [createItemError, setCreateItemError] = useState<string | null>(null);
	const [createItemLoading, setCreateItemLoading] = useState<boolean>(false);

	const deleteItem = async (listId: number, itemId: number) => {
		try {
			setCreateItemError(null);
			setCreateItemLoading(true);

			const fullUrl = `${BASE_URL}/lists/${listId}/items/${itemId}`;
			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			const response = await axios.delete(fullUrl, {
				headers: { Authorization: `Bearer ${token}` },
			});

			console.log(response);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setCreateItemError(err.message);
			}
			if (err instanceof Error) {
				setCreateItemError(err.message);
			} else {
				setCreateItemError("An error occurred");
			}
		} finally {
			setCreateItemLoading(false);
		}
	};

	return { deleteItem, createItemError, createItemLoading };
};

export default useDeleteItem;
