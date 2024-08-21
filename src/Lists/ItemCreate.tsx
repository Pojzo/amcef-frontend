import "./listStyles.css";
import { ItemCreateType, ItemFlag, ItemType } from "../types";
import { useState } from "react";

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
	onItemCreate,
}: {
	isOpen: boolean;
	onClose: () => void;
	onItemCreate: (item: ItemCreateType) => void;
}) => {
	const [title, setTitle] = useState<string>(dummyItem.title);
	const [description, setDescription] = useState<string>(
		dummyItem.description
	);
	const [deadline, setDeadline] = useState<string>(dummyItem.deadline);
	const [flag, setFlag] = useState<ItemFlag>(dummyItem.flag);

	if (!isOpen) return null;

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleCreateButtonClick = () => {
		onItemCreate({ title, description, deadline, flag });
		onClose();
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h1>Create new item</h1>
				<button className="close-button" onClick={onClose}></button>
				<form className="item-form" onClick={handleCreate}>
					<div className="form-group">
						<label htmlFor="title">Title: </label>
						<input
							type="text"
							id="title"
							value={title}
							name="title"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description: </label>
						<input
							type="text"
							id="description"
							value={description}
							name="description"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="deadline">Deadline: </label>
						<input
							type="datetime-local"
							id="deadline"
							value={deadline}
							name="deadline"
							onChange={(e) => setDeadline(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Flag: </label>
						<select
							value={flag}
							onChange={(e) =>
								setFlag(e.target.value as ItemFlag)
							}
						>
							<option value={ItemFlag.Active}>Active</option>
							<option value={ItemFlag.Finished}>Finished</option>
							<option value={ItemFlag.Aborted}>Aborted</option>
						</select>
					</div>
					<button
						type="button"
						className="submit-button"
						onClick={handleCreateButtonClick}
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default ItemCreate;
