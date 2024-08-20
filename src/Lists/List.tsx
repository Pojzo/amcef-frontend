import { useState } from "react";
import { CreateItemType, ItemType, ListType } from "../types";
import Item from "./Item";
import ItemCreate from "./ItemCreate";
import useCreateItem from "../hooks/lists/useCreateItem";
import { useAuth } from "../auth/AuthContext";

export const List = ({
	list,
	onDelete,
	onItemDelete,
	onSubmit,
}: {
	list: ListType;
	onDelete: (listId: number) => void;
	onItemDelete: (listId: number, itemId: number) => void;
	onSubmit: (item: ItemType | CreateItemType) => void;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const items = list.items;

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete(list.listId);
	};
	const { isLoggedIn } = useAuth();

	const handleSubmit = async (item: ItemType | CreateItemType) => {
		onSubmit({ ...item, listId: list.listId });
	};

	return (
		<div className="list-container" onClick={toggleExpand}>
			<div style={{ fontWeight: "bold" }}>{list.title}</div>
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
					onClick={() => setModalOpen(true)}
					disabled={!isLoggedIn}
				>
					Create item
				</button>
			)}
			{isExpanded && (
				<div>
					{items.map((item, index) => (
						<Item
							key={index}
							item={item}
							onSubmit={handleSubmit}
							onDelete={() =>
								onItemDelete(list.listId, item.itemId)
							}
							btnDisabled={!isLoggedIn}
							isCreate={false}
						/>
					))}
				</div>
			)}

			{modalOpen && (
				<ItemCreate
					isOpen={modalOpen}
					onClose={() => {
						setModalOpen(false);
						console.log("modal closed");
					}}
					onSubmit={handleSubmit}
				/>
			)}
		</div>
	);
};
