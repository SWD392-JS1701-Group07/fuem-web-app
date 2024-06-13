export type LoginParam = {
    username: string,
    password: string
}

export type UserResponse = {
    accountId: number,
    fullName: string,
    role: number,
    accessToken: string
}