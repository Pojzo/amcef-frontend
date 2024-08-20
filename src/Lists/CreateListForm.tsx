import React, { useState } from "react";
import useCreateList from "../hooks/lists/useCreateList";

interface CreateListFormProps {
  onCreate: (title: string) => void;
}

const CreateListForm = ({ onCreate }: CreateListFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { error, loading, createList } = useCreateList();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setSubmitError("Title is required.");
      return;
    }

    createList(title);
    onCreate(title);

    setTitle("");
    setSubmitError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        position: "absolute",
        right: "20px",
        top: "100px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="title" style={{ marginRight: "10px" }}>
          List Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title"
          style={{ padding: "5px", width: "200px" }}
        />
      </div>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      <button type="submit" style={{ padding: "5px 10px" }}>
        Create List
      </button>
    </form>
  );
};

export default CreateListForm;
