export type RefreshTokenCredentials = {
  accessToken: string
  refreshToken: string
}

export type UserState = {
  role: number
  accessToken: string
}

export type AppState = {
  loginedUser: UserState
}
