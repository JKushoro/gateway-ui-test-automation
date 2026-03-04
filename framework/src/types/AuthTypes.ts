// framework/src/types/AuthTypes.ts

import { Environment } from './Environment';

/**
 * Authentication configuration interface
 */
export interface AuthConfig {
  baseUrl: string;
  username: string;
  password: string;
  otpSecret?: string;
}

/**
 * Authentication options for login flows
 */
export interface AuthenticationOptions {
  environment?: Environment;
  skipOtp?: boolean;
  customCredentials?: {
    username?: string;
    password?: string;
  };
}

/**
 * Authentication result interface
 */
export interface AuthenticationResult {
  success: boolean;
  error?: string;
  otpUsed?: boolean;
  environment: Environment;
}

/**
 * OTP configuration interface
 */
export interface OtpConfig {
  secret: string;
  digits?: number;
  algorithm?: 'SHA1' | 'SHA256' | 'SHA512';
  period?: number;
}