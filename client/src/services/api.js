import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const BACKEND_URL = BASE_URL.replace('/api', '');

const API = axios.create({
    baseURL: BASE_URL
});

// Add Interceptor for Token
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null;

    if (userInfo && userInfo.token) {
        req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return req;
});

// Auth APIs
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Event APIs
export const fetchEvents = () => API.get('/events');
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (eventData) => API.post('/events', eventData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteEvent = (id) => API.delete(`/events/${id}`);


// Announcement APIs
export const fetchAnnouncements = () => API.get('/announcements');
export const createAnnouncement = (data) => API.post('/announcements', data);
export const deleteAnnouncement = (id) => API.delete(`/announcements/${id}`);

// Gallery APIs
export const fetchGallery = () => API.get('/gallery');
export const uploadGalleryImage = (data) => API.post('/gallery', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteGalleryImage = (id) => API.delete(`/gallery/${id}`);

// Application APIs
export const submitApplication = (data) => API.post('/applications', data);
export const fetchApplications = () => API.get('/applications');
export const updateApplicationStatus = (id, status) => API.put(`/applications/${id}/status`, { status });



export default API;
