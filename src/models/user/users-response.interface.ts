import { User } from "./user.interface";

export interface UsersResponse {
    data: User[]
    message: string
    success: boolean
    token: string
  
}