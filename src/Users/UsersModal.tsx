import { useState } from "react";
import UserRow from "./UserRow";
import "./userStyles.css";
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

	const handleOverlayClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content">
				<div className="modal-header">
					<h2>Users</h2>
					<button className="close-button" onClick={onClose}></button>
				</div>
				<div className="add-user-container">
					<label htmlFor="add-user">Add user</label>
					<input
						type="text"
						placeholder="email"
						name="add-user"
						value={addUser}
						onChange={(e) => setAddUser(e.target.value)}
					/>
					<button
						type="button"
						className="add-btn"
						onClick={() => onAddUser(addUser)}
					>
						Add
					</button>
				</div>
				<ul className="user-list">
					{users.map((user, index) => (
						<UserRow
							key={index}
							email={user}
							onDelete={handleDelete}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default UsersModal;
