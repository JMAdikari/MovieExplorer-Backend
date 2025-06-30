import axios from './axiosConfig'; 

const authApi = {
    login: async (credentials) => {
        try {
        const response = await axios.post('/auth/login', credentials    );
        return response.data;
        } catch (error) {
        console.error('Login failed:', error);
        throw error.response ? error.response.data : 'Login failed';
        }
    },
    register: async (userData) => {
        try {
            const response = await axios.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error.response ? error.response.data : 'Registration failed';
        }
    },
    logout: async () => {
        try {
            const response = await axios.post('/auth/logout');
            return response.data;
        } catch (error) {
            console.error('Logout failed:', error);
            throw error.response ? error.response.data : 'Logout failed';
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await axios.get('/auth/current-user');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            throw error.response ? error.response.data : 'Failed to fetch current user';
        }
    }
};

export default authApi;