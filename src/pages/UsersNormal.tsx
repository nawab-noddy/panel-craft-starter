import { useState, useEffect, useMemo } from "react"; // <-- CHANGE 1: Added useMemo
import { MainLayout } from "@/components/MainLayout";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { UserNormal } from "@/types";
import { getUsersNormal } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const UsersNormal = () => {
  const [users, setUsers] = useState<UserNormal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("fullName,asc");
  const { toast } = useToast();

  const pageSize = 10;

  useEffect(() => {
    loadUsers();
  }, []); // Load once

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Fetch all users from our real API
      const data = await getUsersNormal();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast({
        title: "Error",
        description: "Failed to load normal users from backend",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Client-side filtering and sorting ---
  // NOTE: This is fine for small datasets. For production, you'd want backend pagination/search.
  const processedData = useMemo(() => { // <-- CHANGE 2: Removed "React."
    if (!users) return [];

    let filtered = [...users];

    // Filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.fullName.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower) ||
          u.mobileNumber.includes(searchLower),
      );
    }

    // Sort
    if (sort) {
      const [field, order] = sort.split(",") as [keyof UserNormal, "asc" | "desc"];
      filtered.sort((a, b) => {
        // Handle potential null or undefined values
        const aVal = a[field] ?? "";
        const bVal = b[field] ?? "";
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.localeCompare(bVal);
          return order === "desc" ? -comparison : comparison;
        }

        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return order === "desc" ? -comparison : comparison;
      });
    }

    return filtered;
  }, [users, search, sort]);

  // Client-side pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  // ------------------------------------------

  const columns = [
    {
      key: "fullName",
      label: "Full Name",
      sortable: true,
    },
    {
      key: "mobileNumber",
      label: "Mobile",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "active",
      label: "Status",
      sortable: true,
      render: (user: UserNormal) => (
        <Badge variant={user.active ? "default" : "secondary"}>
          {user.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "verified",
      label: "Verified",
      sortable: true,
      render: (user: UserNormal) => (
        <Badge variant={user.verified ? "default" : "destructive"}>
          {user.verified ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (user: UserNormal) =>
        user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
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
          <h1>Normal Users</h1>
          {/* <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button> */}
        </div>

        {users && (
          <DataTable
            data={paginatedData}
            columns={columns}
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
            onSearch={setSearch}
            onSort={(key, direction) => setSort(`${key},${direction}`)}
            searchPlaceholder="Search by name, email, or mobile..."
          />
        )}
      </div>
    </MainLayout>
  );
};

export default UsersNormal;