# Gateway UI Steps Usage Guide

## Overview

This directory contains step definition classes that encapsulate business logic and test workflows. Each step class provides main workflow methods for clean, single-line test execution.

## Step Classes

### Client Management Steps

#### CreateCorporateClientSteps

```typescript
import { AddCorporateClientSteps } from '@steps/clients/CreateCorporateClientSteps';

const clientSteps = new AddCorporateClientSteps(page);

// Main workflow methods
await clientSteps.executeNavigateToAddCorporateClient(sideNav);
await clientSteps.executeCompleteClientCreation();

// Individual methods
await clientSteps.createCorporateClient();
await clientSteps.verifyCorporateClientPage();
```

#### ClientsSearchSteps

```typescript
import { ClientsSearchSteps } from '@steps/clients/ClientsSearchSteps';

const searchSteps = new ClientsSearchSteps(page);

// Main workflow method
await searchSteps.executeSearchAndVerifyStoredClient();

// Individual methods
await searchSteps.searchForStoredClient();
await searchSteps.verifyAndClickMatchingClient();
```

#### ClientFilesSteps

```typescript
import { ClientFilesSteps } from '@steps/clients/ClientFilesSteps';

const clientFilesSteps = new ClientFilesSteps(page);

// Main workflow method
await clientFilesSteps.executeStoredClientDataVerification();

// Individual methods
await clientFilesSteps.verifyClientFilesPage();
await clientFilesSteps.assertStoredClientDataMatches();
await clientFilesSteps.clickNavigationLink('Client Details');
```

### Component Services

#### FormsService

```typescript
import { FormsService } from '@steps/components/Forms';

const forms = new FormsService(page);

// Fill forms with generated data
const formData = await forms.fillMinimalForm();
const searchData = await forms.searchMinimalForm();
```

#### PostcodeLookupService

```typescript
import { PostcodeLookupService } from '@steps/components/PostcodeLookup';

const postcode = new PostcodeLookupService(page);

// Complete postcode lookup workflow
const selectedAddress = await postcode.performPostcodeLookup();
```

#### SideNavService

```typescript
import { SideNavService } from '@steps/components/SideNav';

const sideNav = new SideNavService(page);

// Navigate using side menu
await sideNav.clickSideMenuItem('Clients', 'Add Corporate Client');
```

## Best Practices

### 1. Use Main Workflow Methods

```typescript
// Good: Single-line test execution
test('Create corporate client', async () => {
  await clientSteps.executeCompleteClientCreation();
});

// Avoid: Multiple method calls in tests
test('Create corporate client', async () => {
  await clientSteps.verifyCorporateClientPage();
  const result = await clientSteps.createCorporateClient();
  expect(result.formData.companyName).toBeTruthy();
});
```

### 2. Leverage DataStore Integration

```typescript
// Data is automatically stored and retrieved between steps
await clientSteps.executeCompleteClientCreation(); // Stores data
await searchSteps.executeSearchAndVerifyStoredClient(); // Uses stored data
await clientFilesSteps.executeStoredClientDataVerification(); // Verifies stored vs displayed
```

### 3. Environment-Specific Setup

```typescript
// Use GatewaySetup for environment configuration
await GatewaySetup.setupForEnvironment(page, 'qa');
```

## Test Data Management

### Automatic Data Generation

- **Company names**: Generated using faker.js
- **Contact details**: Realistic test data with proper formatting
- **Email addresses**: Generated based on contact names
- **Phone numbers**: UK mobile format (07xxxxxxxxx)
- **Addresses**: Real UK postcodes with address lookup

### DataStore Integration

- All generated data is automatically stored in DataStore
- Data persists across test steps
- Easy retrieval using consistent key patterns
- Supports data verification between creation and display
