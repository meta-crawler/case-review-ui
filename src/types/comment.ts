import { IUser } from '@/types/user';
import { ICase } from '@/types/case';

export interface IComment {
  id: number;
  author: IUser;
  case: ICase | number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
