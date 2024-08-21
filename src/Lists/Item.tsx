import { useState } from "react";
import { ItemType, ItemFlag, ItemUpdateType } from "../types";
import "./listStyles.css";

interface ItemProps {
	item: ItemType;
	onItemDelete: () => void;
	onItemUpdate: (item: ItemUpdateType) => void;
	btnDisabled: boolean;
}

const Item = (props: ItemProps) => {
	const itemId = props.item.itemId;
	const listId = props.item.listId;
	// const createdBy = props.item.createdBy;

	const [title, setTitle] = useState(props.item.title);
	const [description, setDescription] = useState(props.item.description);
	const [deadline, setDeadline] = useState(
		new Date(props.item.deadline).toISOString().slice(0, 16)
	);
	const [flag, setFlag] = useState(props.item.flag);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		e.stopPropagation();
		setDescription(e.target.value);
	};

	const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setDeadline(e.target.value);
	};

	const handleOptionChange = (option: ItemFlag) => {
		setFlag(option);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.onItemUpdate({
			itemId,
			listId,
			title,
			description,
			deadline,
			flag,
		});
	};

	return (
		<form
			className="item-form"
			// onSubmit={handleSubmit}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="form-group">
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					readOnly={props.btnDisabled ? true : false}
					onChange={handleTitleChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description:</label>
				<input
					type="text"
					id="description"
					name="description"
					value={description}
					readOnly={props.btnDisabled ? true : false}
					onChange={handleDescriptionChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="deadline">Deadline:</label>
				<input
					type="datetime-local"
					id="deadline"
					name="deadline"
					value={deadline}
					readOnly={props.btnDisabled ? true : false}
					onChange={handleDeadlineChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="flag">Flag:</label>
				<select
					id="flag"
					name="flag"
					value={flag}
					disabled={props.btnDisabled}
					onChange={(e) =>
						handleOptionChange(e.target.value as ItemFlag)
					}
				>
					<option value="active">Active</option>
					<option value="finished">Finished</option>
					<option value="aborted">Aborted</option>
				</select>
			</div>
			{!props.btnDisabled && (
				<button
					type="button"
					className="submit-button"
					style={{
						color: "white",
						backgroundColor: "red",
					}}
					onClick={props.onItemDelete}
				>
					Delete item
				</button>
			)}
			<button
				type="button"
				className="submit-button"
				onClick={handleSubmit}
				style={{ backgroundColor: props.btnDisabled ? "gray" : "blue" }}
				disabled={props.btnDisabled}
			>
				update
			</button>
		</form>
	);
};

export default Item;
