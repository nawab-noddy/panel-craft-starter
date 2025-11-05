import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New user registered',
    message: 'John Doe has created a new account',
    type: 'info',
    timestamp: '2025-11-04T14:30:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'System update scheduled',
    message: 'Maintenance window: Tonight 2 AM - 4 AM',
    type: 'warning',
    timestamp: '2025-11-04T12:00:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Backup completed',
    message: 'Daily backup finished successfully',
    type: 'success',
    timestamp: '2025-11-04T09:00:00Z',
    read: true,
  },
  {
    id: '4',
    title: 'Failed login attempt',
    message: 'Multiple failed logins detected for user@example.com',
    type: 'error',
    timestamp: '2025-11-04T08:15:00Z',
    read: false,
  },
  {
    id: '5',
    title: 'New feature available',
    message: 'Check out the new analytics dashboard',
    type: 'info',
    timestamp: '2025-11-03T16:30:00Z',
    read: true,
  },
];
