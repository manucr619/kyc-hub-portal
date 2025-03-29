
import React from 'react';
import {
  BarChart3,
  FileCheck,
  ArrowRightLeft,
  FileHeart,
  AlertTriangle,
  Users,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { StatCard } from '@/components/StatCard';
import {
  kycStats,
  transactionStats,
  consentStats,
  mockCredentials,
  mockTransactions,
  mockAuditLogs
} from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  // Calculate statistics for the chart
  const credentialDistribution = [
    { status: 'Valid', count: kycStats.valid, color: 'bg-green-500' },
    { status: 'Pending', count: kycStats.pending, color: 'bg-yellow-500' },
    { status: 'Expired', count: kycStats.expired, color: 'bg-red-500' },
    { status: 'Revoked', count: kycStats.revoked, color: 'bg-gray-500' },
  ];

  const latestCredentials = mockCredentials.slice(0, 3);
  const latestTransactions = mockTransactions.slice(0, 3);
  const latestAuditLogs = mockAuditLogs.slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total KYC Credentials"
          value={kycStats.total}
          description="Active and historical credentials"
          icon={<FileCheck className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Transactions Monitored"
          value={transactionStats.total}
          description={`Total value: $${transactionStats.totalValue.toLocaleString()}`}
          icon={<ArrowRightLeft className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Active Consents"
          value={consentStats.active}
          description={`Out of ${consentStats.total} total consents`}
          icon={<FileHeart className="h-4 w-4" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Flagged Transactions"
          value={transactionStats.flagged}
          description="Requiring review"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* KYC Credential Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">KYC Credentials Status</CardTitle>
            <CardDescription>Distribution of credential statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {credentialDistribution.map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                  <Progress
                    value={(item.count / kycStats.total) * 100}
                    className={`h-2 ${item.color}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestAuditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 pb-4 border-b last:border-0 last:pb-0">
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                    {log.entityType === 'KYC_CREDENTIAL' && <FileCheck className="h-4 w-4" />}
                    {log.entityType === 'TRANSACTION' && <ArrowRightLeft className="h-4 w-4" />}
                    {log.entityType === 'CONSENT' && <FileHeart className="h-4 w-4" />}
                    {log.entityType === 'CUSTOMER' && <Users className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Recent Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Credentials</CardTitle>
            <CardDescription>Latest KYC credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestCredentials.map((credential) => (
                <div key={credential.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      <FileCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">ID: {credential.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {`Issued: ${new Date(credential.issuanceDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={credential.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <CardDescription>Latest financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <ArrowRightLeft className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {`${transaction.currency} ${transaction.amount.toLocaleString()}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {`Ref: ${transaction.referenceNumber}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <StatusBadge status={transaction.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
