# CDM (Client Data Management) - Simple Guide

## 🤔 What is CDM?

**CDM = Client Data Management**

The CDM is a **helper tool** that allows your test automation framework to automatically manage client data in the database. Think of it as a **remote control** for your client database.

## 🎯 What Does It Do?

### Simple Flow:
```
Your Test → Creates client data (using CDM) → Runs test → Cleans up data (using CDM)
```

### In Detail:
1. **Before Test**: Creates fake clients and fact finds for testing
2. **During Test**: Your test uses this real data to test the application
3. **After Test**: Automatically cleans up all the test data

## 🧑‍💼 What Can CDM Manage?

### **Clients** (People)
- ✅ Create new clients
- ✅ Delete clients
- ✅ Link clients together (like husband & wife)

### **Fact Finds** (Forms/Questionnaires)
- ✅ Create new fact find forms
- ✅ Get existing fact finds
- ✅ Mark them as "Complete" or "Abandoned"
- ✅ Clean up old/unwanted fact finds

## 🔧 How Does It Work?

### 1. **Setup** (Done automatically)
```typescript
// CDM connects to your database using these settings:
API_URL=https://your-database-api.com
API_KEY=your-secret-key
ADVISOR_ID=123
ADVISOR_USER_ID=456
```

### 2. **Create Test Data**
```typescript
import { ApiClient } from './cdm';

const cdm = new ApiClient();

// Create a fake client for testing
const client = await cdm.createClient({
  forename: 'Test',
  surname: 'User',
  emailAddress: 'test@example.com'
});

// Create a fact find for that client
const factFind = await cdm.createFactFind({
  client1Id: client.id,
  factFindTypeId: 1
});
```

### 3. **Clean Up After Test**
```typescript
// Mark fact find as abandoned (cleanup)
await cdm.abandonFactFind(factFind.id);

// Or clean up ALL fact finds for a client
await cdm.abandonAllFactFindsForClient(client.id);
```

## 🏗️ How It Fits Into Your Test Framework

### **Current Integration:**

1. **CDM File** (`cdm.ts`) = The tool that talks to your database
2. **TestCleanupHelper** (`TestCleanupHelper.ts`) = Uses CDM to clean up test data
3. **Your Tests** = Use both to create and clean up data automatically

### **Real Example:**
```typescript
// In your test file
describe('Client Creation Test', () => {
  let testClient;
  
  beforeEach(async () => {
    // CDM creates test data
    testClient = await cdm.createClient({...});
  });
  
  test('should create client successfully', () => {
    // Your test runs using real data
    // Test the application...
  });
  
  afterEach(async () => {
    // CDM cleans up test data
    await cdm.setClientDeleted(testClient.id, true);
  });
});
```

## 💡 Why Is This Useful?

### **Before CDM:**
- ❌ Manual database setup
- ❌ Leftover test data cluttering database
- ❌ Tests failing due to missing data
- ❌ Time-consuming cleanup

### **With CDM:**
- ✅ **Automatic** test data creation
- ✅ **Automatic** cleanup after tests
- ✅ **Consistent** test environment
- ✅ **No manual** database work needed

## 🚀 Available Methods (What You Can Do)

### **Client Management**
```typescript
// Create a new client
await cdm.createClient(clientData);

// Soft delete a client
await cdm.setClientDeleted(clientId, true);

// Link two clients together
await cdm.createClientAssociation(clientId, associationData);
```

### **Fact Find Management**
```typescript
// Create a new fact find
await cdm.createFactFind(factFindData);

// Get existing fact finds
await cdm.getFactFinds(searchParams);

// Update fact find status
await cdm.updateFactFindStatus(factFindId, 'Complete');

// Mark as abandoned
await cdm.abandonFactFind(factFindId);

// Mark as complete
await cdm.completeFactFind(factFindId);
```

### **Bulk Cleanup Operations**
```typescript
// Clean up all fact finds for one client
await cdm.abandonAllFactFindsForClient(clientId);

// Clean up fact finds for two clients (joint)
await cdm.abandonAllOpenFactFinds(client1Id, client2Id);
```

## 🔍 For Junior Developers

### **Key Points to Remember:**

1. **CDM is already set up** - You don't need to configure anything
2. **Use it in your tests** - Import and use the ApiClient class
3. **Always clean up** - Use the cleanup methods after your tests
4. **It's safe** - CDM only affects test data, not production data

### **Common Pattern:**
```typescript
// 1. Import CDM
import { ApiClient } from '@framework/utils/cdm';

// 2. Create instance
const cdm = new ApiClient();

// 3. Use in tests
const client = await cdm.createClient({...});
// ... run your test ...
await cdm.setClientDeleted(client.id, true);
```

## ❓ Need Help?

- **File Location**: `framework/src/utils/cdm.ts`
- **Integration**: Already connected to `TestCleanupHelper.ts`
- **Environment**: Uses `.env.qa` file for configuration
- **Logging**: All actions are logged with `[CDM]` prefix

**Remember**: CDM makes your tests **self-managing** - they create their own data and clean up after themselves!