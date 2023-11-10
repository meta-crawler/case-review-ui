import axiosInstance from '@/utils/axios';

export const getCommentsByCaseApi = (caseId: number) =>
  axiosInstance.get(`/api/comments-by-case?case_id=${caseId}`);
