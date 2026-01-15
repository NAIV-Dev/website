import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@heroui/react";
import { RecordDomainType } from "../../../api-client/model/enum/RecordDomainType";
import type { DomainName } from "../../../api-client/model/table/DomainName";

export interface ZSDomainNameFormData {
  record_type: RecordDomainType
  record_value: string
  name: string
}

interface ZSDomainNameFormModalProps {
  loading?: boolean
  open: boolean
  setOpen(open: boolean): void
  data?: DomainName
  value: ZSDomainNameFormData
  setValue(value: ZSDomainNameFormData): void
  onSubmit(): void
}

export function ZSDomainNameFormModal(props: ZSDomainNameFormModalProps) {
  const is_edit_mode = Boolean(props.data);
  return (
    <Modal className="dark" isOpen={props.open} onOpenChange={props.setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              { props.data ? 'Update' : 'Add New' } Domain Name
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                value={props.value.name}
                onChange={e => props.setValue({ ...props.value, name: e.target.value })}
                label={'Domain'}
                isDisabled={is_edit_mode}
                labelPlacement={'outside'}
                endContent={(
                  <div className="text-zinc-500">
                    .d.naiv.dev
                  </div>
                )}
                placeholder="your-domain-name" />
              <RadioGroup 
                value={props.value.record_type}
                onChange={e => props.setValue({ ...props.value, record_type: e.target.value as RecordDomainType })}
                orientation={'horizontal'}
                isDisabled={is_edit_mode}
                color="danger"
                label="Record type">
                {
                  Object.keys(RecordDomainType).map(r => (
                    <Radio key={r} value={r}>{ r }</Radio>
                  ))
                }
              </RadioGroup>
              { is_edit_mode && <div className="text-zinc-500 text-[12px] italic">
                On edit mode, you can only change the record value, if you want to change the name or record type then try delete this name and create a new one.
              </div> }
              <Input
                value={props.value.record_value}
                className="font-mono"
                onChange={e => props.setValue({ ...props.value, record_value: e.target.value })}
                label={'Record Value'}
                labelPlacement={'outside'}
                placeholder="Record Value" />
            </ModalBody>
            <ModalFooter>
              <Button color="warning" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button 
                isLoading={props.loading}
                color="danger"
                onPress={props.onSubmit}>
                { props.data ? 'Update Domain' : 'Add Domain' }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
