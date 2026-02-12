
import { Database } from '../model/table/Database'

export interface T_getDBCredential_headers {
  uniqid: string
}



export type T_getDBCredential = (request: {
  headers: T_getDBCredential_headers
}, base_url?: string) => Promise<Database>;

export const method = 'get';
export const url_path = '/db-credential';
export const alias = 'getDBCredential';
export const is_streaming = false;
