import React, { useState } from "react";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	FormFeedback,
} from "reactstrap";
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

	const [title, setTitle] = useState(props.item.title);
	const [description, setDescription] = useState(props.item.description);
	const [deadline, setDeadline] = useState(
		new Date(props.item.deadline).toISOString().slice(0, 16)
	);
	const [flag, setFlag] = useState(props.item.flag);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e: any) => {
		setDescription(e.target.value);
	};

	const handleDeadlineChange = (e: any) => {
		setDeadline(e.target.value);
	};

	const handleFlagChange = (e: any) => {
		setFlag(e.target.value as ItemFlag);
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
		<Form className="item-form" onClick={(e) => e.stopPropagation()}>
			<FormGroup>
				<Label for="title">Title:</Label>
				<Input
					type="text"
					id="title"
					value={title}
					readOnly={props.btnDisabled}
					onChange={handleTitleChange}
					// invalid={props.btnDisabled}
				/>
				<FormFeedback>Title is required</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label for="description">Description:</Label>
				<Input
					type="text"
					id="description"
					value={description}
					readOnly={props.btnDisabled}
					onChange={handleDescriptionChange}
					// invalid={props.btnDisabled}
				/>
				<FormFeedback>Description is required</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label for="deadline">Deadline:</Label>
				<Input
					type="datetime-local"
					id="deadline"
					value={deadline}
					readOnly={props.btnDisabled}
					onChange={handleDeadlineChange}
					// invalid={props.btnDisabled}
				/>
				<FormFeedback>Deadline is required</FormFeedback>
			</FormGroup>

			<FormGroup>
				<Label for="flag">Flag:</Label>
				<Input
					type="select"
					id="flag"
					value={flag}
					disabled={props.btnDisabled}
					onChange={handleFlagChange}
				>
					<option value={ItemFlag.Active}>Active</option>
					<option value={ItemFlag.Finished}>Finished</option>
					<option value={ItemFlag.Aborted}>Aborted</option>
				</Input>
			</FormGroup>
			<FormGroup>
				<Label for="item-creator">Creator</Label>
				<Input
					type="text"
					id="item-creator"
					value={props.item.creatorEmail}
					readOnly={true}
					className="text-muted"
				></Input>
			</FormGroup>

			<div className="button-group">
				{!props.btnDisabled && (
					<Button
						color="danger"
						onClick={props.onItemDelete}
						className="mr-2 me-2"
					>
						Delete Item
					</Button>
				)}
				<Button
					color={props.btnDisabled ? "secondary" : "primary"}
					onClick={handleSubmit}
					disabled={props.btnDisabled}
				>
					Update
				</Button>
			</div>
		</Form>
	);
};

export default Item;
