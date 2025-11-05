# Admin Panel - Production-Ready React TypeScript UI

A complete, production-quality admin panel built with React, TypeScript, and TailwindCSS. Ready to connect to Spring Boot backends.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run on `http://localhost:8080`

## 📋 Features

- ✅ **Authentication**: JWT-based login with mock implementation
- ✅ **Dashboard**: KPI cards, time-range charts, activity logs
- ✅ **User Management**: Advanced table with pagination, search, sorting
- ✅ **Roles & Permissions**: Complete role management UI
- ✅ **Audit Logs**: System activity tracking
- ✅ **Settings**: Application configuration
- ✅ **Light/Dark Theme**: Full theme support
- ✅ **Responsive Design**: Mobile-friendly layout
- ✅ **Type-Safe**: Full TypeScript coverage

## 🔑 Demo Credentials

```
Email: admin@example.com
Password: admin123
```

## 🔌 Backend Integration

### Quick Setup

1. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Update your Spring Boot backend URL:
   ```
   VITE_API_BASE_URL=http://localhost:8081
   ```

### Integrate with Spring Boot

All API calls are currently **mocked** for demo purposes. To connect to your real backend:

1. **Open** `src/services/auth.ts`
   - Uncomment the real API implementation
   - Remove the mock code (clearly marked with comments)

2. **Open** `src/services/api.ts`
   - Uncomment the axios instance and real API functions
   - Remove all mock implementations

3. **Ensure** your Spring Boot endpoints match:
   ```
   POST /api/auth/signin
   GET  /api/users
   GET  /api/users/{id}
   POST /api/users
   PUT  /api/users/{id}
   DELETE /api/users/{id}
   GET  /api/audit-logs
   ```

4. **Check** `INTEGRATION.md` for detailed integration instructions

### Expected Backend Response Format

```typescript
// Auth response
{
  token: string;
  email: string;
  roles: string[];
  expiresIn?: number;
}

// Paginated response (matches Spring Boot Page<T>)
{
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  last: boolean;
  first: boolean;
}
```

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Sidebar.tsx   # Navigation sidebar
│   ├── Topbar.tsx    # Top navigation bar
│   └── ...
├── pages/            # Route pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── ...
├── services/         # API services
│   ├── auth.ts       # Authentication (replace mock with real API)
│   └── api.ts        # Data fetching (replace mock with real API)
├── mocks/            # Mock data (remove when using real backend)
├── hooks/            # React hooks
│   └── useAuth.tsx   # Authentication hook
├── types/            # TypeScript definitions
└── lib/              # Utilities
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **Axios** - HTTP client (ready to use)
- **React Query** - Server state management

## 🎨 Customization

### Theme Colors

Edit `src/index.css` to customize the color palette:

```css
:root {
  --primary: 221 83% 53%;
  --accent: 199 89% 48%;
  /* ... other colors */
}
```

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/Sidebar.tsx`

## 🔒 Security Features

- JWT token storage in localStorage
- Protected routes with authentication
- Automatic token injection in API calls
- 401 redirect to login
- Input validation on forms

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Debugging

The UI includes comprehensive error handling and loading states. Check:

1. Browser console for errors
2. Network tab for failed API calls
3. Verify backend is running on correct port
4. Check CORS configuration in Spring Boot

## 📖 Documentation

- `INTEGRATION.md` - Detailed backend integration guide
- `src/types/index.ts` - TypeScript interface reference
- Inline code comments - Implementation notes

## ⚠️ Important Notes

- **All data is mocked** until you integrate with your backend
- **Search for `TODO`** in code to find integration points
- **JWT tokens are stored in localStorage** - ensure your backend validates them
- **CORS must be configured** in your Spring Boot backend

## 🤝 Ready for Production

This UI is production-ready with:
- Proper error boundaries
- Loading states
- Responsive design
- Accessibility basics
- Type safety
- Clean code structure

Simply replace the mock services with your real Spring Boot APIs and deploy!

## 📄 License

MIT License - Use freely for your projects.
