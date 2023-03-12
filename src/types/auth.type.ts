import { ResPonseApi } from './utils.type'
import { User } from './user.type'

export type AuthResponse = ResPonseApi<{
  access_token: string
  expires: string
  user: User
}>

// const auth: AuthResponse = {
//   message: "sdsd",
//   data: {
//     access_to: 'áds',
//     expires:'sad',
//     user: {
//     }
//   }
// }
