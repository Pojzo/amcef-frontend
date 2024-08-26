import { useState } from "react";
import { ItemCreateType, ItemUpdateType, ListType } from "../types";
import ItemCreate from "./ItemCreate";
import UsersModal from "../Users/UsersModal";
import { useAuth } from "../Auth/AuthContext";
import { Button, Card, CardBody, CardTitle, Collapse } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./Item";
import { FlatListComponent } from "react-native";

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
		<Card className="list-container mb-3" style={{ width: 400 }}>
			<CardBody onClick={toggleExpand} style={{ cursor: "pointer" }}>
				<CardTitle tag="h5">{list.title}</CardTitle>
				{list.isCreator && (
					<div style={{ color: "gray" }}>
						You are the owner of this list
					</div>
				)}

				{!list.isCreator && (
					<div style={{ fontStyle: "italic" }}>
						Creator: &nbsp;
						{list.creatorEmail}
					</div>
				)}
			</CardBody>
			<Collapse isOpen={isExpanded}>
				<CardBody>
					<Button
						color="danger"
						onClick={handleDelete}
						disabled={!isLoggedIn}
						className="mb-3 me-2"
					>
						Delete list
					</Button>
					<Button
						color="primary"
						onClick={() => setItemModalOpen(true)}
						disabled={!isLoggedIn}
						className="mb-3 me-2"
					>
						Create item
					</Button>
					<Button
						color="secondary"
						className="mb-3 me-2"
						onClick={() => setUsersModalOpen(true)}
						disabled={!isLoggedIn}
					>
						Users
					</Button>

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
				</CardBody>
			</Collapse>

			{itemModalOpen && (
				<ItemCreate
					isOpen={itemModalOpen}
					onClose={() => setItemModalOpen(false)}
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
		</Card>
	);
};
