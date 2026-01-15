import { User } from '../../model/table/User'
import { RecordDomainType } from '../../model/enum/RecordDomainType'

export interface DomainName {
  id: number;
  id_user: number;
  name: string;
  record_type: RecordDomainType;
  record_value: string;
  created_at: Date;
  update_at: Date;
  deleted_at?: Date;
}