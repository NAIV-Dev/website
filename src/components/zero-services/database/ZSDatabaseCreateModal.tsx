import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { Database } from "../../../api-client/model/table/Database";
import { useEffect } from "react";

interface ZSDatabaseCreateModalProps {
  label: string
  setLabel(label: string): void
  loading?: boolean
  open: boolean
  setOpen(open: boolean): void
  onContinue(): void
}

export function ZSDatabaseCreateModal(props: ZSDatabaseCreateModalProps) {
  useEffect(() => {
    props.setLabel('');
  }, []);

  return (
    <Modal className="dark" isOpen={props.open} onOpenChange={props.setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New Database
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2">
              <div>
                Your database will be set up with random credentials with a max size limit of 30MB.
              </div>
              <div className="text-zinc-400 text-sm">
                If you're mostly storing text data (like short messages, user info), you can expect around 200,000-400,000 rows depending on row size. If you're storing binary or blob data, the usable rows will shrink quickly.
              </div>
              <Input
                placeholder="Your Database Label"
                label="DB Label"
                value={props.label}
                labelPlacement={'outside-top'}
                onChange={e => props.setLabel(e.target.value)} />
            </ModalBody>
            <ModalFooter>
              <Button 
                onPress={props.onContinue}
                isLoading={props.loading}
                color="danger">
                Generate Database
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
