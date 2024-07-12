import { CollaboratorCreateModel } from "@/constants/models/Collaborator";
import axiosClient from "./axios";

export const addCollaborator = async (collaborator: CollaboratorCreateModel) => {
    return await axiosClient.post("/api/collaborators", collaborator);
}

export const getAllCollaborators = async () => {
    return await axiosClient.get("/api/collaborators");
}

export const getCollaboratorById = async (id: number) => {
    return await axiosClient.get(`/api/collaborators/${id}`);
}

export const getCollaboratorByEvent = async (id: number) => {
    return await axiosClient.get(`/api/collaborators/${id}/event`, {
        params: {
            searchTerm: "",
            page: 1,
            pageSize: 100
        }
    });
}

export const getCollaboratorByOperator = async (id: number) => {
    return await axiosClient.get(`/api/collaborators/${id}/event-operator`);
}

export const approve = async (id: number) => {
    return await axiosClient.patch(`/api/collaborators/${id}/approve`);
}

export const reject = async (id: number) => {
    return await axiosClient.patch(`/api/collaborators/${id}/reject`);
}

export const assignTask = async (eventId: number, accountId: number, task: string) => {
    return await axiosClient.patch(`/api/collaborators/task?eventId=${eventId}&task=${task}&accountId=${accountId}`);
}