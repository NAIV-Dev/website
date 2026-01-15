
import { DomainName } from '../model/table/DomainName'

export interface T_getDomains_headers {
  authorization: string
}

export type T_getDomains = (request: {
  headers: T_getDomains_headers
}, base_url?: string) => Promise<DomainName[]>;

export const method = 'get';
export const url_path = '/domain';
export const alias = 'getDomains';
