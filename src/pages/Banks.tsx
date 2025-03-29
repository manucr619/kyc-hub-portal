
import React, { useState } from 'react';
import { Building2, Search, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockBanks } from '@/data/mockData';
import { Bank } from '@/types/kyc';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function Banks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  // Filter banks based on search term and filters
  const filteredBanks = mockBanks.filter((bank) => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bank.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bank.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActiveState = (showActive && bank.active) || (showInactive && !bank.active);
    const matchesCountry = !country || bank.country === country;
    
    return matchesSearch && matchesActiveState && matchesCountry;
  });

  // Get unique countries for filter
  const uniqueCountries = Array.from(new Set(mockBanks.map(bank => bank.country)));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">Bank Management</h1>
          <p className="text-muted-foreground">Manage bank entities in the network</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="sm:w-auto w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Bank
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bank</DialogTitle>
              <DialogDescription>
                Enter the details of the new bank entity.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Bank Name</Label>
                <Input id="name" placeholder="Enter bank name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="Enter country" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" placeholder="Enter license number" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="active" defaultChecked />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button className="w-full sm:w-auto">Add Bank</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search banks..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Status</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active-filter" checked={showActive} onCheckedChange={(checked) => setShowActive(!!checked)} />
                    <label htmlFor="active-filter" className="text-sm cursor-pointer">Active</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inactive-filter" checked={showInactive} onCheckedChange={(checked) => setShowInactive(!!checked)} />
                    <label htmlFor="inactive-filter" className="text-sm cursor-pointer">Inactive</label>
                  </div>
                </div>
                <div className="border-t my-2"></div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Country</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all-countries" 
                      checked={country === null}
                      onCheckedChange={(checked) => checked ? setCountry(null) : null} 
                    />
                    <label htmlFor="all-countries" className="text-sm cursor-pointer">All Countries</label>
                  </div>
                  {uniqueCountries.map((c) => (
                    <div key={c} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`country-${c}`} 
                        checked={country === c}
                        onCheckedChange={(checked) => checked ? setCountry(c) : setCountry(null)} 
                      />
                      <label htmlFor={`country-${c}`} className="text-sm cursor-pointer">{c}</label>
                    </div>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Bank Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBanks.map((bank) => (
          <Card 
            key={bank.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedBank(bank)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{bank.name}</CardTitle>
                {bank.active ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                    Inactive
                  </Badge>
                )}
              </div>
              <CardDescription>{bank.country}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">License:</span>
                <span className="font-medium">{bank.licenseNumber}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Added on:</span>
                <span>{new Date(bank.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bank Detail Dialog */}
      <Dialog open={!!selectedBank} onOpenChange={(open) => !open && setSelectedBank(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <span>{selectedBank?.name}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedBank && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Country</div>
                <div>{selectedBank.country}</div>
                <div className="font-medium">License Number</div>
                <div>{selectedBank.licenseNumber}</div>
                <div className="font-medium">Status</div>
                <div>
                  {selectedBank.active ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      Inactive
                    </Badge>
                  )}
                </div>
                <div className="font-medium">Created</div>
                <div>{new Date(selectedBank.createdAt).toLocaleDateString()}</div>
                <div className="font-medium">Last Updated</div>
                <div>{new Date(selectedBank.updatedAt).toLocaleDateString()}</div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">KYC Credentials Issued</h4>
                <div className="text-sm text-muted-foreground italic">
                  This bank has issued 12 KYC credentials.
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recent Transactions</h4>
                <div className="text-sm text-muted-foreground italic">
                  3 transactions in the past 30 days.
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedBank(null)}>Close</Button>
            <Button variant="default" className="w-full sm:w-auto">Edit Bank</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Empty State */}
      {filteredBanks.length === 0 && (
        <div className="text-center py-10">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No banks found</h3>
          <p className="text-muted-foreground">Try changing your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
