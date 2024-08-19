import AsyncStorage from "@react-native-async-storage/async-storage";

const setStorageData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) { }
};

const getStorageData = async (key: string): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        return null;
    }
};

export const storeJwtToken = async (token: string): Promise<string | null> => {
    console.log("storing jwt token", token);
    try {
        await setStorageData("jwtToken", token);
        return token;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to store the JWT token: " + error.message);
        } else {
            console.error(
                "Failed to store the JWT token: An unknown error occured",
            );
        }
        return null;
    }
};

export const getJwtToken = async (): Promise<string | null> => {
    try {
        const token = await getStorageData("jwtToken");
        if (token) {
            return token;
        }
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to load the JWT token: " + error.message);
        } else {
            console.error(
                "Failed to load the JWT token: An unknown error occured",
            );
        }
        return null;
    }
};

export const deleteJwtToken = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem("jwtToken");
        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Failed to delete the JWT token: " + error.message);
        } else {
            console.error(
                "Failed to delete the JWT token: An unknown error occurred",
            );
        }
        return false;
    }
}