// Core API types matching Spring Boot backend contract

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  roles: string[];
  expiresIn?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  last: boolean;
  first: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, any>;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  revenueChange: number;
  newSignups: number;
  signupsChange: number;
  activeSessionsCount: number;
  sessionsChange: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export type TimeRange = '7d' | '30d' | '90d' | '1y';

export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: 'active' | 'inactive' | 'suspended';
}

// --- YouPi Backend Types ---

// Based on youpi/src/main/java/com/youpi/youpi/entity/UsersNormal.java
export interface UserNormal {
  id: number;
  profileImageUrl?: string;
  mobileNumber: string;
  fullName: string;
  email: string;
  fireBaseUUID: string;
  gender: string;
  active: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Based on youpi/src/main/java/com/youpi/youpi/dto/UsersKycStatusDTO.java
export interface UserKycStatusDTO {
  userId: number;
  name: string;
  mobileNumber: string;
  kycSubmitted: boolean;
  kycStatus: "PENDING" | "VERIFIED" | "REJECTED" | "NOT_SUBMITTED";
}