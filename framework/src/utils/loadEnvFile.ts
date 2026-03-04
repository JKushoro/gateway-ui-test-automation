// framework/src/utils/loadEnvFile.ts

import fs from 'fs';
import path from 'path';

export type EnvSettings = Record<string, string>;

/**
 * stripQuotes
 *
 * Removes surrounding single or double quotes from a value.
 * Useful when environment variables are wrapped in quotes.
 */
function stripQuotes(value: string): string {
  const v = value.trim();

  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }

  return v;
}

/**
 * loadEnvFile
 *
 * Reads a .env file manually (without dotenv dependency),
 * parses key=value pairs and:
 * - Returns them as an object
 * - Optionally hydrates process.env (if not already set)
 *
 * @param envFilePath - Absolute or relative path to .env file
 * @returns EnvSettings object
 */
export function loadEnvFile(envFilePath: string): EnvSettings {
  if (!fs.existsSync(envFilePath)) {
    throw new Error(`Env file not found: ${envFilePath}`);
  }

  const env: EnvSettings = {};
  const content = fs.readFileSync(envFilePath, 'utf8');

  content.split('\n').forEach(line => {
    const trimmed = line.trim();

    // Ignore empty lines and comments
    if (!trimmed || trimmed.startsWith('#')) return;

    const [key, ...parts] = trimmed.split('=');

    if (!key || parts.length === 0) return;

    const rawValue = parts.join('=').trim();
    env[key.trim()] = stripQuotes(rawValue);
  });

  /**
   * Optional: Populate process.env
   * Only sets variables that are not already defined
   */
  for (const [k, v] of Object.entries(env)) {
    if (process.env[k] === undefined) {
      process.env[k] = v;
    }
  }

  return env;
}
