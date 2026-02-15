import apiClient from './lib/apiClient';

export const tasksApi = {
    getAllTasks: async (params?: any) => {
        try {
            const response = await apiClient.get('/tasks', { params });
            return response.data;
        } catch (error: any) {
            console.error('Error fetching tasks:', error);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred while fetching tasks.';
            throw new Error(errorMessage);
        }
    },
    getTaskById: async (id: string) => {
        const response = await apiClient.get(`/tasks/${id}`);
        return response.data;
    },
    createTask: async (taskData: any) => {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    },
    updateTask: async (id: string, taskData: any) => {
        const response = await apiClient.put(`/tasks/${id}`, taskData);
        return response.data;
    },
    deleteTask: async (id: string) => {
        const response = await apiClient.delete(`/tasks/${id}`);
        return response.data;
    },
};
