

export interface T_resetPasswordByToken_body {
  email: string
  token: string
  new_password: string
  re_new_password: string
}

export type T_resetPasswordByToken = (request: {
  body: T_resetPasswordByToken_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/reset-password-by-token';
export const alias = 'resetPasswordByToken';
