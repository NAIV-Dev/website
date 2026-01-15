import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Database } from "../../../api-client/model/table/Database";

interface ZSDatabaseDeleteModalProps {
  loading?: boolean
  data: Database
  open: boolean
  setOpen(open: boolean): void
  onYes(): void
}

export function ZSDatabaseDeleteModal(props: ZSDatabaseDeleteModalProps) {
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
                Delete database <b>{props.data.db_name}</b>?
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
