
import { 
  Bank, 
  Customer, 
  KycCredential, 
  Transaction, 
  Consent, 
  DataRequest, 
  AuditLog,
  KycCustomerType,
  KycTransactionStatus,
  KycVerificationLevel,
  KycCredentialStatus,
  ConsentStatus
} from '../types/kyc';

export const mockBanks: Bank[] = [
  {
    id: '1',
    name: 'Global Finance Bank',
    country: 'United States',
    licenseNumber: 'GFB-123456',
    active: true,
    createdAt: '2022-01-15T08:30:00Z',
    updatedAt: '2023-03-20T14:15:00Z'
  },
  {
    id: '2',
    name: 'European Credit Union',
    country: 'Germany',
    licenseNumber: 'ECU-789012',
    active: true,
    createdAt: '2022-02-10T10:45:00Z',
    updatedAt: '2023-04-05T09:20:00Z'
  },
  {
    id: '3',
    name: 'Asia Pacific Banking Corp',
    country: 'Singapore',
    licenseNumber: 'APBC-345678',
    active: true,
    createdAt: '2022-03-05T07:15:00Z',
    updatedAt: '2023-02-18T11:30:00Z'
  },
  {
    id: '4',
    name: 'Atlantic Financial Services',
    country: 'United Kingdom',
    licenseNumber: 'AFS-901234',
    active: true,
    createdAt: '2022-04-20T13:10:00Z',
    updatedAt: '2023-01-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'Northern Trust Bank',
    country: 'Canada',
    licenseNumber: 'NTB-567890',
    active: false,
    createdAt: '2022-05-18T09:25:00Z',
    updatedAt: '2023-05-01T10:10:00Z'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    type: KycCustomerType.INDIVIDUAL,
    primaryIdentifier: 'SSN-123-45-6789',
    name: 'John Smith',
    country: 'United States',
    dateOfBirth: '1985-06-12',
    taxId: 'TAX-987654321',
    createdAt: '2022-07-10T14:25:00Z',
    updatedAt: '2023-04-15T09:30:00Z'
  },
  {
    id: '2',
    type: KycCustomerType.BUSINESS,
    primaryIdentifier: 'EIN-12-3456789',
    secondaryIdentifier: 'DUNS-123456789',
    name: 'Acme Corporation',
    country: 'United States',
    taxId: 'TAX-123456789',
    createdAt: '2022-08-05T11:15:00Z',
    updatedAt: '2023-03-20T16:40:00Z'
  },
  {
    id: '3',
    type: KycCustomerType.INDIVIDUAL,
    primaryIdentifier: 'NIN-AB123456C',
    name: 'Emma Johnson',
    country: 'United Kingdom',
    dateOfBirth: '1990-09-23',
    taxId: 'TAX-UKJOHN90',
    createdAt: '2022-06-18T08:05:00Z',
    updatedAt: '2023-02-10T13:50:00Z'
  },
  {
    id: '4',
    type: KycCustomerType.BUSINESS,
    primaryIdentifier: 'VAT-DE123456789',
    name: 'Technik GmbH',
    country: 'Germany',
    taxId: 'TAX-DE987654321',
    createdAt: '2022-09-12T15:35:00Z',
    updatedAt: '2023-05-02T10:20:00Z'
  },
  {
    id: '5',
    type: KycCustomerType.INDIVIDUAL,
    primaryIdentifier: 'NRIC-S1234567D',
    name: 'Wei Lin Chen',
    country: 'Singapore',
    dateOfBirth: '1982-11-30',
    taxId: 'TAX-SG12345',
    createdAt: '2022-10-08T12:40:00Z',
    updatedAt: '2023-04-25T09:15:00Z'
  }
];

export const mockCredentials: KycCredential[] = [
  {
    id: '1',
    customerId: '1',
    issuerId: '1',
    verificationLevel: KycVerificationLevel.ENHANCED,
    status: KycCredentialStatus.VALID,
    credentialHash: 'a1b2c3d4e5f6g7h8i9j0',
    digitalSignature: 'sig_GFB_123456_valid',
    issuanceDate: '2023-01-15T10:30:00Z',
    expiryDate: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    customerId: '2',
    issuerId: '1',
    verificationLevel: KycVerificationLevel.ENHANCED,
    status: KycCredentialStatus.VALID,
    credentialHash: 'b2c3d4e5f6g7h8i9j0k1',
    digitalSignature: 'sig_GFB_987654_valid',
    issuanceDate: '2023-02-20T14:25:00Z',
    expiryDate: '2024-02-20T14:25:00Z'
  },
  {
    id: '3',
    customerId: '3',
    issuerId: '4',
    verificationLevel: KycVerificationLevel.STANDARD,
    status: KycCredentialStatus.EXPIRED,
    credentialHash: 'c3d4e5f6g7h8i9j0k1l2',
    digitalSignature: 'sig_AFS_543210_expired',
    issuanceDate: '2022-03-10T09:15:00Z',
    expiryDate: '2023-03-10T09:15:00Z'
  },
  {
    id: '4',
    customerId: '4',
    issuerId: '2',
    verificationLevel: KycVerificationLevel.STANDARD,
    status: KycCredentialStatus.VALID,
    credentialHash: 'd4e5f6g7h8i9j0k1l2m3',
    digitalSignature: 'sig_ECU_135790_valid',
    issuanceDate: '2023-04-05T16:40:00Z',
    expiryDate: '2024-04-05T16:40:00Z'
  },
  {
    id: '5',
    customerId: '5',
    issuerId: '3',
    verificationLevel: KycVerificationLevel.BASIC,
    status: KycCredentialStatus.PENDING,
    credentialHash: 'e5f6g7h8i9j0k1l2m3n4',
    digitalSignature: 'sig_APBC_246802_pending',
    issuanceDate: '2023-05-12T11:20:00Z',
    expiryDate: '2024-05-12T11:20:00Z'
  },
  {
    id: '6',
    customerId: '1',
    issuerId: '3',
    verificationLevel: KycVerificationLevel.BASIC,
    status: KycCredentialStatus.REVOKED,
    credentialHash: 'f6g7h8i9j0k1l2m3n4o5',
    digitalSignature: 'sig_APBC_654321_revoked',
    issuanceDate: '2022-12-18T13:10:00Z',
    expiryDate: '2023-12-18T13:10:00Z',
    revokedAt: '2023-03-25T09:45:00Z'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    originatorId: '1',
    beneficiaryId: '3',
    amount: 15000.00,
    currency: 'USD',
    status: KycTransactionStatus.VERIFIED,
    date: '2023-05-15T11:30:00Z',
    referenceNumber: 'TRX-123456',
    riskScore: 20
  },
  {
    id: '2',
    originatorId: '2',
    beneficiaryId: '4',
    amount: 45000.00,
    currency: 'EUR',
    status: KycTransactionStatus.PENDING,
    date: '2023-05-16T14:20:00Z',
    referenceNumber: 'TRX-234567',
    riskScore: 45
  },
  {
    id: '3',
    originatorId: '5',
    beneficiaryId: '2',
    amount: 25000.00,
    currency: 'SGD',
    status: KycTransactionStatus.VERIFIED,
    date: '2023-05-17T09:45:00Z',
    referenceNumber: 'TRX-345678',
    riskScore: 15
  },
  {
    id: '4',
    originatorId: '3',
    beneficiaryId: '5',
    amount: 10000.00,
    currency: 'GBP',
    status: KycTransactionStatus.FLAGGED,
    date: '2023-05-18T16:10:00Z',
    referenceNumber: 'TRX-456789',
    riskScore: 75
  },
  {
    id: '5',
    originatorId: '4',
    beneficiaryId: '1',
    amount: 30000.00,
    currency: 'EUR',
    status: KycTransactionStatus.REJECTED,
    date: '2023-05-19T13:25:00Z',
    referenceNumber: 'TRX-567890',
    riskScore: 85
  }
];

export const mockConsents: Consent[] = [
  {
    id: '1',
    customerId: '1',
    requestingEntityId: '2',
    dataScope: 'BASIC_IDENTIFICATION',
    status: ConsentStatus.ACTIVE,
    startDate: '2023-04-10T09:15:00Z',
    endDate: '2023-10-10T09:15:00Z',
    consentToken: 'consent_token_123456'
  },
  {
    id: '2',
    customerId: '2',
    requestingEntityId: '3',
    dataScope: 'FULL_FINANCIAL_PROFILE',
    status: ConsentStatus.ACTIVE,
    startDate: '2023-03-15T14:30:00Z',
    endDate: '2023-09-15T14:30:00Z',
    consentToken: 'consent_token_234567'
  },
  {
    id: '3',
    customerId: '3',
    requestingEntityId: '1',
    dataScope: 'TRANSACTION_HISTORY',
    status: ConsentStatus.EXPIRED,
    startDate: '2022-11-20T10:45:00Z',
    endDate: '2023-05-20T10:45:00Z',
    consentToken: 'consent_token_345678'
  },
  {
    id: '4',
    customerId: '4',
    requestingEntityId: '5',
    dataScope: 'BUSINESS_OWNERSHIP',
    status: ConsentStatus.REVOKED,
    startDate: '2023-01-25T16:20:00Z',
    endDate: '2023-07-25T16:20:00Z',
    consentToken: 'consent_token_456789'
  },
  {
    id: '5',
    customerId: '5',
    requestingEntityId: '4',
    dataScope: 'BASIC_IDENTIFICATION',
    status: ConsentStatus.PENDING,
    startDate: '2023-05-18T11:10:00Z',
    endDate: '2023-11-18T11:10:00Z',
    consentToken: 'consent_token_567890'
  }
];

export const mockDataRequests: DataRequest[] = [
  {
    id: '1',
    requestingEntityId: '1',
    targetEntityId: '2',
    customerId: '3',
    dataType: 'KYC_VERIFICATION',
    status: 'PENDING',
    consentId: '3',
    createdAt: '2023-05-20T13:45:00Z'
  },
  {
    id: '2',
    requestingEntityId: '4',
    targetEntityId: '3',
    customerId: '5',
    dataType: 'TRANSACTION_HISTORY',
    status: 'APPROVED',
    consentId: '5',
    createdAt: '2023-05-19T10:20:00Z',
    resolvedAt: '2023-05-20T09:15:00Z'
  },
  {
    id: '3',
    requestingEntityId: '2',
    targetEntityId: '5',
    customerId: '1',
    dataType: 'IDENTITY_VERIFICATION',
    status: 'REJECTED',
    createdAt: '2023-05-18T16:30:00Z',
    resolvedAt: '2023-05-19T14:40:00Z'
  },
  {
    id: '4',
    requestingEntityId: '3',
    targetEntityId: '1',
    customerId: '2',
    dataType: 'BUSINESS_OWNERSHIP',
    status: 'APPROVED',
    consentId: '2',
    createdAt: '2023-05-17T09:10:00Z',
    resolvedAt: '2023-05-18T11:25:00Z'
  },
  {
    id: '5',
    requestingEntityId: '5',
    targetEntityId: '4',
    customerId: '4',
    dataType: 'RISK_ASSESSMENT',
    status: 'PENDING',
    createdAt: '2023-05-20T15:05:00Z'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    entityType: 'KYC_CREDENTIAL',
    entityId: '1',
    action: 'ISSUE',
    performedBy: 'user_jdoe@globalfinancebank.com',
    timestamp: '2023-01-15T10:30:00Z',
    details: 'Enhanced KYC credential issued for Customer ID 1'
  },
  {
    id: '2',
    entityType: 'TRANSACTION',
    entityId: '4',
    action: 'FLAG',
    performedBy: 'system_aml_monitor',
    timestamp: '2023-05-18T16:15:00Z',
    details: 'Transaction flagged due to high risk score (75)'
  },
  {
    id: '3',
    entityType: 'CONSENT',
    entityId: '4',
    action: 'REVOKE',
    performedBy: 'user_emma.johnson@email.com',
    timestamp: '2023-03-12T09:20:00Z',
    details: 'Consent revoked by customer'
  },
  {
    id: '4',
    entityType: 'CUSTOMER',
    entityId: '2',
    action: 'UPDATE',
    performedBy: 'user_bsmith@globalfinancebank.com',
    timestamp: '2023-03-20T16:40:00Z',
    details: 'Business customer information updated'
  },
  {
    id: '5',
    entityType: 'KYC_CREDENTIAL',
    entityId: '6',
    action: 'REVOKE',
    performedBy: 'user_compliance@apbc.com',
    timestamp: '2023-03-25T09:45:00Z',
    details: 'KYC credential revoked due to suspicious activity'
  }
];

// Dashboard statistics
export const kycStats = {
  total: 6,
  valid: 3,
  pending: 1,
  expired: 1,
  revoked: 1
};

export const transactionStats = {
  total: 5,
  verified: 2,
  pending: 1,
  rejected: 1,
  flagged: 1,
  totalValue: 125000
};

export const consentStats = {
  total: 5,
  active: 2,
  pending: 1,
  expired: 1,
  revoked: 1
};
