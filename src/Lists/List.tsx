import { useState } from "react";
import { ListType } from "../types";

export const List = ({
  list,
  onDelete,
}: {
  list: ListType;
  onDelete: (listId: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(list.listId);
  };

  return (
    <div className="list-container" onClick={toggleExpand}>
      <div style={{ fontWeight: "bold" }}>{list.title}</div>
      {isExpanded && (
        <div style={{ marginTop: "10px" }}>
          {/* Additional expanded content can go here */}
          <button
            onClick={handleDelete}
            style={{ marginTop: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
