import { Account } from "./Account"

export type RefreshTokenCredentials = {
  accessToken: string
  refreshToken: string
}

export type UserState = {
  role: number
  accessToken: string
  accountDTO: Account
}

export type AppState = {
  loginedUser: UserState
}
