import { Account } from "./Account";
import { Event } from "./Event";

export type CollaboratorCreateModel = {
    eventId: number;
    accountId: number;
}

export type Collaborator = {
    id: number,
    isCheckIn: number,
    accountId: number,
    eventId: number,
    collabStatus: string,
    task: string,
    description: string,
    account: Account
}

export type CollaboratorInEvent = {
    eventDTO: Event,
    collaboratorDTO: Collaborator
}