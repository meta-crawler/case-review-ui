import { IUser } from '@/types/user';

export interface IUserState {
  isLoading: boolean;
  error: Error | string | null;
  users: IUser[] | null;
}
