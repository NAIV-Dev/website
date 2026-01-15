import { UserType } from '../../model/enum/UserType'

export interface User {
  id: number;
  fullname: string;
  email: string;
  password: string;
  google_user_id?: string;
  type: UserType;
  max_domain_name_allowed: number;
  max_database_allowed: number;
  email_verification_token?: string;
  created_at: Date;
}