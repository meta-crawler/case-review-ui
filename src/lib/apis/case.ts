import axiosInstance from '@/utils/axios';
import { ILocalCase } from '@/redux/types/case';

export const getAllCasesApi = () => axiosInstance.get('/api/case');

export const getCaseApi = (id: number) => axiosInstance.get(`/api/case?id=${id}`);

export const getCasesByAuthorityApi = (authorityId: number) =>
  axiosInstance.get(`/api/case-by-authority?authority_id=${authorityId}`);

export const updateCaseReviewForCaseApi = (data: ILocalCase) => {
  const { id, ...payload } = data;
  return axiosInstance.put(`/api/case-review?id=${data.id}`, payload);
};
