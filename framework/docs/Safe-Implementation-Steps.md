# Safe Implementation Steps for Status Code Assertions

## Don't Worry - You Won't Break Anything!

Here's a **safe, step-by-step approach** to start using status code assertions without messing up your existing code.

---

## Step 1: Start Small (SAFEST)

**Just read the guide first:**
- Look at [`HTTP-Status-Code-Assertions-Guide.md`](HTTP-Status-Code-Assertions-Guide.md)
- Understand where to put assertions
- No code changes yet!

---

## Step 2: Test the New Methods (SAFE)

**Try the new assertion methods in a simple test:**

1. Create a new test file (won't affect existing code):
```typescript
// Create: projects/gateway-ui/tests/practice/status-code-practice.spec.ts
import { test } from '@playwright/test';
import { AssertionHelper } from '@framework/helpers/AssertionHelper';

test('Practice status code assertions', async ({ page }) => {
  const assert = new AssertionHelper(page);
  
  // Make a simple API call
  const response = await page.request.get('https://httpbin.org/status/200');
  
  // Try the new assertion method
  await assert.assertResponseSuccess(response);
  
  console.log('Status code assertion worked!');
});
```

2. Run this test to see if it works
3. If it fails, nothing else is affected

---

## Step 3: Add to Existing Code (CAREFUL)

**Only after Step 2 works, modify ONE file:**

**In [`framework/src/utils/cdm.ts`](../src/utils/cdm.ts):**

Find this line (around line 200):
```typescript
const response = await this.client.post<ClientCreateResponse>('/clients', payload);
this.logger.info(`POST /clients response: ${response.status} — id: ${response.data.id}`);
return response.data;
```

**Add ONE line (don't remove anything):**
```typescript
const response = await this.client.post<ClientCreateResponse>('/clients', payload);
// Add this line (but you need to import AssertionHelper first)
// await this.assert.assertResponseCreated(response);
this.logger.info(`POST /clients response: ${response.status} — id: ${response.data.id}`);
return response.data;
```

**But first, you need to:**
1. Import AssertionHelper at the top
2. Add it to the constructor

---

## Step 4: What You Need to Import

**At the top of [`cdm.ts`](../src/utils/cdm.ts), add:**
```typescript
import { AssertionHelper } from '../helpers/AssertionHelper';
```

**In the constructor, add:**
```typescript
private assert: AssertionHelper;

constructor(baseUrl: string, authToken?: string) {
  // existing code...
  this.assert = new AssertionHelper(/* you need a page object here */);
}
```

**PROBLEM:** CDM class doesn't have a page object, so this won't work easily.

---

## EASIEST APPROACH: Don't Change CDM

**Instead, use status code assertions in your STEP files when you make API calls:**

**Example in any step file:**
```typescript
// When you make an API call in a step file
public async createClientViaAPI(clientData: any): Promise<void> {
  const response = await this.page.request.post('/api/clients', {
    data: clientData
  });
  
  // Add this line
  await this.assert.assertResponseCreated(response);
  
  // Continue with your logic
  const clientId = await response.json();
  // etc...
}
```

---

## What I Recommend (SAFEST):

1. **Don't change anything yet**
2. **Read the guide** to understand the concepts
3. **When you write NEW code** that makes API calls, use the assertion methods
4. **Leave existing working code alone**

---

## Summary:

- **I already added the helper methods** - they're ready to use
- **Your existing code still works** - nothing is broken
- **Use the new methods in NEW code** - don't modify working code
- **Start small** - try one assertion in a test file first

**You're safe! Nothing will break because I only added new methods, I didn't change your existing code.**