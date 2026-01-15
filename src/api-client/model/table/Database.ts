import { User } from '../../model/table/User'

export interface Database {
  id: number;
  id_user: number;
  db_type?: string;
  db_host?: string;
  db_name?: string;
  db_username?: string;
  db_password?: string;
  db_port?: number;
  created_at: Date;
  update_at: Date;
  deleted_at?: Date;
}