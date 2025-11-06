import {
  User,
  PaginatedResponse,
  AuditLog,
  UserNormal,
  UserKycStatusDTO,
} from "@/types";
import { mockUsers } from "@/mocks/users";
import axios from "axios";
import { getToken } from "./auth";

// Set the base URL to your Spring Boot backend
const API_BASE_URL = "http://localhost:8082";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token (if you implement auth later)
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken(); // Assuming you have authService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// --- New Real API Calls ---

export const getUsersNormal = async (): Promise<UserNormal[]> => {
  // Fetches from @GetMapping in UsersNormalController
  const response = await apiClient.get<UserNormal[]>("/api/users-normal");
  return response.data;
};

export const getUsersKyc = async (): Promise<UserKycStatusDTO[]> => {
  // Fetches from @GetMapping in UsersKYCController
  const response = await apiClient.get<UserKycStatusDTO[]>("/api/user-kyc");
  return response.data;
};

// ===== MOCK IMPLEMENTATIONS - We keep these for the pages we haven't touched =====
// (This is the original mock function for the /users page)
export const getUsers = async (params: {
  page: number;
  size: number;
  search?: string;
  sort?: string;
}): Promise<PaginatedResponse<User>> => {
  console.warn("Using mock API for getUsers");
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

  let filteredUsers = [...mockUsers];

  // Mock search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(searchLower) ||
        u.firstName.toLowerCase().includes(searchLower) ||
        u.lastName.toLowerCase().includes(searchLower),
    );
  }

  // Mock sort
  if (params.sort) {
    const [field, order] = params.sort.split(",");
    filteredUsers.sort((a, b) => {
      const aVal = a[field as keyof User];
      const bVal = b[field as keyof User];
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return order === "desc" ? -comparison : comparison;
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

// ... (keep other mock functions like getAuditLogs, etc.)

export const getAuditLogs = async (params: {
  page: number;
  size: number;
}): Promise<PaginatedResponse<AuditLog>> => {
  console.warn("Using mock API for getAuditLogs");
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Mock audit logs
  const mockAuditLogs: AuditLog[] = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    userId: String((i % 8) + 1),
    userEmail: `user${i}@example.com`,
    action: [
      "User Created",
      "User Updated",
      "User Deleted",
      "Login",
      "Logout",
    ][i % 5],
    resource: "users",
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

// ... (other mock functions can remain for now)