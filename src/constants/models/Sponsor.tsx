export type Sponsor = {
  id: number
  name: string
  email: string
  phoneNumber: string
  avatarUrl: string
  accountId: number | null
}

export type SponsorDetail = {
  id: number
  description: string
  type: string
  title: string
  sum: number
  sponsorId: number
  eventId: number
}

export type SponsorViewModel = {
  id: number
  name: string
  email: string
  phoneNumber: string
  avatarUrl: string
  description: string
}
