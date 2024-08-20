import { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { getJwtToken } from "../../utils";

const useCheckLoggedin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const fullUrl = `${BASE_URL}/auth/is-logged-in`;
    const token = await getJwtToken();
    if (!token) {
      console.log("nie je token");
      setIsLoggedIn(false);
      return;
    }
    try {
      const response = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.data.isLoggedIn === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err: unknown) {
      console.error("je error", err);
      setIsLoggedIn(false);
      return;
    }
  };
  return { isLoggedIn, checkLoggedIn };
};

export default useCheckLoggedin;
