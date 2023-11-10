import { IAlert } from '@/types/alert';
import { IUser } from '@/types/user';
import { ICaseReview } from '@/types/case-review';

export interface ICaseStatus {
  id: number;
  name: string;
  description: string;
}

export interface ICase {
  id: number;
  alert: IAlert;
  authority: IUser;
  status: ICaseStatus;
  caseReview: ICaseReview;
  createdAt: string;
  updatedAt: string;
}
