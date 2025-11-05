import { DashboardStats, ChartDataPoint, AuditLog } from '@/types';

export const mockDashboardStats: DashboardStats = {
  totalUsers: 1284,
  activeUsers: 892,
  totalRevenue: 45678.90,
  revenueChange: 12.5,
  newSignups: 156,
  signupsChange: -3.2,
  activeSessionsCount: 423,
  sessionsChange: 8.7,
};

export const mockChartData: Record<string, ChartDataPoint[]> = {
  '7d': [
    { date: '2025-10-29', value: 420 },
    { date: '2025-10-30', value: 385 },
    { date: '2025-10-31', value: 410 },
    { date: '2025-11-01', value: 445 },
    { date: '2025-11-02', value: 398 },
    { date: '2025-11-03', value: 432 },
    { date: '2025-11-04', value: 456 },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 200) + 350,
  })),
  '90d': Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 250) + 300,
  })),
  '1y': Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2024, i, 1).toISOString().split('T')[0],
    value: Math.floor(Math.random() * 300) + 400,
  })),
};

export const mockPieData = [
  { name: 'Admin', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Manager', value: 120, fill: 'hsl(var(--chart-2))' },
  { name: 'User', value: 680, fill: 'hsl(var(--chart-3))' },
  { name: 'Support', value: 215, fill: 'hsl(var(--chart-4))' },
];

export const mockRecentActivity: AuditLog[] = [
  {
    id: '1',
    userId: '1',
    userEmail: 'admin@example.com',
    action: 'User Created',
    resource: 'users',
    timestamp: '2025-11-04T14:30:00Z',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    userId: '2',
    userEmail: 'jane.manager@example.com',
    action: 'Role Updated',
    resource: 'roles',
    timestamp: '2025-11-04T13:15:00Z',
    ipAddress: '192.168.1.101',
  },
  {
    id: '3',
    userId: '1',
    userEmail: 'admin@example.com',
    action: 'Settings Modified',
    resource: 'settings',
    timestamp: '2025-11-04T12:00:00Z',
    ipAddress: '192.168.1.100',
  },
  {
    id: '4',
    userId: '4',
    userEmail: 'alice.support@example.com',
    action: 'Password Reset',
    resource: 'users',
    timestamp: '2025-11-04T11:30:00Z',
    ipAddress: '192.168.1.102',
  },
  {
    id: '5',
    userId: '6',
    userEmail: 'sarah.admin@example.com',
    action: 'User Suspended',
    resource: 'users',
    timestamp: '2025-11-04T10:45:00Z',
    ipAddress: '192.168.1.103',
  },
];
