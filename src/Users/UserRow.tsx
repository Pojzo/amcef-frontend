import React from "react";
import "./userStyles.css"; // Import the CSS file

const UserRow = ({
	email,
	onDelete,
}: {
	email: string;
	onDelete: (email: string) => void;
}) => {
	return (
		<div className="user-row">
			<div className="user-email">{email}</div>
			<div className="delete-button">
				<button type="button" onClick={() => onDelete(email)}>
					Remove
				</button>
			</div>
		</div>
	);
};

export default UserRow;
