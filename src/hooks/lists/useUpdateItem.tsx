import axios from "axios";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";
import { useState } from "react";
import { ItemBaseType, ItemUpdateType } from "../../types";

const useUpdateItem = () => {
	const [updateItemError, setUpdateItemError] = useState<string | null>(null);
	const [updateItemLoading, setUpdateItemLoading] = useState<boolean>(false);

	const updateItem = async (item: ItemUpdateType) => {
		try {
			setUpdateItemError(null);
			setUpdateItemLoading(true);

			const url = `${BASE_URL}/lists/${item.listId}/items/${item.itemId}`;

			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}

			const data: ItemBaseType = {
				title: item.title,
				description: item.description,
				flag: item.flag,
				deadline: item.deadline,
			};

			const response = await axios.put(url, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(response);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setUpdateItemError(err.message);
			}
			if (err instanceof Error) {
				setUpdateItemError(err.message);
			} else {
				setUpdateItemError("An error occurred");
			}
		} finally {
			setUpdateItemLoading(false);
		}
	};

	return { updateItem, updateItemError, updateItemLoading };
};

export default useUpdateItem;
