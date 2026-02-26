# Security Notice - Credentials Management

## ⚠️ IMPORTANT: Credentials Security

### Current Issue
The file `projects/gateway-ui/environments/.env.qa` contains **exposed credentials** that should be secured immediately.

### Immediate Actions Required

1. **Remove credentials from repository:**
   ```bash
   # Remove the file from git tracking
   git rm --cached projects/gateway-ui/environments/.env.qa
   
   # Add to .gitignore (already done)
   echo ".env.*" >> .gitignore
   echo "!.env.template" >> .gitignore
   ```

2. **Use environment variables instead:**
   ```bash
   # Set environment variables in your CI/CD system
   export USER_NAME="your.email@company.com"
   export PASSWORD="your-secure-password"
   export BASE_URL="https://qa-fairstonegateway.fairstone.co.uk"
   ```

3. **For local development:**
   ```bash
   # Copy the template
   cp projects/gateway-ui/environments/.env.template projects/gateway-ui/environments/.env.qa
   
   # Edit with your credentials (this file will be ignored by git)
   nano projects/gateway-ui/environments/.env.qa
   ```

### Best Practices

1. **Never commit credentials to version control**
2. **Use Azure Key Vault or similar for CI/CD**
3. **Rotate passwords regularly**
4. **Use service accounts for automation**
5. **Implement proper access controls**

### Template Usage

Use the provided `.env.template` file as a reference for required environment variables. Copy it to create your environment-specific files:

```bash
# For QA environment
cp .env.template .env.qa

# For production environment  
cp .env.template .env.production
```

### CI/CD Integration

For Azure DevOps or GitHub Actions, store credentials as secure environment variables and reference them in your pipeline configuration.

**Example for Azure DevOps:**
```yaml
variables:
  - group: 'gateway-ui-credentials'  # Variable group with secure variables

steps:
  - script: |
      export USER_NAME=$(qa-username)
      export PASSWORD=$(qa-password)
      npm run test:qa
```

### Verification

After implementing these changes:
1. Verify `.env.*` files are in `.gitignore`
2. Confirm no credentials are visible in git history
3. Test that environment variables are properly loaded
4. Ensure CI/CD pipelines use secure variable storage

---
**Status:** 🔴 **CRITICAL** - Immediate action required to secure exposed credentials