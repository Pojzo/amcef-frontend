import axios from "axios";
import { useState } from "react";
import { getJwtToken } from "../../utils";
import { BASE_URL } from "../../config";
import { GetListsResponse } from "../../types";

const useDeleteList = () => {
  const [listDeleteError, setListDeleteError] = useState<string | null>(null);
  const [listDeleteLoading, setListDeleteLoading] = useState<Boolean>(false);
  const deleteList = async (listId: number) => {
    try {
      setListDeleteLoading(true);
      setListDeleteError(null);
      const fullUrl = `${BASE_URL}/lists/${listId}`;

      const token = await getJwtToken();

      if (!token) {
        setListDeleteError("Not logged in ");
        return;
      }
      const response = await axios.delete(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setListDeleteError(
          err.response?.data.message || "An unknown error occurred"
        );
      } else {
        setListDeleteError("An unknown error occurred");
      }
    } finally {
      setListDeleteLoading(false);
    }
  };
  return { listDeleteError, listDeleteLoading, deleteList };
};

export default useDeleteList;
