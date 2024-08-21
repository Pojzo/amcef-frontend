import axios from "axios";
import { BASE_URL } from "../../config";
import { getJwtToken } from "../../utils";
import { useState } from "react";
import { ItemBaseType, ItemCreateType } from "../../types";

const useCreateItem = () => {
	const [createItemError, setCreateItemError] = useState<string | null>(null);
	const [createItemLoading, setCreateItemLoading] = useState<boolean>(false);

	const createItem = async (item: ItemCreateType) => {
		try {
			setCreateItemError(null);
			setCreateItemLoading(true);

			const data: ItemBaseType = {
				title: item.title,
				description: item.description,
				flag: item.flag,
				deadline: item.deadline,
			};

			const url = `${BASE_URL}/lists/${item.listId}/items`;

			const token = await getJwtToken();
			if (!token) {
				throw new Error("Token not found");
			}
			await axios.post(url, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
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
