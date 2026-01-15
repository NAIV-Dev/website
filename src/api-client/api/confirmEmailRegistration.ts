

export interface T_confirmEmailRegistration_body {
  email: string
  token: string
}

export type T_confirmEmailRegistration = (request: {
  body: T_confirmEmailRegistration_body
}, base_url?: string) => Promise<boolean>;

export const method = 'post';
export const url_path = '/confirm-email-registration';
export const alias = 'confirmEmailRegistration';
