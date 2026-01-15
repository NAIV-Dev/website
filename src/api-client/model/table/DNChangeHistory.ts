import { DomainName } from '../../model/table/DomainName'
import { DNChangeHistoryType } from '../../model/enum/DNChangeHistoryType'

export interface DNChangeHistory {
  id: number;
  id_domain_name: number;
  type: DNChangeHistoryType;
  payload?: string;
  created_at: Date;
}