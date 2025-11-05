import { AuthResponse, LoginRequest } from '@/types';

const TOKEN_KEY = 'jwtToken';
const USER_KEY = 'userData';

// TODO: Replace with real Spring Boot API integration
// Example axios call for your Spring Boot backend:
/*
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/api/auth/signin`,
      credentials
    );
    
    const { token, email, roles } = response.data;
    
    // Store JWT token
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({ email, roles }));
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
};
*/

// MOCK IMPLEMENTATION - Remove this when integrating with Spring Boot
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock validation
  if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      email: credentials.email,
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      expiresIn: 3600,
    };
    
    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, mockResponse.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ 
      email: mockResponse.email, 
      roles: mockResponse.roles 
    }));
    
    return mockResponse;
  }
  
  throw new Error('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  
  // TODO: When integrating with Spring Boot, call logout endpoint:
  /*
  try {
    await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
  } catch (error) {
    console.error('Logout API call failed:', error);
  }
  */
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// TODO: Add token refresh logic when integrating with Spring Boot
/*
export const refreshToken = async (): Promise<string> => {
  const response = await axios.post<{ token: string }>(
    `${API_BASE_URL}/api/auth/refresh`,
    {},
    {
      headers: { Authorization: `Bearer ${getToken()}` }
    }
  );
  
  localStorage.setItem(TOKEN_KEY, response.data.token);
  return response.data.token;
};
*/
