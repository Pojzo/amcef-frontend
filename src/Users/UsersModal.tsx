import { useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	FormGroup,
	Label,
} from "reactstrap";
import UserRow from "./UserRow";
import useAddUserToList from "../hooks/users/useAddUserToList";

const UsersModal = ({
	users,
	open,
	onAddUser,
	onDeleteUser,
	onClose,
}: {
	users: string[];
	open: boolean;
	onClose: () => void;
	onAddUser: (email: string) => void;
	onDeleteUser: (email: string) => void;
}) => {
	const [addUser, setAddUser] = useState<string>("");

	const handleDelete = (email: string) => {
		onDeleteUser(email);
	};

	if (!open) {
		return null;
	}

	return (
		<Modal isOpen={open} toggle={onClose}>
			<ModalHeader toggle={onClose}>Users</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label for="add-user">Add user</Label>
					<Input
						type="text"
						placeholder="email"
						id="add-user"
						value={addUser}
						onChange={(e) => setAddUser(e.target.value)}
					/>
				</FormGroup>
				<Button color="primary" onClick={() => onAddUser(addUser)}>
					Add
				</Button>
				<ul className="list-unstyled mt-3">
					{users.map((user, index) => (
						<UserRow
							key={index}
							email={user}
							onDelete={handleDelete}
						/>
					))}
				</ul>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default UsersModal;
