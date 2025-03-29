
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileBarChart2, FileSearch, Download, Calendar, Filter, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockAuditLogs } from '@/data/mockData';

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);
};

// Function to get icon for entity type
const getEntityTypeIcon = (entityType: string) => {
  switch (entityType) {
    case 'KYC_CREDENTIAL':
      return <FileText className="h-4 w-4" />;
    case 'TRANSACTION':
      return <FileBarChart2 className="h-4 w-4" />;
    default:
      return <FileSearch className="h-4 w-4" />;
  }
};

export default function Audit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('audit-logs');

  // Filter audit logs based on search query
  const filteredLogs = mockAuditLogs.filter(log => 
    log.entityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Audit & Reports</h1>
          <p className="text-muted-foreground">Monitor system activity and generate compliance reports</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search logs..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm font-medium">System Activity</CardTitle>
            <FileBarChart2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{mockAuditLogs.length} events</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm font-medium">KYC Verification Rate</CardTitle>
            <FileSearch className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm font-medium">Risk Assessment</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">Low Risk</div>
            <p className="text-xs text-muted-foreground">System health status</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different report types */}
      <Card>
        <CardHeader>
          <CardTitle>System Reports</CardTitle>
          <CardDescription>View and export system activity logs and compliance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="audit-logs" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
              <TabsTrigger value="compliance-reports">Compliance Reports</TabsTrigger>
              <TabsTrigger value="kyc-metrics">KYC Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="audit-logs" className="mt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Date Range
                  </Button>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Entity Type</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Performed By</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{formatDate(log.timestamp)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="p-1 rounded-md bg-gray-100 dark:bg-gray-800">
                                {getEntityTypeIcon(log.entityType)}
                              </div>
                              {log.entityType.replace('_', ' ')}
                            </div>
                          </TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.performedBy}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No logs found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="compliance-reports" className="mt-0">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Monthly Compliance Summary", date: "Generated: Aug 1, 2023", icon: <FileBarChart2 className="h-8 w-8" /> },
                    { title: "Quarterly Regulatory Report", date: "Generated: Jul 15, 2023", icon: <FileText className="h-8 w-8" /> },
                    { title: "Annual AML Assessment", date: "Generated: Jan 5, 2023", icon: <FileSearch className="h-8 w-8" /> },
                    { title: "Risk Analysis Report", date: "Generated: Jul 30, 2023", icon: <FileBarChart2 className="h-8 w-8" /> },
                  ].map((report, index) => (
                    <Card key={index} className="flex flex-row items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                      <div className="p-4 rounded-full bg-primary/10 mr-4">
                        {report.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button>
                    <FileBarChart2 className="mr-2 h-4 w-4" />
                    Generate New Report
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="kyc-metrics" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">KYC Verification Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Individual Customers</span>
                            <span className="text-sm font-medium">95.3%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[95.3%]"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Business Customers</span>
                            <span className="text-sm font-medium">86.7%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[86.7%]"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">International Transactions</span>
                            <span className="text-sm font-medium">92.1%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[92.1%]"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance by Region</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>North America</span>
                          </div>
                          <span className="font-medium">98.2%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>Europe</span>
                          </div>
                          <span className="font-medium">97.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span>Asia Pacific</span>
                          </div>
                          <span className="font-medium">89.3%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <span>Latin America</span>
                          </div>
                          <span className="font-medium">84.7%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span>Africa</span>
                          </div>
                          <span className="font-medium">76.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trend Analysis</CardTitle>
                    <CardDescription>KYC metrics over the last 12 months</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <p className="text-muted-foreground">Area chart would be displayed here</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
