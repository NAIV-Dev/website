

export interface T_forgetPassword_body {
  email: string
}

export type T_forgetPassword = (request: {
  body: T_forgetPassword_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/forget-password';
export const alias = 'forgetPassword';
