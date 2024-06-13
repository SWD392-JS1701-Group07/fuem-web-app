import { LoginParam } from "@/constants/models/User";
import axiosClient from "./axios";

export const login = async (params: LoginParam) => {
    return await axiosClient.post("/api/auth/login", params);
}