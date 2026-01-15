

export interface T_deleteDatabase_headers {
  authorization: string
}
export interface T_deleteDatabase_path {
  id: number
}

export type T_deleteDatabase = (request: {
  headers: T_deleteDatabase_headers
  path: T_deleteDatabase_path
}, base_url?: string) => Promise<boolean>;

export const method = 'delete';
export const url_path = '/database/:id';
export const alias = 'deleteDatabase';
