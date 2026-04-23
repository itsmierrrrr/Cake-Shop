export type AuthUser = {
  name: string
  email: string
  avatar?: string | null
}

export type AuthSessionResponse = {
  token: string
  user: AuthUser
}

export type SignUpResponse = {
  message: string
}
