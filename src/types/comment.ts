import { IUser } from '@/types/user';
import { ICase } from '@/types/case';

export interface IComment {
  author: IUser;
  case: ICase | number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
