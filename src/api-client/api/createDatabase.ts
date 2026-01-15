
import { Database } from '../model/table/Database'

export interface T_createDatabase_headers {
  authorization: string
}

export type T_createDatabase = (request: {
  headers: T_createDatabase_headers
}, base_url?: string) => Promise<Database>;

export const method = 'post';
export const url_path = '/database';
export const alias = 'createDatabase';
