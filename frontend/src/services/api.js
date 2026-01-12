import axios from 'axios';

const base = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000') + '/api';

const api = axios.create({ baseURL: base });

// Attach token automatically if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('cattle_token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
    res => res,
    err => {
        if (err?.response?.status === 401) {
            // token invalid or expired
            window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { message: 'Your session has expired. Please sign in again.' } }));
            localStorage.removeItem('cattle_token');
            localStorage.removeItem('cattle_user');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

export default api;
