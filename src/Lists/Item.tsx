import { useState } from "react";
import { ItemType, ItemFlag, CreateItemType } from "../types";
import "./listStyles.css";

const Item = ({
	item,
	onSubmit,
	onDelete,
	isCreate = true,
	btnDisabled = false,
}: {
	item: ItemType;
	onSubmit: (item: ItemType | CreateItemType) => void;
	onDelete?: () => void;
	isCreate: boolean;
	btnDisabled?: boolean;
}) => {
	const itemId = item.itemId;
	const listId = item.listId;
	const createdBy = item.createdBy;

	const [title, setTitle] = useState(item.title);
	const [description, setDescription] = useState(item.description);
	const [deadline, setDeadline] = useState(
		new Date(item.deadline).toISOString().slice(0, 16)
	);
	const [flag, setFlag] = useState(item.flag);

	console.log(deadline);

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
		if (isCreate) {
			onSubmit({ title, description, deadline, flag });
		} else {
			onSubmit({
				itemId,
				listId,
				createdBy,
				title,
				description,
				deadline,
				flag,
			});
		}
	};

	return (
		<form
			className="item-form"
			onSubmit={handleSubmit}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="form-group">
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					readOnly={btnDisabled ? true : false}
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
					readOnly={btnDisabled ? true : false}
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
					readOnly={btnDisabled ? true : false}
					onChange={handleDeadlineChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="flag">Flag:</label>
				<select
					id="flag"
					name="flag"
					value={flag}
					disabled={btnDisabled}
					onChange={(e) =>
						handleOptionChange(e.target.value as ItemFlag)
					}
				>
					<option value="active">Active</option>
					<option value="finished">Finished</option>
					<option value="aborted">Aborted</option>
				</select>
			</div>
			{!btnDisabled && !isCreate && (
				<button
					type="button"
					className="submit-button"
					style={{
						color: "white",
						backgroundColor: "red",
					}}
					onClick={onDelete}
				>
					Delete item
				</button>
			)}
			{/* 
            <div className="form-group">
                <label htmlFor="createdBy">Created By:</label>
                <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    value={createdBy}
                    readOnly
                />
            </div> */}
			{/* 
            <div className="form-group">
                <label htmlFor="listId">List ID:</label>
                <input type="text" id="listId" name="listId" readOnly value={listId} />
            </div>

            <div className="form-group">
                <label htmlFor="itemId">Item ID:</label>
                <input type="text" id="itemId" readOnly name="itemId" value={itemId} />
            </div> */}

			<button
				type="submit"
				className="submit-button"
				onSubmit={handleSubmit}
				style={{ backgroundColor: btnDisabled ? "gray" : "blue" }}
				disabled={btnDisabled}
			>
				update
			</button>
		</form>
	);
};

export default Item;
