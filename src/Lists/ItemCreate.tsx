import React from "react";
import "./listStyles.css";
import Item from "./Item";
import { CreateItemType, ItemFlag, ItemType } from "../types";

const dummyItem: ItemType = {
	itemId: 1,
	listId: 1,
	createdBy: 1,
	title: "Sample Item",
	description: "This is a sample item description",
	deadline: "2024-12-31T23:59",
	flag: ItemFlag.Active,
};

const ItemCreate = ({
	isOpen,
	onClose,
	onSubmit,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (item: CreateItemType) => void;
}) => {
	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
					X
				</button>
				{/* {children} */}
				<Item
					item={dummyItem}
					onSubmit={(args) => {
						onSubmit(args);
						onClose();
					}}
					isCreate={true}
				/>
			</div>
		</div>
	);
};

export default ItemCreate;
