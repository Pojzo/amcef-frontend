import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import useCreateList from "../hooks/lists/useCreateList";

interface CreateListFormProps {
	onCreate: (title: string) => void;
}

const CreateListForm = ({ onCreate }: CreateListFormProps) => {
	const [title, setTitle] = useState<string>("");
	const [submitError, setSubmitError] = useState<string | null>(null);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!title.trim()) {
			setSubmitError("Title is required.");
			return;
		}

		onCreate(title);

		setTitle("");
		setSubmitError(null);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			className="position-absolute"
			style={{ right: "20px", top: "100px", maxWidth: "300px" }}
		>
			<FormGroup>
				<Label for="title">List Title:</Label>
				<Input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter list title"
					className="mb-2"
				/>
			</FormGroup>
			{submitError && <Alert color="danger">{submitError}</Alert>}
			<Button color="primary" type="submit" className="mt-2">
				Create List
			</Button>
		</Form>
	);
};

export default CreateListForm;
