# Environment Configuration

This directory contains environment-specific configuration files for the Gateway UI test automation.

## Environment Files

- `.env.qa` - QA environment configuration
- `.env.dev` - Development environment configuration

## Required Environment Variables

### Basic Authentication
```
BASE_URL=https://your-gateway-url.com
ADVISOR_EMAIL=your-advisor@email.com
ADVISOR_PASSWORD=your-password
```

### OTP Configuration (Optional)
```
ADVISOR_OTP_SECRET=YOUR_BASE32_OTP_SECRET
```

## OTP Setup

If your environment requires Two-Factor Authentication (2FA), you need to configure the OTP secret:

1. **Get your OTP secret**: This is typically provided when setting up 2FA in your authenticator app
2. **Format**: The secret should be in Base32 format (e.g., `JBSWY3DPEHPK3PXP`)
3. **Add to environment file**: Add `ADVISOR_OTP_SECRET=YOUR_SECRET` to your `.env.{environment}` file

### Example .env.qa file:
```
BASE_URL=https://qa-fairstonegateway.fairstone.co.uk
ADVISOR_EMAIL=test.advisor@fairstone.co.uk
ADVISOR_PASSWORD=SecurePassword123
ADVISOR_OTP_SECRET=JBSWY3DPEHPK3PXP
```

## Usage

The authentication system will automatically:
- Load the appropriate environment file based on the `ENVIRONMENT` variable
- Use OTP if `ADVISOR_OTP_SECRET` is configured
- Fall back to username/password only if OTP secret is not provided

## Security Notes

- **Never commit real credentials** to version control
- Use placeholder values in committed files
- Set real values in your local environment or CI/CD system
- OTP secrets are sensitive - treat them like passwords

## Testing Without OTP

If you want to test without OTP (for environments that don't require it):
- Simply omit the `ADVISOR_OTP_SECRET` variable
- Or set `skipOtp: true` in your test configuration