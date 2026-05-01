# HTTP Status Code Assertions Guide

## Where to Place Status Code Assertions

This guide explains **where** and **when** to use HTTP status code assertions like `expect(response.status).toBe(201)` in your test automation code.

---

## Quick Answer

**Place status code assertions in your STEP files, right after making API calls.**

### Good Places:
- **Service classes** (like [`AuthenticationService.ts`](../src/services/AuthenticationService.ts))
- **Step files** (like [`RetailClientCreationSteps.ts`](../../projects/gateway-ui/steps/gateway/RetailClientCreationSteps.ts))
- **API helper methods**

### Bad Places:
- Test files (`.spec.ts`) - keep tests clean
- Page locator files - these are for finding elements only
- Utility files - unless they're specifically for API calls

---

## How to Use (Simple Examples)

### 1. In Service Classes (Recommended)
```typescript
// In AuthenticationService.ts
public async loginUser(username: string, password: string): Promise<void> {
  const response = await this.page.request.post('/api/login', {
    data: { username, password }
  });
  
  // Assert status code here
  await this.assert.assertResponseSuccess(response); // Checks for 200
  
  // Continue with the rest of your logic
  const token = await response.json();
  // Store token, etc.
}
```

### 2. In Step Files
```typescript
// In RetailClientCreationSteps.ts
public async createNewClient(clientData: any): Promise<void> {
  const response = await this.page.request.post('/api/clients', {
    data: clientData
  });
  
  // Assert status code here
  await this.assert.assertResponseCreated(response); // Checks for 201
  
  // Continue with UI actions
  await this.navigateToClientsList();
}
```

### 3. In API Helper Methods
```typescript
// In a dedicated API helper
public async deleteClient(clientId: string): Promise<void> {
  const response = await this.page.request.delete(`/api/clients/${clientId}`);
  
  // Assert status code here
  await this.assert.assertResponseNoContent(response); // Checks for 204
}
```

---

## Common Status Codes & When to Use Them

| Status Code | Method to Use | When to Use |
|-------------|---------------|-------------|
| **200** | `assertResponseSuccess()` | GET requests that return data |
| **201** | `assertResponseCreated()` | POST requests that create new items |
| **204** | `assertResponseNoContent()` | DELETE requests or updates with no response body |
| **400** | `assertResponseBadRequest()` | Testing validation errors |
| **401** | `assertResponseUnauthorized()` | Testing login failures |
| **403** | `assertResponseForbidden()` | Testing permission errors |
| **404** | `assertResponseNotFound()` | Testing missing resources |
| **500** | `assertResponseServerError()` | Testing server errors |

---

## Code Structure Examples

### Example 1: Client Creation Flow
```typescript
// In RetailClientCreationSteps.ts
export class RetailClientCreationSteps extends BasePage {
  
  public async createRetailClient(clientData: ClientData): Promise<string> {
    // 1. Make API call
    const response = await this.page.request.post('/api/retail-clients', {
      data: clientData
    });
    
    // 2. Assert status code immediately
    await this.assert.assertResponseCreated(response); // 201
    
    // 3. Get the created client ID
    const responseBody = await response.json();
    const clientId = responseBody.id;
    
    // 4. Continue with UI verification
    await this.navigateToClientDetails(clientId);
    await this.assert.assertElementVisible(this.locators.clientNameHeader);
    
    return clientId;
  }
}
```

### Example 2: Authentication Flow
```typescript
// In AuthenticationService.ts
export class AuthenticationService extends BasePage {
  
  public async authenticateUser(credentials: AuthCredentials): Promise<void> {
    // 1. Make login API call
    const response = await this.page.request.post('/api/auth/login', {
      data: credentials
    });
    
    // 2. Assert successful login
    await this.assert.assertResponseSuccess(response); // 200
    
    // 3. Handle the response
    const authData = await response.json();
    this.storeAuthToken(authData.token);
  }
  
  public async testInvalidLogin(badCredentials: AuthCredentials): Promise<void> {
    const response = await this.page.request.post('/api/auth/login', {
      data: badCredentials
    });
    
    // Assert authentication failure
    await this.assert.assertResponseUnauthorized(response); // 401
  }
}
```

---

## Best Practices for Junior Developers

### DO:
1. **Assert status codes immediately** after API calls
2. **Use descriptive assertion methods** from AssertionHelper
3. **Place assertions in service/step files** where the API calls happen
4. **Test both success and failure scenarios**

### DON'T:
1. **Don't put assertions in test files** - keep tests clean and readable
2. **Don't forget to assert status codes** - always check if your API calls worked
3. **Don't use raw `expect(response.status).toBe(201)`** - use the helper methods instead
4. **Don't put API logic in page locator files**

---

## File Organization

```
framework/
├── src/
│   ├── services/           ← API calls + status assertions here
│   │   └── AuthenticationService.ts
│   ├── helpers/
│   │   └── AssertionHelper.ts  ← Status assertion methods here
│   └── ...
│
projects/gateway-ui/
├── steps/                  ← Business logic + status assertions here
│   ├── gateway/
│   │   └── RetailClientCreationSteps.ts
│   └── ...
├── pages/                  ← NO API calls here (locators only)
└── tests/                  ← NO status assertions here (clean tests)
```

---

## Quick Start Checklist

When you need to add status code assertions:

1. **Find where you make the API call** (service or step file)
2. **Add assertion right after the API call**
3. **Use the appropriate helper method** from AssertionHelper
4. **Test both success and error cases**
5. **Keep your test files clean** - no assertions there

---

## Remember

**The golden rule**: Put status code assertions **where you make the API calls**, not in your test files. This keeps your tests clean and your API logic properly validated.