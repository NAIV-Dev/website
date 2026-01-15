
import { Database } from '../model/table/Database'

export interface T_getDatabases_headers {
  authorization: string
}

export type T_getDatabases = (request: {
  headers: T_getDatabases_headers
}, base_url?: string) => Promise<Database[]>;

export const method = 'get';
export const url_path = '/database';
export const alias = 'getDatabases';
