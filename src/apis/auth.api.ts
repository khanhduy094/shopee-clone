import http from 'src/utils/http'
import { AuthResponse } from 'src/types/auth.type'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'registereesdasd'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>(URL_REGISTER, body)
export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(URL_LOGIN, body)
