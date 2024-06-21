import { Schedule } from './schedule'

export type Event = {
  id: Number
  name: string
  place: string
  startSellDate: string
  endSellDate: string
  description: string
  eventStatus: number
  price: number
  quantity: number
  avatarUrl: string
  ownerId: number
  subjectId: number
  scheduleList: Schedule[]
}
export type EventCreateModel = {
  name: string
  place: string
  startSellDate: Date
  endSellDate: Date
  description: string
  eventStatus: number
  price: number
  quantity: number
  avatarUrl: string
  ownerId: number
  subjectId: number
}
export type EventDate = {
  id: string
  title: string
  start: string
  end: string
  allDay: boolean
}
export type ScheduleList = {
  id: string
  endTime: string
  eventId: number
  place: string
  startTime: string
}
