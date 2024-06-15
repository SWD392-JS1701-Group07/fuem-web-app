import axiosClient from "./axios";

export const getAccounts = async () => {
    return await axiosClient.get("/api/accounts");
}