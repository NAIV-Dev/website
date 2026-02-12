import { DomainName } from '../../model/table/DomainName'
import { DNChangeHistoryType } from '../../model/enum/DNChangeHistoryType'

export interface DNChangeHistory {
  id: number;
  id_domain_name: number;
  otm_id_domain_name?: DomainName;
  type: DNChangeHistoryType;
  payload?: string;
  created_at: Date;
}