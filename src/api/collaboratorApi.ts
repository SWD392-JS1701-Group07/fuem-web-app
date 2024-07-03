import { CollaboratorCreateModel } from "@/constants/models/Collaborator";
import axiosClient from "./axios";

export const addCollaborator = async (collaborator: CollaboratorCreateModel) => {
    return await axiosClient.post("/api/collaborators", collaborator);
}