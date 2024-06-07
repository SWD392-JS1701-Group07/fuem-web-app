export type Sponsor = {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    avatarUrl: string,
    accountId: number | null,
}

export type SponsorViewModel = {
    id: number,
    name: string,
    email: string,
    phoneNumber: string,
    avatarUrl: string,
    description: string,
}