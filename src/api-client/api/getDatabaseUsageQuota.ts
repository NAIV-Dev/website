

export interface T_getDatabaseUsageQuota_headers {
  authorization: string
}
export interface T_getDatabaseUsageQuota_path {
  id: number
}



export type T_getDatabaseUsageQuota = (request: {
  headers: T_getDatabaseUsageQuota_headers
  path: T_getDatabaseUsageQuota_path
}, base_url?: string) => Promise<number>;

export const method = 'get';
export const url_path = '/database/:id/usage-quota-in-MB';
export const alias = 'getDatabaseUsageQuota';
export const is_streaming = false;
