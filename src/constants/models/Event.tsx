import { Schedule } from "./schedule"

export type Event = {
    id: Number,
    name: string,
    place: string,
    startTimeOverall: string,
    endTimeOverall: string,
    startDate: string,
    endDate: string,
    description: string,
    eventStatus: number,
    price: number,
    quantity: number,
    avatarUrl: string,
    ownerId: number,
    subjectId: number
    "scheduleList": Schedule[]
}
export type EventCreateModel = {
    name: string,
    place: string,
    startTime: Date,
    endTime: Date,
    startDate: Date,
    endDate: Date,
    description: string,
    eventStatus: number,
    price: number,
    quantity: number,
    avatarUrl: string,
    ownerId: number,
    subjectId: number
}
export type EventDate = {
    id: string,
    title: string,
    start: string,
    end: string,
    allDay: boolean,
}