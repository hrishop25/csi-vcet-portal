// API Client helper for CSI VCET Portal
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('csi_vcet_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Public recruitment submission
  apply: async (formData) => {
    const res = await fetch(`${API_BASE_URL}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to submit application');
    return data;
  },

  // Auth endpoints
  login: async (credentials) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch current user');
    return data;
  },

  // Chapter Members & Events
  getMembers: async (category = '') => {
    const url = category && category !== 'All' 
      ? `${API_BASE_URL}/members?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/members`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch members');
    return data;
  },

  getEvents: async (status = '') => {
    const url = status && status !== 'All' 
      ? `${API_BASE_URL}/events?status=${encodeURIComponent(status)}`
      : `${API_BASE_URL}/events`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch events');
    return data;
  },

  // Admin recruitment management
  getApplications: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.year && filters.year !== 'All') params.append('year', filters.year);
    if (filters.department && filters.department !== 'All') params.append('department', filters.department);
    if (filters.status && filters.status !== 'All') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/applications${queryString}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch applications');
    return data;
  },

  updateApplicationStatus: async (id, payload) => {
    const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update application');
    return data;
  },

  deleteApplication: async (id) => {
    const res = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete application');
    return data;
  },

  getDashboardStats: async () => {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch stats');
    return data;
  },

  exportCSVUrl: `${API_BASE_URL}/applications/export/csv`,
};
