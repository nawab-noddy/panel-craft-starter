import { useState, useEffect, useMemo } from "react";
import { MainLayout } from "@/components/MainLayout";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { UserKycStatusDTO } from "@/types";
import { getUsersKyc } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const UsersKyc = () => {
  const [usersKyc, setUsersKyc] = useState<UserKycStatusDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name,asc");
  const { toast } = useToast();

  const pageSize = 10;

  useEffect(() => {
    loadUsersKyc();
  }, []); // Load once

  const loadUsersKyc = async () => {
    setLoading(true);
    try {
      const data = await getUsersKyc();
      setUsersKyc(data);
    } catch (error) {
      console.error("Failed to load user KYC status:", error);
      toast({
        title: "Error",
        description: "Failed to load User KYC data from backend",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- Client-side filtering and sorting ---
  const processedData = useMemo(() => {
    if (!usersKyc) return [];

    let filtered = [...usersKyc];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchLower) ||
          u.mobileNumber.includes(searchLower) ||
          u.kycStatus.toLowerCase().includes(searchLower),
      );
    }

    if (sort) {
      const [field, order] = sort.split(",") as [keyof UserKycStatusDTO, "asc" | "desc"];
      filtered.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return order === "desc" ? -comparison : comparison;
      });
    }

    return filtered;
  }, [usersKyc, search, sort]);

  // Client-side pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    page * pageSize,
    (page + 1) * pageSize,
  );
  // ------------------------------------------

  const getKycBadgeVariant = (
    status: UserKycStatusDTO["kycStatus"],
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "VERIFIED":
        return "default"; // 'default' is green in your theme (success)
      case "PENDING":
        return "secondary"; // 'secondary' is blue (accent)
      case "REJECTED":
        return "destructive";
      case "NOT_SUBMITTED":
        return "outline";
      default:
        return "outline";
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "mobileNumber",
      label: "Mobile",
      sortable: true,
    },
    {
      key: "kycStatus",
      label: "KYC Status",
      sortable: true,
      render: (user: UserKycStatusDTO) => (
        <Badge variant={getKycBadgeVariant(user.kycStatus)}>
          {user.kycStatus}
        </Badge>
      ),
    },
    {
      key: "kycSubmitted",
      label: "Submitted?",
      sortable: true,
      render: (user: UserKycStatusDTO) => (user.kycSubmitted ? "Yes" : "No"),
    },
    {
      key: "userId",
      label: "User ID",
      sortable: true,
    },
  ];

  if (loading && !usersKyc) {
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
          <h1>User KYC Status</h1>
        </div>

        {usersKyc && (
          <DataTable
            data={paginatedData}
            columns={columns}
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
            onSearch={setSearch}
            onSort={(key, direction) => setSort(`${key},${direction}`)}
            searchPlaceholder="Search by name, mobile, or status..."
          />
        )}
      </div>
    </MainLayout>
  );
};

export default UsersKyc;