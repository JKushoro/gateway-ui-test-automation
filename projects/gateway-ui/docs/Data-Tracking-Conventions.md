# Data Tracking Conventions

## Overview

This document outlines the data naming conventions implemented to provide clear tracking and comparison between gateway-generated data and KYC form data.

## Data Prefixes

### Gateway Data (`gateway.*`)
All data generated from gateway forms and client creation processes is stored with the `gateway.` prefix:

- `gateway.formData.*` - Data from gateway search forms
- `gateway.clientData.*` - Data from gateway client creation
- `gateway.searchData.complete` - Completed search form data

**Examples:**
```typescript
// Gateway search form data
dataStore.setValue('gateway.formData.contactForename', 'John');
dataStore.setValue('gateway.formData.contactSurname', 'Doe');
dataStore.setValue('gateway.searchData.complete', searchData);

// Gateway client creation data
dataStore.setValue('gateway.clientData.complete', clientResult);
dataStore.setValue('gateway.clientData.forename', 'John');
dataStore.setValue('gateway.clientData.surname', 'Doe');
```

### KYC Data (`kyc.*`)
All data from KYC forms is stored with the `kyc.` prefix:

- `kyc.personalData.*` - KYC Personal Details form data
- `kyc.currentSituation.*` - KYC Current Situation form data
- `kyc.*.source` - Source tracking (gateway vs direct)

**Examples:**
```typescript
// KYC Personal Details data
dataStore.setValue('kyc.personalData.complete', personalDetailsResult);
dataStore.setValue('kyc.personalData.source', 'gateway'); // or 'direct'

// KYC Current Situation data
dataStore.setValue('kyc.currentSituation.complete', currentSituationResult);
dataStore.setValue('kyc.currentSituation.source', 'direct');
```

## Data Flow Tracking

### Source Identification
Each KYC form now tracks its data source:
- `'gateway'` - Data originated from gateway forms/client creation
- `'direct'` - Data was entered directly into KYC forms

### Data Comparison
KYC forms now check for gateway data first, then fall back to regular client data:

```typescript
// Check for gateway client data first, then fallback to regular client data
const gatewayClient = dataStore.getValue<GatewayStoredRetailClient>('gateway.clientData.complete') ?? {};
const regularClient = dataStore.getValue<GatewayStoredRetailClient>('clientData.complete') ?? {};

// Prefer gateway data if available, otherwise use regular client data
const clientData = Object.keys(gatewayClient).length > 0 ? gatewayClient : regularClient;
```

## Type Definitions

### Gateway Types
- `GatewaySearchFormData` - Structure for gateway search forms
- `GatewayStoredRetailClient` - Gateway client data structure

### KYC Types
- `KYCPersonalDetailsData` - KYC personal details form structure
- `KYCPersonalDetailsResult` - KYC personal details completion result
- `KYCCurrentSituationData` - KYC current situation form structure
- `KYCCurrentSituationResult` - KYC current situation completion result

## Benefits

1. **Clear Data Origin**: Easy to identify where data originated (gateway vs KYC)
2. **Better Debugging**: Simplified troubleshooting of data flow issues
3. **Improved Maintenance**: Clearer code organization and data management
4. **Enhanced Testing**: Better validation of data consistency between forms
5. **Backward Compatibility**: Existing code continues to work with fallback mechanisms

## Migration Notes

- All types previously in `types.ts` have been moved to their respective files
- Gateway data is now stored with both prefixed and non-prefixed keys for backward compatibility
- KYC forms automatically detect and prefer gateway data when available
- Source tracking allows for better test reporting and debugging

## Usage Examples

### In Tests
```typescript
// Create client via gateway
const clientData = await retailClientSteps.createClient();
// Gateway data is automatically stored with 'gateway.' prefix

// Complete KYC forms
const kycPersonal = await kycPersonalSteps.completeKYCPersonalDetails();
// KYC will automatically use gateway data and mark source as 'gateway'

// Verify data consistency
const gatewayData = dataStore.getValue('gateway.clientData.complete');
const kycData = dataStore.getValue('kyc.personalData.complete');
const source = dataStore.getValue('kyc.personalData.source');
// source will be 'gateway' indicating data came from gateway
```

### In Step Classes
```typescript
// FormsService - stores with gateway prefix
dataStore.setValue('gateway.formData.searchData', searchData);

// KycPersonalDetailsPageSteps - checks gateway data first
const gatewayClient = dataStore.getValue('gateway.clientData.complete') ?? {};
const regularClient = dataStore.getValue('clientData.complete') ?? {};
const clientData = Object.keys(gatewayClient).length > 0 ? gatewayClient : regularClient;