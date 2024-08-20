import axios from "axios";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";
import { useState } from "react";
import { CreateItemType } from "../../types";

const useCreateItem = () => {
	const [createItemError, setCreateItemError] = useState<string | null>(null);
	const [createItemLoading, setCreateItemLoading] = useState<boolean>(false);

	const createItem = async (listId: number, item: CreateItemType) => {
		try {
			setCreateItemError(null);
			setCreateItemLoading(true);

			const data = { ...item, listId };
			const fullUrl = `${BASE_URL}/lists/${listId}/items`;
			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			const response = await axios.post(fullUrl, data, {
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

	return { createItem, createItemError, createItemLoading };
};

export default useCreateItem;
