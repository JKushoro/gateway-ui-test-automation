// framework/src/utils/generateOtp.ts

import * as OTPAuth from 'otpauth';

/**
 * generateOTP
 *
 * Generates a 6-digit Time-Based One-Time Password (TOTP)
 * using a Base32 secret (compatible with Azure / Microsoft Authenticator).
 *
 * @param secretBase32 - The Base32 encoded OTP secret
 * @returns string - 6 digit OTP code
 */
export function generateOTP(secretBase32: string): string {
  // Normalise the secret (remove spaces + ensure uppercase)
  const normalisedSecret = String(secretBase32).replace(/\s+/g, '').toUpperCase();

  const secret = OTPAuth.Secret.fromBase32(normalisedSecret);

  const totp = new OTPAuth.TOTP({
    secret,
    digits: 6,
    algorithm: 'SHA1',
    period: 30, // 30 second rotation (standard Microsoft/Azure)
  });

  // OTPAuth returns a string
  return totp.generate();
}
