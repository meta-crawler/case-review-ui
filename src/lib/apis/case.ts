import axiosInstance from '@/utils/axios';

export const getAllCasesApi = () => axiosInstance.get('/api/case');

export const getCaseApi = (id: number) => axiosInstance.get(`/api/case?id=${id}`);
