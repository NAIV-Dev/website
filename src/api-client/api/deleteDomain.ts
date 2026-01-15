

export interface T_deleteDomain_headers {
  authorization: string
}
export interface T_deleteDomain_path {
  domain_name: string
}

export type T_deleteDomain = (request: {
  headers: T_deleteDomain_headers
  path: T_deleteDomain_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/domain/:domain_name';
export const alias = 'deleteDomain';
