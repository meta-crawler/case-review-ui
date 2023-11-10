import { IUser } from '@/types/user';

export interface ICaseReviewStatus {
  name: string;
  description: string;
}

export interface ICaseReview {
  authority: IUser;
  assigner: IUser;
  status: ICaseReviewStatus;
  createdAt: string;
  updatedAt: string;
}
