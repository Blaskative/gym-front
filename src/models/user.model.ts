import { Roles } from './roles';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: Roles;
}
export const EmptyUserState: UserInfo = {
  id: 0,
  name: '',
  email: '',
  rol:Roles.USER,
};
export const UserKey = 'user'; 