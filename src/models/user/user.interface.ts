import { UserRole } from "./user-role.enum";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    active: boolean;
    role: UserRole;
    token: string;
}

export const UserEmptyState: User [] = [{
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    active: false,
    role: "user",
    token:"",
  }];
  