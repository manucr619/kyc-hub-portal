
import React, { useState } from 'react';
import { Users, Search, Plus, Filter, User, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCustomers, mockCredentials } from '@/data/mockData';
import { Customer, KycCustomerType } from '@/types/kyc';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StatusBadge } from '@/components/StatusBadge';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Filter customers based on search term and type
  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.primaryIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customer.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'individual') return matchesSearch && customer.type === KycCustomerType.INDIVIDUAL;
    if (activeTab === 'business') return matchesSearch && customer.type === KycCustomerType.BUSINESS;
    
    return matchesSearch;
  });

  // Get customer credentials
  const getCustomerCredentials = (customerId: string) => {
    return mockCredentials.filter(cred => cred.customerId === customerId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Customer Management</h1>
          <p className="text-muted-foreground">Central registry for all customer information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="sm:w-auto w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Enter the new customer details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="individual">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="individual">Individual</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                </TabsList>
                <TabsContent value="individual" className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Full Name</label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="identifier">Primary Identifier (SSN/ID)</label>
                    <Input id="identifier" placeholder="Enter identifier" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="dob">Date of Birth</label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="country">Country</label>
                    <Input id="country" placeholder="Enter country" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tax-id">Tax ID</label>
                    <Input id="tax-id" placeholder="Enter tax ID (optional)" />
                  </div>
                </TabsContent>
                <TabsContent value="business" className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="business-name">Business Name</label>
                    <Input id="business-name" placeholder="Enter business name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="business-id">Business Identifier (EIN/VAT)</label>
                    <Input id="business-id" placeholder="Enter identifier" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="secondary-id">Secondary Identifier (optional)</label>
                    <Input id="secondary-id" placeholder="Enter secondary identifier" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="business-country">Country</label>
                    <Input id="business-country" placeholder="Enter country" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="business-tax-id">Tax ID</label>
                    <Input id="business-tax-id" placeholder="Enter tax ID" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DialogFooter>
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button className="w-full sm:w-auto">Add Customer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="individual">Individuals</TabsTrigger>
            <TabsTrigger value="business">Businesses</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Customer List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Card 
            key={customer.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCustomer(customer)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {customer.type === KycCustomerType.INDIVIDUAL ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Building className="h-4 w-4" />
                  )}
                </div>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>{customer.country}</span>
                <span>•</span>
                <span>{customer.type === KycCustomerType.INDIVIDUAL ? 'Individual' : 'Business'}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">ID:</span>
                <span className="font-medium">{customer.primaryIdentifier}</span>
              </div>
              {customer.secondaryIdentifier && (
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Secondary ID:</span>
                  <span>{customer.secondaryIdentifier}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">
                  {customer.type === KycCustomerType.INDIVIDUAL ? 'Birth Date:' : 'Tax ID:'}
                </span>
                <span>
                  {customer.type === KycCustomerType.INDIVIDUAL 
                    ? customer.dateOfBirth && new Date(customer.dateOfBirth).toLocaleDateString()
                    : customer.taxId
                  }
                </span>
              </div>
              <div className="mt-4 border-t pt-3">
                <span className="text-xs text-muted-foreground">KYC Credentials:</span>
                <div className="flex gap-1 mt-1">
                  {getCustomerCredentials(customer.id).map((cred) => (
                    <StatusBadge key={cred.id} status={cred.status} className="mr-1" />
                  ))}
                  {getCustomerCredentials(customer.id).length === 0 && (
                    <span className="text-xs italic text-muted-foreground">No credentials</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={(open) => !open && setSelectedCustomer(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCustomer?.type === KycCustomerType.INDIVIDUAL ? (
                <User className="h-5 w-5" />
              ) : (
                <Building className="h-5 w-5" />
              )}
              <span>{selectedCustomer?.name}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedCustomer?.type === KycCustomerType.INDIVIDUAL ? 'Individual' : 'Business'} customer from {selectedCustomer?.country}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Primary ID</div>
                <div>{selectedCustomer.primaryIdentifier}</div>
                {selectedCustomer.secondaryIdentifier && (
                  <>
                    <div className="font-medium">Secondary ID</div>
                    <div>{selectedCustomer.secondaryIdentifier}</div>
                  </>
                )}
                <div className="font-medium">Country</div>
                <div>{selectedCustomer.country}</div>
                {selectedCustomer.type === KycCustomerType.INDIVIDUAL && selectedCustomer.dateOfBirth && (
                  <>
                    <div className="font-medium">Date of Birth</div>
                    <div>{new Date(selectedCustomer.dateOfBirth).toLocaleDateString()}</div>
                  </>
                )}
                {selectedCustomer.taxId && (
                  <>
                    <div className="font-medium">Tax ID</div>
                    <div>{selectedCustomer.taxId}</div>
                  </>
                )}
                <div className="font-medium">Customer Since</div>
                <div>{new Date(selectedCustomer.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">KYC Credentials</h4>
                {getCustomerCredentials(selectedCustomer.id).length > 0 ? (
                  <div className="space-y-2">
                    {getCustomerCredentials(selectedCustomer.id).map((cred) => (
                      <div key={cred.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                        <div>
                          <div className="text-sm font-medium">ID: {cred.id}</div>
                          <div className="text-xs text-muted-foreground">
                            Level: {cred.verificationLevel}
                          </div>
                        </div>
                        <StatusBadge status={cred.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground italic">
                    No credentials found for this customer.
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedCustomer(null)}>Close</Button>
            <Button variant="default" className="w-full sm:w-auto">Edit Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-10">
          <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No customers found</h3>
          <p className="text-muted-foreground">Try changing your search criteria.</p>
        </div>
      )}
    </div>
  );
}
