import { useState } from "react"
import { BASE_URL } from "../config"
import axios from "axios"
import { deleteJwtToken, getJwtToken } from "../utils"

const useLogout = () => {
    const logout = async (): Promise<null> => {
        try {
            const token = await getJwtToken();
            if (!token) {
                throw new Error("No token stored");
            }

            const fullUrl = `${BASE_URL}/auth/logout`;
            await axios.post(fullUrl, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            deleteJwtToken();
            return null;
        }
        catch (err: unknown) {
            return null;
        }
    }
    return { logout }
}

export default useLogout