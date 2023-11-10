import axiosInstance from '@/utils/axios';

export const getUserListApi = () => axiosInstance.get('/api/user-list');
