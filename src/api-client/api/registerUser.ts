
import { User } from '../model/table/User'

export interface T_registerUser_body {
  fullname: string
  email: string
  password: string
}



export type T_registerUser = (request: {
  body: T_registerUser_body
}, base_url?: string) => Promise<User>;

export const method = 'post';
export const url_path = '/auth/register';
export const alias = 'registerUser';
export const is_streaming = false;
