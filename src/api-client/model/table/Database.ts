import { User } from '../../model/table/User'

export interface Database {
  id: number;
  id_user: number;
  otm_id_user?: User;
  label?: string;
  db_type?: string;
  db_host?: string;
  db_name?: string;
  db_username?: string;
  db_password?: string;
  db_port?: number;
  uniq_id?: string;
  created_at: Date;
  update_at: Date;
  deleted_at?: Date;
}