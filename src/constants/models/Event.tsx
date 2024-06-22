export type Event = {
    id: Number,
    name: string,
    place: string,
    startSellDate: Date,
    endSellDate: Date,
    startDate: string,
    endDate: string,
    description: string,
    eventStatus: string,
    price: number,
    quantity: number,
    avatarUrl: string,
    ownerId: number,
    subjectId: number
    scheduleList: ScheduleList[]
}
export type EventCreateModel = {
    name: string,
    place: string,
    startSellDate: Date,
    endSellDate: Date,
    price: number,
    quantity: number,
    avatarUrl: string | null,
    description: string,
    eventStatus: string,
    ownerId: number,
    subjectId: number,
    scheduleList: ScheduleCreateModel[],
    sponsorships: SponsorshipCreateModel[]
}
export type EventDate = {
    id: string,
    title: string,
    start: string,
    end: string,
    allDay: boolean,
}
export type ScheduleList = {
    id: string,
    endTime: string,
    eventId: number,
    place: string,
    startTime: string
}

export type ScheduleCreateModel = {
    startTime: Date,
    endTime: Date,
    place: string
}
export type SponsorshipCreateModel =
    {
        description: string,
        type: string,
        title: string,
        sum: number,
        sponsor: {
            name: string,
            email: string,
            phoneNumber: string,
            avatarFile: string,
            accountId: 0
        }
    }