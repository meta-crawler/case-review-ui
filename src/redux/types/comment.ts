import { IComment } from '@/types/comment';

export interface ICommentState {
  isLoading: boolean;
  error: Error | string | null;
  comments: IComment[] | null;
}
