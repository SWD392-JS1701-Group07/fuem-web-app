import axiosClient from "../api/axios";

export const getAll = async () => {
    return await axiosClient.get("/api/Event");
}