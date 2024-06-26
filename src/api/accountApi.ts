import { Account, AccountCreateModel } from "@/constants/models/Account";
import axiosClient from "./axios";

export const getAccounts = async () => {
  return await axiosClient.get('/api/accounts')
}

export const createAccount = async (account: AccountCreateModel) => {
    return await axiosClient.post("/api/accounts", account);
}

export const getById = async (accountId: string): Promise<Account> => {
  const response = await axiosClient.get(`/api/accounts/${accountId}`)
  return response.data
}
