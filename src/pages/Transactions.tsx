
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRightLeft, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockTransactions } from '@/data/mockData';
import { Transaction } from '@/types/kyc';

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Filter transactions based on search query and active tab
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = 
      transaction.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.originatorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.beneficiaryId.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && transaction.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Calculate summary statistics
  const stats = {
    total: mockTransactions.length,
    pending: mockTransactions.filter(t => t.status === 'PENDING').length,
    verified: mockTransactions.filter(t => t.status === 'VERIFIED').length,
    rejected: mockTransactions.filter(t => t.status === 'REJECTED').length,
    flagged: mockTransactions.filter(t => t.status === 'FLAGGED').length,
  };

  // Format currency amount
  const formatCurrency = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Monitor and verify financial transactions across the network</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="rounded-full bg-yellow-100 p-1 dark:bg-yellow-900">
              <div className="h-4 w-4 text-yellow-600 dark:text-yellow-400">⏳</div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{stats.verified}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <div className="rounded-full bg-red-100 p-1 dark:bg-red-900">
              <div className="h-4 w-4 text-red-600 dark:text-red-400">❌</div>
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <div className="rounded-full bg-orange-100 p-1 dark:bg-orange-900">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{stats.flagged}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table with Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
          <CardDescription>View and manage all transactions in the KYC network</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Originator</TableHead>
                      <TableHead>Beneficiary</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction: Transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.referenceNumber}</TableCell>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>{transaction.originatorId}</TableCell>
                          <TableCell>{transaction.beneficiaryId}</TableCell>
                          <TableCell>{formatCurrency(transaction.amount, transaction.currency)}</TableCell>
                          <TableCell>
                            {transaction.riskScore ? (
                              <div className="flex items-center">
                                <div 
                                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                                    transaction.riskScore < 30 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                      : transaction.riskScore < 70 
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                  }`}>
                                  {transaction.riskScore}
                                </div>
                                {transaction.riskScore < 30 ? 'Low' : transaction.riskScore < 70 ? 'Medium' : 'High'}
                              </div>
                            ) : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={transaction.status} />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
