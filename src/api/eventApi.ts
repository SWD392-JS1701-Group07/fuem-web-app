import { Event, EventCreateModel } from "@/constants/models/Event";
import axiosClient from "../api/axios";

export const getAll = async () => {
    return await axiosClient.get("/api/events");
}

export const getById = async (id: number) => {
    return await axiosClient.get(`/api/events/${id}/name`);
}

export const create = async (data: EventCreateModel) => {
    return await axiosClient.post("/api/events", data);
}