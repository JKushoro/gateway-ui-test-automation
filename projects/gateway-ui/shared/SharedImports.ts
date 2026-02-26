// projects/gateway-ui/shared/SharedImports.ts
// Centralized imports for Gateway UI project to eliminate duplication
// All KYC step files should import from here instead of individual imports

// Re-export everything from framework for easy access
export * from '@/framework/src';

// Commonly used Playwright imports
export { Page, Locator, expect } from '@playwright/test';

// Project-specific imports
export { BaseKYCSteps } from '@steps/kyc_forms/BaseKYCSteps';

// Type imports for better type safety
export type { Address, Dependent, ThirdParty } from '@/framework/src';