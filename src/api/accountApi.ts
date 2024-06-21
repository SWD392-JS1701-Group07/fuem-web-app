import { Account } from "@/constants/models/Account";
import axiosClient from "./axios";

export const getAccounts = async () => {
    return await axiosClient.get("/api/accounts");
}

export const createAccount = async (account: Account) => {
    return await axiosClient.post("/api/accounts", account);
}