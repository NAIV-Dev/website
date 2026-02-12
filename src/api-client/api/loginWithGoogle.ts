
import { User } from '../model/table/User'

export interface T_loginWithGoogle_body {
  google_access_token: string
}
interface ReturnType_0 {
  token: string
  user: User
}



export type T_loginWithGoogle = (request: {
  body: T_loginWithGoogle_body
}, base_url?: string) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/auth/login-with-google';
export const alias = 'loginWithGoogle';
export const is_streaming = false;
