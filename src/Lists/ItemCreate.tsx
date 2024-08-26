import { useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	FormGroup,
	Label,
	Input,
	Form,
} from "reactstrap";
import { ItemCreateType, ItemFlag } from "../types";

const ItemCreate = ({
	isOpen,
	onClose,
	onItemCreate,
}: {
	isOpen: boolean;
	onClose: () => void;
	onItemCreate: (item: ItemCreateType) => void;
}) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [deadline, setDeadline] = useState<string>("");
	const [flag, setFlag] = useState<ItemFlag>(ItemFlag.Active);

	if (!isOpen) return null;

	const handleCreateButtonClick = () => {
		onItemCreate({ title, description, deadline, flag });
		onClose();
	};

	return (
		<Modal isOpen={isOpen} toggle={onClose} centered>
			<ModalHeader toggle={onClose}>Create New Item</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label for="title">Title</Label>
						<Input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter item title"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input
							type="text"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Enter item description"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="deadline">Deadline</Label>
						<Input
							type="datetime-local"
							id="deadline"
							value={deadline}
							onChange={(e) => setDeadline(e.target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="flag">Flag</Label>
						<Input
							type="select"
							id="flag"
							value={flag}
							onChange={(e) =>
								setFlag(e.target.value as ItemFlag)
							}
						>
							<option value={ItemFlag.Active}>Active</option>
							<option value={ItemFlag.Finished}>Finished</option>
							<option value={ItemFlag.Aborted}>Aborted</option>
						</Input>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={handleCreateButtonClick}>
					Create
				</Button>
				<Button color="secondary" onClick={onClose}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ItemCreate;
