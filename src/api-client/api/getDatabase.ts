
import { Database } from '../model/table/Database'

export interface T_getDatabase_headers {
  authorization: string
}
export interface T_getDatabase_path {
  id: number
}



export type T_getDatabase = (request: {
  headers: T_getDatabase_headers
  path: T_getDatabase_path
}, base_url?: string) => Promise<Database>;

export const method = 'get';
export const url_path = '/database/:id';
export const alias = 'getDatabase';
export const is_streaming = false;
