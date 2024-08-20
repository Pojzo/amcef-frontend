import { useState } from "react"
import { BASE_URL } from "../config"
import axios from "axios"

const useLogin = () => {
    const [loading, setLoading] = useState<Boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (email: string, password: string): Promise<string | null> => {
        try {
            setLoading(true)
            setError(null)

            const fullUrl = `${BASE_URL}/auth/login`;
            const response = await axios.post(fullUrl, { email, password });

            if (!response.data.token) {
                throw new Error("No token in response")
            }

            return response.data.token;
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            }
            else if (axios.isAxiosError(err)) {
                setError(err.response?.data || "An unknown error occurred")
            }
            else {
                setError("An unknown error occurred")
            }

            return null;
        }
        finally {
            setLoading(false)
        }
    }
    return { error, loading, login }
}

export default useLogin