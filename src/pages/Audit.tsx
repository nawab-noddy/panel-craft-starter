import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditLog, PaginatedResponse } from '@/types';
import { getAuditLogs } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';

const Audit = () => {
  const [logs, setLogs] = useState<PaginatedResponse<AuditLog> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();

  const pageSize = 15;

  useEffect(() => {
    loadLogs();
  }, [page]);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs({ page, size: pageSize });
      setLogs(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load audit logs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'timestamp',
      label: 'Timestamp',
      sortable: true,
      render: (log: AuditLog) => new Date(log.timestamp).toLocaleString(),
    },
    {
      key: 'userEmail',
      label: 'User',
      sortable: true,
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
    },
    {
      key: 'resource',
      label: 'Resource',
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
    },
  ];

  if (loading && !logs) {
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
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1>Audit Logs</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {logs && (
              <DataTable
                data={logs.content}
                columns={columns}
                totalPages={logs.totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Audit;
