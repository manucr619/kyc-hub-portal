
export enum KycCustomerType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS'
}

export enum KycTransactionStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  FLAGGED = 'FLAGGED'
}

export enum KycVerificationLevel {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ENHANCED = 'ENHANCED'
}

export enum KycCredentialStatus {
  VALID = 'VALID',
  PENDING = 'PENDING',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
}

export enum ConsentStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING'
}

export interface Bank {
  id: string;
  name: string;
  country: string;
  licenseNumber: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  type: KycCustomerType;
  primaryIdentifier: string;
  secondaryIdentifier?: string;
  name: string;
  country: string;
  dateOfBirth?: string;
  taxId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KycCredential {
  id: string;
  customerId: string;
  issuerId: string;
  verificationLevel: KycVerificationLevel;
  status: KycCredentialStatus;
  credentialHash: string;
  digitalSignature: string;
  issuanceDate: string;
  expiryDate: string;
  revokedAt?: string;
}

export interface Transaction {
  id: string;
  originatorId: string;
  beneficiaryId: string;
  amount: number;
  currency: string;
  status: KycTransactionStatus;
  date: string;
  referenceNumber: string;
  riskScore?: number;
}

export interface Consent {
  id: string;
  customerId: string;
  requestingEntityId: string;
  dataScope: string;
  status: ConsentStatus;
  startDate: string;
  endDate: string;
  consentToken: string;
}

export interface DataRequest {
  id: string;
  requestingEntityId: string;
  targetEntityId: string;
  customerId: string;
  dataType: string;
  status: string;
  consentId?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

export interface RegulatoryRequirement {
  id: string;
  country: string;
  requirementType: string;
  description: string;
  effectiveDate: string;
  documentationUrl: string;
}
