import { IComment } from '@/types/comment';

export interface ILocalComment {
  id: number;
  author: number;
  case: number;
  comment: string;
}

export interface ILocalCommentData {
  comments: ILocalComment[];
}

export interface ICommentState {
  isLoading: boolean;
  error: Error | string | null;
  comments: IComment[] | null;
  localComment: ILocalCommentData | null;
}
