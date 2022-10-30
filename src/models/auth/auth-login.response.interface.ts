import { User } from "../user"

export interface AuthLoginResponse {
    data: {
        [key: string]: User
    }
    message: string
    success: boolean
}