# Spring Boot Backend Integration Guide

This Admin Panel UI is ready to connect to your Spring Boot backend. Follow these steps to integrate.

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `VITE_API_BASE_URL` with your Spring Boot backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:8081
   ```

## Authentication Integration

### File: `src/services/auth.ts`

**Current State:** Mock JWT authentication

**Integration Steps:**

1. Uncomment the real API implementation (lines marked with `TODO`)
2. Remove the mock implementation
3. Ensure your Spring Boot backend has an endpoint:
   ```
   POST /api/auth/signin
   Request: { email: string, password: string, rememberMe?: boolean }
   Response: { token: string, email: string, roles: string[], expiresIn?: number }
   ```

**Example:**
```typescript
// Uncomment this block in auth.ts
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/api/auth/signin`,
    credentials
  );
  
  const { token, email, roles } = response.data;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify({ email, roles }));
  
  return response.data;
};
```

### Optional: Token Refresh

Add a token refresh mechanism if your Spring Boot backend supports it (see commented section in `auth.ts`).

## API Integration

### File: `src/services/api.ts`

**Current State:** All API calls are mocked

**Integration Steps:**

1. Uncomment the axios instance configuration (top of file)
2. Uncomment all real API functions
3. Remove mock implementations
4. Ensure your Spring Boot backend matches these endpoints:

#### User Management
```
GET  /api/users?page={page}&size={size}&search={search}&sort={sort}
GET  /api/users/{id}
POST /api/users
PUT  /api/users/{id}
DELETE /api/users/{id}
```

#### Audit Logs
```
GET  /api/audit-logs?page={page}&size={size}&startDate={date}&endDate={date}
```

### Expected Response Format

All paginated endpoints should return:
```typescript
{
  content: T[],
  totalElements: number,
  totalPages: number,
  pageNumber: number,
  pageSize: number,
  last: boolean,
  first: boolean
}
```

This matches Spring Boot's `Page<T>` response structure.

## JWT Token Handling

The axios interceptor automatically adds JWT tokens to requests:

```typescript
// Already configured in api.ts
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

Ensure your Spring Boot backend:
- Accepts `Authorization: Bearer <token>` header
- Returns 401 for invalid/expired tokens
- Implements proper CORS configuration for your frontend domain

## CORS Configuration

Add this to your Spring Boot backend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:8080") // Your Vite dev server
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## Testing the Integration

1. Start your Spring Boot backend on port 8081 (or update `.env`)
2. Run the frontend:
   ```bash
   npm run dev
   ```
3. Try logging in - you should see real API calls in the Network tab
4. Check browser console for any CORS or authentication errors

## TypeScript Types

All TypeScript interfaces in `src/types/index.ts` match the expected Spring Boot DTOs. You can:
- Use these as a reference for your Java entities/DTOs
- Modify them if your backend has a different structure
- Add new types as needed

## Security Checklist

- ✅ HTTPS in production
- ✅ JWT token expiration
- ✅ Refresh token mechanism
- ✅ CORS properly configured
- ✅ Input validation on backend
- ✅ Rate limiting for login endpoint
- ✅ Secure password storage (BCrypt)

## Need Help?

- Check browser DevTools Network tab for failed requests
- Verify Spring Boot backend is running and accessible
- Confirm CORS configuration
- Check JWT token format and expiration
