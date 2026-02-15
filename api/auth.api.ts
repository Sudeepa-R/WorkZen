import apiClient from './lib/apiClient';

export const authApi = {
    login: async (credentials: any) => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },
    register: async (userData: any) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },
    getProfile: async (userId: string) => {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    },
};
