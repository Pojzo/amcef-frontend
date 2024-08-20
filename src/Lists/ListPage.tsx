import { useEffect, useState } from "react";
import useGetLists from "../hooks/lists/useGetLists";
import { ListType } from "../types";
import "./listStyles.css";
import { List } from "./List";
import CreateListForm from "./CreateListForm";
import useDeleteList from "../hooks/lists/useDeleteList";
import useCreateItem from "../hooks/lists/useCreateItem";
import useCreateList from "../hooks/lists/useCreateList";
import useDeleteItem from "../hooks/lists/useDeleteItem";

const ListPage = () => {
	const [lists, setLists] = useState<ListType[]>([]);
	const { error, loading, getLists } = useGetLists();

	const handleGetLists = async () => {
		const response = await getLists();
		console.log(response);
		setLists(response || []);
	};

	const { listDeleteLoading, listDeleteError, deleteList } = useDeleteList();

	const { createItem } = useCreateItem();
	const { createList } = useCreateList();
	const { deleteItem } = useDeleteItem();

	const handleListDelete = async (id: number) => {
		await deleteList(id);
		await handleGetLists();
	};

	const handleCreateList = async (title: string) => {
		await createList(title);
		await handleGetLists();
	};

	const handleCreateItem = async (item: any) => {
		await createItem(item.listId, item);
		await handleGetLists();
	};

	const handleDeleteItem = async (listId: number, itemId: number) => {
		console.log("deleted item");
		await deleteItem(listId, itemId);
		await handleGetLists();
	};

	useEffect(() => {
		handleGetLists();
	}, []);

	return (
		<div className="lists-page">
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			{listDeleteLoading && <p style={{ color: "blue" }}>Deleting...</p>}
			{listDeleteError && (
				<p style={{ color: "red" }}>{listDeleteError}</p>
			)}
			{lists.map((list, index) => (
				<List
					key={index}
					list={list}
					onDelete={handleListDelete}
					onItemDelete={handleDeleteItem}
					onSubmit={handleCreateItem}
				/>
			))}
			<CreateListForm onCreate={handleCreateList} />
		</div>
	);
};

export default ListPage;
