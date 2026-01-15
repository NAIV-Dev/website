import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@heroui/react";
import { RecordDomainType } from "../../../api-client/model/enum/RecordDomainType";
import type { DomainName } from "../../../api-client/model/table/DomainName";

interface ZSDomainNameDeleteModalProps {
  loading?: boolean
  data: DomainName
  open: boolean
  setOpen(open: boolean): void
  onYes(): void
}

export function ZSDomainNameDeleteModal(props: ZSDomainNameDeleteModalProps) {
  return (
    <Modal className="dark" isOpen={props.open} onOpenChange={props.setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2">
              <div>
                Delete domain name record <b>{props.data.name}.d.naiv.dev</b>?
              </div>
              <div>
                <b className="">{ props.data.name }</b> ➜ <span className="text-rose-400">{props.data.record_type}</span> <span className="text-yellow-400">{ props.data.record_value }</span>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                onPress={props.onYes}
                isLoading={props.loading}
                color="danger">
                Delete Permanently
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
