
import { DomainName } from '../model/table/DomainName'

export interface T_getDomain_headers {
  authorization: string
}
export interface T_getDomain_path {
  domain_name: string
}

export type T_getDomain = (request: {
  headers: T_getDomain_headers
  path: T_getDomain_path
}, base_url?: string) => Promise<DomainName>;

export const method = 'get';
export const url_path = '/domain/:domain_name';
export const alias = 'getDomain';
