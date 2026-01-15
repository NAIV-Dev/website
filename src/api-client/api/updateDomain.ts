
import { RecordDomainType } from '../model/enum/RecordDomainType'
import { DomainName } from '../model/table/DomainName'

export interface T_updateDomain_headers {
  authorization: string
}
export interface T_updateDomain_path {
  domain_name: string
}
export interface T_updateDomain_body {
  record_type: RecordDomainType
  record_value: string
  name?: string
}

export type T_updateDomain = (request: {
  headers: T_updateDomain_headers
  path: T_updateDomain_path
  body: T_updateDomain_body
}, base_url?: string) => Promise<DomainName>;

export const method = 'put';
export const url_path = '/domain/:domain_name';
export const alias = 'updateDomain';
