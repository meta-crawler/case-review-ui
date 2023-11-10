import axiosInstance from '@/utils/axios';

export const getAllCasesApi = () => axiosInstance.get('/api/case');

export const getCaseApi = (id: number) => axiosInstance.get(`/api/case?id=${id}`);

export const getCasesByAuthorityApi = (authorityId: number) =>
  axiosInstance.get(`/api/case-by-authority?authority_id=${authorityId}`);
