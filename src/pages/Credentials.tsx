
import React, { useState } from 'react';
import { FileCheck, Search, Plus, Filter, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCredentials, mockCustomers } from '@/data/mockData';
import { KycCredential, KycCredentialStatus, KycVerificationLevel } from '@/types/kyc';
import { StatusBadge } from '@/components/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function Credentials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<KycCredential | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Filter credentials based on search term and status
  const filteredCredentials = mockCredentials.filter((credential) => {
    const customer = mockCustomers.find(c => c.id === credential.customerId);
    
    const matchesSearch = 
      credential.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credential.credentialHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer?.name.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'valid') return matchesSearch && credential.status === KycCredentialStatus.VALID;
    if (activeTab === 'pending') return matchesSearch && credential.status === KycCredentialStatus.PENDING;
    if (activeTab === 'expired') return matchesSearch && credential.status === KycCredentialStatus.EXPIRED;
    if (activeTab === 'revoked') return matchesSearch && credential.status === KycCredentialStatus.REVOKED;
    
    return matchesSearch;
  });

  // Get customer name by ID
  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  // Get verification level color
  const getVerificationLevelColor = (level: KycVerificationLevel) => {
    switch (level) {
      case KycVerificationLevel.ENHANCED:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case KycVerificationLevel.STANDARD:
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case KycVerificationLevel.BASIC:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Is credential expired
  const isExpired = (credential: KycCredential) => {
    return new Date(credential.expiryDate) < new Date();
  };

  // Format time remaining
  const getTimeRemaining = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    
    if (now > expiry) {
      return 'Expired';
    }
    
    const diffMs = expiry.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays > 30) {
      return `${Math.floor(diffDays / 30)} months`;
    } else if (diffDays > 0) {
      return `${diffDays} days`;
    } else {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      return `${diffHours} hours`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1">KYC Credentials</h1>
          <p className="text-muted-foreground">Manage and verify customer KYC credentials</p>
        </div>
        <Button className="sm:w-auto w-full">
          <Plus className="h-4 w-4 mr-2" />
          Issue Credential
        </Button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="valid">Valid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="revoked">Revoked</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search credentials..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Credentials Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCredentials.map((credential) => (
          <Card 
            key={credential.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedCredential(credential)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Credential #{credential.id}</CardTitle>
                  <CardDescription>{getCustomerName(credential.customerId)}</CardDescription>
                </div>
                <StatusBadge status={credential.status} />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Verification Level:</span>
                <Badge variant="outline" className={getVerificationLevelColor(credential.verificationLevel)}>
                  {credential.verificationLevel}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Issuer:</span>
                <span className="font-medium">Bank #{credential.issuerId}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-muted-foreground">Issuance Date:</span>
                <span>{new Date(credential.issuanceDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t">
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center text-xs">
                  <Shield className="h-3 w-3 mr-1 text-primary" />
                  <span className="text-muted-foreground">Hash: </span>
                  <span className="font-mono ml-1">
                    {credential.credentialHash.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {credential.status !== KycCredentialStatus.REVOKED ? (
                    <span className={
                      isExpired(credential) 
                        ? 'text-red-500 dark:text-red-400' 
                        : 'text-muted-foreground'
                    }>
                      {getTimeRemaining(credential.expiryDate)}
                    </span>
                  ) : (
                    <span className="text-red-500 dark:text-red-400">
                      Revoked
                    </span>
                  )}
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Credential Detail Dialog */}
      <Dialog open={!!selectedCredential} onOpenChange={(open) => !open && setSelectedCredential(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              <span>Credential #{selectedCredential?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Issued to {selectedCredential && getCustomerName(selectedCredential.customerId)}
            </DialogDescription>
          </DialogHeader>
          {selectedCredential && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <StatusBadge status={selectedCredential.status} />
                <Badge variant="outline" className={getVerificationLevelColor(selectedCredential.verificationLevel)}>
                  {selectedCredential.verificationLevel}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Customer</div>
                <div>{getCustomerName(selectedCredential.customerId)}</div>
                <div className="font-medium">Issuer</div>
                <div>Bank #{selectedCredential.issuerId}</div>
                <div className="font-medium">Issuance Date</div>
                <div>{new Date(selectedCredential.issuanceDate).toLocaleDateString()}</div>
                <div className="font-medium">Expiry Date</div>
                <div>{new Date(selectedCredential.expiryDate).toLocaleDateString()}</div>
                {selectedCredential.revokedAt && (
                  <>
                    <div className="font-medium">Revoked Date</div>
                    <div>{new Date(selectedCredential.revokedAt).toLocaleDateString()}</div>
                  </>
                )}
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Credential Hash</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md font-mono text-xs break-all">
                  {selectedCredential.credentialHash}
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Digital Signature</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md font-mono text-xs break-all">
                  {selectedCredential.digitalSignature}
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setSelectedCredential(null)}>Close</Button>
            <Button variant="default" className="w-full sm:w-auto">Verify Credential</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Empty State */}
      {filteredCredentials.length === 0 && (
        <div className="text-center py-10">
          <FileCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No credentials found</h3>
          <p className="text-muted-foreground">Try changing your search criteria.</p>
        </div>
      )}
    </div>
  );
}
