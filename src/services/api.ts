import { User, PaginatedResponse, AuditLog } from '@/types';
import { mockUsers } from '@/mocks/users';

// TODO: Uncomment and configure when integrating with Spring Boot
/*
import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Real API calls - uncomment when ready to integrate

export const getUsers = async (params: {
  page: number;
  size: number;
  search?: string;
  sort?: string;
}): Promise<PaginatedResponse<User>> => {
  const response = await apiClient.get<PaginatedResponse<User>>('/api/users', {
    params: {
      page: params.page,
      size: params.size,
      search: params.search,
      sort: params.sort,
    },
  });
  return response.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get<User>(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.post<User>('/api/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>(`/api/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/users/${id}`);
};

export const getAuditLogs = async (params: {
  page: number;
  size: number;
  startDate?: string;
  endDate?: string;
}): Promise<PaginatedResponse<AuditLog>> => {
  const response = await apiClient.get<PaginatedResponse<AuditLog>>('/api/audit-logs', {
    params,
  });
  return response.data;
};
*/

// ===== MOCK IMPLEMENTATIONS - Replace these with real API calls above =====

export const getUsers = async (params: {
  page: number;
  size: number;
  search?: string;
  sort?: string;
}): Promise<PaginatedResponse<User>> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  
  let filteredUsers = [...mockUsers];
  
  // Mock search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      u => 
        u.email.toLowerCase().includes(searchLower) ||
        u.firstName.toLowerCase().includes(searchLower) ||
        u.lastName.toLowerCase().includes(searchLower)
    );
  }
  
  // Mock sort
  if (params.sort) {
    const [field, order] = params.sort.split(',');
    filteredUsers.sort((a, b) => {
      const aVal = a[field as keyof User];
      const bVal = b[field as keyof User];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return order === 'desc' ? -comparison : comparison;
    });
  }
  
  const start = params.page * params.size;
  const end = start + params.size;
  const paginatedUsers = filteredUsers.slice(start, end);
  
  return {
    content: paginatedUsers,
    totalElements: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / params.size),
    pageNumber: params.page,
    pageSize: params.size,
    last: end >= filteredUsers.length,
    first: params.page === 0,
  };
};

export const getUserById = async (id: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const user = mockUsers.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newUser: User = {
    id: String(mockUsers.length + 1),
    email: userData.email || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    roles: userData.roles || [],
    status: userData.status || 'active',
    createdAt: new Date().toISOString(),
  };
  return newUser;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = mockUsers.find(u => u.id === id);
  if (!user) throw new Error('User not found');
  return { ...user, ...userData };
};

export const deleteUser = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  console.log('Mock: Deleted user', id);
};

export const getAuditLogs = async (params: {
  page: number;
  size: number;
}): Promise<PaginatedResponse<AuditLog>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock audit logs
  const mockAuditLogs: AuditLog[] = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    userId: String((i % 8) + 1),
    userEmail: `user${i}@example.com`,
    action: ['User Created', 'User Updated', 'User Deleted', 'Login', 'Logout'][i % 5],
    resource: 'users',
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    ipAddress: `192.168.1.${100 + (i % 50)}`,
  }));
  
  const start = params.page * params.size;
  const end = start + params.size;
  
  return {
    content: mockAuditLogs.slice(start, end),
    totalElements: mockAuditLogs.length,
    totalPages: Math.ceil(mockAuditLogs.length / params.size),
    pageNumber: params.page,
    pageSize: params.size,
    last: end >= mockAuditLogs.length,
    first: params.page === 0,
  };
};
