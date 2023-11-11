import axiosInstance from '@/utils/axios';
import { ILocalComment } from '@/redux/types/comment';

export const getCommentsByCaseApi = (caseId: number) =>
  axiosInstance.get(`/api/comments-by-case?case_id=${caseId}`);

export const updateCommentsApi = (payload: ILocalComment[]) =>
  axiosInstance.put('/api/update-comments', payload);
