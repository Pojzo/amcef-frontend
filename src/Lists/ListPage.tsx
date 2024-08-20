import { useEffect, useState } from "react";
import useGetLists from "../hooks/lists/useGetLists";
import { ListType } from "../types";
import "./listStyles.css";
import { List } from "./List";
import CreateListForm from "./CreateListForm";
import useDeleteList from "../hooks/lists/useDeleteList";

const ListPage = () => {
  const [lists, setLists] = useState<ListType[]>([]);
  const { error, loading, getLists } = useGetLists();

  const handleGetLists = async () => {
    const response = await getLists();
    setLists(response || []);
  };

  const { listDeleteLoading, listDeleteError, deleteList } = useDeleteList();
  const handleCreateList = async (title: string) => {};
  const handleListDelete = async (id: number) => {
    await deleteList(id);
  };

  useEffect(() => {
    handleGetLists();
  });

  return (
    <div className="lists-page">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {listDeleteLoading && <p style={{ color: "blue" }}>Deleting...</p>}
      {listDeleteError && <p style={{ color: "red" }}>{listDeleteError}</p>}
      {lists.map((list, index) => (
        <List key={index} list={list} onDelete={handleListDelete} />
      ))}
      <CreateListForm onCreate={handleCreateList} />
    </div>
  );
};

export default ListPage;
