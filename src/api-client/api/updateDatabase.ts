
import { Database } from '../model/table/Database'

export interface T_updateDatabase_headers {
  authorization?: string
}
export interface T_updateDatabase_path {
  id: number
}
export interface T_updateDatabase_body {
  db_type?: string
  db_host?: string
  db_name?: string
  db_username?: string
  db_password?: string
  db_port?: number
}

export type T_updateDatabase = (request: {
  headers: T_updateDatabase_headers
  path: T_updateDatabase_path
  body: T_updateDatabase_body
}, base_url?: string) => Promise<Database>;

export const method = 'patch';
export const url_path = '/database/:id';
export const alias = 'updateDatabase';
