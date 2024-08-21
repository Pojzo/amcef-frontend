import { useState } from "react";
import { ItemCreateType, ItemUpdateType, ListType } from "../types";
import Item from "./Item";
import ItemCreate from "./ItemCreate";
import UsersModal from "../Users/UsersModal";
import { useAuth } from "../Auth/AuthContext";

export const List = ({
	list,
	onListDelete: onDelete,
	onItemDelete,
	onItemCreate,
	onItemUpdate,
	onUserAdd,
	onUserDelete,
}: {
	list: ListType;
	onListDelete: (listId: number) => void;
	onItemDelete: (listId: number, itemId: number) => void;
	onItemCreate: (item: ItemCreateType) => void;
	onItemUpdate: (item: ItemUpdateType) => void;
	onUserAdd: (listId: number, email: string) => void;
	onUserDelete: (listId: number, email: string) => void;
}) => {
	console.log(list);
	const [isExpanded, setIsExpanded] = useState(false);
	const [itemModalOpen, setItemModalOpen] = useState(false);
	const [usersModalOpen, setUsersModalOpen] = useState(false);

	const items = list.items;

	const toggleExpand = () => {
		if (itemModalOpen || usersModalOpen) return;
		setIsExpanded(!isExpanded);
	};
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete(list.listId);
	};
	const { isLoggedIn } = useAuth();

	const handleItemCreate = async (item: ItemCreateType) => {
		onItemCreate({ listId: list.listId, ...item });
	};

	const handleItemUpdate = (item: ItemUpdateType) => {
		onItemUpdate({ ...item, listId: list.listId });
	};

	const handleAddUser = (email: string) => {
		onUserAdd(list.listId, email);
	};

	const handleDeleteUser = (email: string) => {
		onUserDelete(list.listId, email);
	};

	return (
		<div className="list-container" onClick={toggleExpand}>
			<div style={{ fontWeight: "bold" }}>{list.title}</div>
			{list.isCreator && (
				<div style={{ color: "gray" }}>
					You are the owner of this list
				</div>
			)}
			{isExpanded && (
				<div style={{ marginTop: "10px" }}>
					<button
						onClick={handleDelete}
						style={{
							marginTop: "10px",
							color: isLoggedIn ? "red" : "gray",
						}}
						disabled={!isLoggedIn}
					>
						Delete list
					</button>
				</div>
			)}
			{isExpanded && (
				<button
					type="button"
					onClick={() => setItemModalOpen(true)}
					disabled={!isLoggedIn}
				>
					Create item
				</button>
			)}
			{
				<button
					type="button"
					onClick={() => setUsersModalOpen(true)}
					disabled={!isLoggedIn}
				>
					Users
				</button>
			}
			{isExpanded && (
				<div>
					{items.map((item, index) => (
						<Item
							key={index}
							item={item}
							onItemUpdate={handleItemUpdate}
							onItemDelete={() =>
								onItemDelete(list.listId, item.itemId)
							}
							btnDisabled={!isLoggedIn}
						/>
					))}
				</div>
			)}

			{itemModalOpen && (
				<ItemCreate
					isOpen={itemModalOpen}
					onClose={() => {
						!usersModalOpen && setItemModalOpen(false);
						console.log("modal closed");
					}}
					onItemCreate={handleItemCreate}
				/>
			)}
			{usersModalOpen && (
				<UsersModal
					users={list.users}
					open={usersModalOpen}
					onAddUser={handleAddUser}
					onDeleteUser={handleDeleteUser}
					onClose={() => setUsersModalOpen(false)}
				/>
			)}
		</div>
	);
};
