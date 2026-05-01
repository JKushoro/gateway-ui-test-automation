export type EnvSettings = Record<string, string>;
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
export declare function loadEnvFile(envFilePath: string): EnvSettings;
//# sourceMappingURL=loadEnvFile.d.ts.map