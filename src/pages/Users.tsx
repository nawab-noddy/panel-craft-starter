import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash, UserPlus } from 'lucide-react';
import { User, PaginatedResponse } from '@/types';
import { getUsers } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { UserDetailsDialog } from '@/components/UserDetailsDialog';

const Users = () => {
  const [users, setUsers] = useState<PaginatedResponse<User> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('email,asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  const pageSize = 10;

  useEffect(() => {
    loadUsers();
  }, [page, search, sort]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers({ page, size: pageSize, search, sort });
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleEdit = (user: User) => {
    toast({
      title: 'Edit User',
      description: `Editing ${user.email} - In production, this would open an edit form`,
    });
  };

  const handleDelete = (user: User) => {
    toast({
      title: 'Delete User',
      description: `Would delete ${user.email} - Confirmation dialog in production`,
      variant: 'destructive',
    });
  };

  const columns = [
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (user: User) => `${user.firstName} ${user.lastName}`,
    },
    {
      key: 'roles',
      label: 'Roles',
      render: (user: User) => (
        <div className="flex gap-1">
          {user.roles.map((role) => (
            <Badge key={role.id} variant="secondary">
              {role.name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (user: User) => (
        <Badge
          variant={
            user.status === 'active'
              ? 'default'
              : user.status === 'inactive'
              ? 'secondary'
              : 'destructive'
          }
        >
          {user.status}
        </Badge>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (user: User) =>
        user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never',
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem onClick={() => handleView(user)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(user)}
              className="text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (loading && !users) {
    return (
      <MainLayout>
        <div className="flex h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Users</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {users && (
          <DataTable
            data={users.content}
            columns={columns}
            totalPages={users.totalPages}
            currentPage={page}
            onPageChange={setPage}
            onSearch={setSearch}
            onSort={(key, direction) => setSort(`${key},${direction}`)}
            searchPlaceholder="Search by email or name..."
          />
        )}
      </div>

      <UserDetailsDialog
        user={selectedUser}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </MainLayout>
  );
};

export default Users;
