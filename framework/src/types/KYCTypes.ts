// framework/src/types/KYCTypes.ts
// Simple type definitions for KYC forms - easy to understand and use

/**
 * Simple address structure used across forms
 */
export interface Address {
  addressLine1: string;
  addressLine2?: string;
  town: string;
  county?: string;
  postcode: string;
  country?: string;
}

/**
 * Simple dependent information
 */
export interface Dependent {
  firstName: string;
  surname: string;
  dateOfBirth?: string;
  relationship: string;
}

/**
 * Third party information for fact find
 */
export interface ThirdParty {
  title?: string;
  firstName: string;
  surname: string;
  relationship: string;
  contactNumber?: string;
  address?: Address;
}