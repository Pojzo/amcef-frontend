import { useEffect, useState } from "react";
import useGetLists from "../hooks/lists/useGetLists";
import {
	ItemBaseType,
	ItemCreateType,
	ItemUpdateType,
	ListType,
} from "../types";
import "./listStyles.css";
import { List } from "./List";
import CreateListForm from "./CreateListForm";
import useDeleteList from "../hooks/lists/useDeleteList";
import useCreateItem from "../hooks/lists/useCreateItem";
import useCreateList from "../hooks/lists/useCreateList";
import useDeleteItem from "../hooks/lists/useDeleteItem";
import useUpdateItem from "../hooks/lists/useUpdateItem";
import useAddUserToList from "../hooks/users/useAddUserToList";
import useRemoveUserFromList from "../hooks/users/useRemoveUserFromList";

const ListPage = () => {
	const [lists, setLists] = useState<ListType[]>([]);
	const { getListsError, getListsLoading, getLists } = useGetLists();

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<string | null>("");
	const [success, setSuccess] = useState<string | null>("");

	const handleGetLists = async () => {
		const response = await getLists();
		console.log(response);
		setLists(response || []);
	};

	const { deleteListError, deleteListLoading, deleteList } = useDeleteList();
	const { createItemError, createItemLoading, createItem } = useCreateItem();
	const { createListError, createListLoading, createList } = useCreateList();
	const { deleteItemError, deleteItemLoading, deleteItem } = useDeleteItem();
	const { updateItemError, updateItemLoading, updateItem } = useUpdateItem();
	const { addUserToListError, addUserToListLoading, addUserToList } =
		useAddUserToList();
	const {
		removeUserFromList,
		// removeUserFromListError,
		// removeUserFromListLoading,
	} = useRemoveUserFromList();

	const handleListDelete = async (id: number) => {
		setError(deleteListError);
		setLoading(deleteListLoading ? "Deleting list" : null);
		if (!error) {
			setSuccess("List deleted successfully");
		}
		await deleteList(id);
		await handleGetLists();
	};

	const handleCreateList = async (title: string) => {
		setError(createListError);
		setLoading(createListLoading ? "Creating list" : null);
		if (!error) {
			setSuccess("List created successfully");
		}
		await createList(title);
		await handleGetLists();
	};

	const handleCreateItem = async (item: ItemCreateType) => {
		setError(createItemError);
		setLoading(createItemLoading ? "Creating item" : null);
		if (!error) {
			setSuccess("Item created successfully");
		}
		await createItem(item);
		await handleGetLists();
	};

	const handleUpdateItem = async (item: ItemUpdateType) => {
		setError(createItemError);
		setLoading(createItemLoading ? "Updating item" : null);
		if (!error) {
			setSuccess("Item updated successfully");
		}
		await updateItem(item);
		await handleGetLists();
	};

	const handleDeleteItem = async (listId: number, itemId: number) => {
		setError(deleteItemError);
		setLoading(deleteItemLoading ? "Deleting item" : null);
		if (!error) {
			setSuccess("Item deleted successfully");
		}

		await deleteItem(listId, itemId);
		await handleGetLists();
	};

	const handleAddUserToList = async (listId: number, email: string) => {
		await addUserToList(listId, email);
		await handleGetLists();
	};

	const handleDeleteUserFromList = async (listId: number, email: string) => {
		await removeUserFromList(listId, email);
		await handleGetLists();
	};
	useEffect(() => {
		handleGetLists();
	}, []);

	useEffect(() => {
		if (error) {
			setSuccess(null);
		}
	}, [error]);

	return (
		<div className="lists-page">
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{lists.map((list, index) => (
				<List
					key={index}
					list={list}
					onListDelete={handleListDelete}
					onItemCreate={handleCreateItem}
					onItemDelete={handleDeleteItem}
					onItemUpdate={handleUpdateItem}
					onUserAdd={handleAddUserToList}
					onUserDelete={handleDeleteUserFromList}
				/>
			))}
			<CreateListForm onCreate={handleCreateList} />
			{success && <p style={{ color: "green" }}>{success}</p>}
		</div>
	);
};

export default ListPage;
