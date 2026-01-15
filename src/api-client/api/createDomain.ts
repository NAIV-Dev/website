
import { RecordDomainType } from '../model/enum/RecordDomainType'
import { DomainName } from '../model/table/DomainName'

export interface T_createDomain_headers {
  authorization: string
}
export interface T_createDomain_body {
  record_type: RecordDomainType
  record_value: string
  name: string
}

export type T_createDomain = (request: {
  headers: T_createDomain_headers
  body: T_createDomain_body
}, base_url?: string) => Promise<DomainName>;

export const method = 'post';
export const url_path = '/domain';
export const alias = 'createDomain';
