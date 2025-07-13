// ui/utils/envUtils.ts
export function getBaseUrl(): string {
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
        throw new Error('BASE_URL is not defined in the environment');
    }
    return baseUrl;
}
