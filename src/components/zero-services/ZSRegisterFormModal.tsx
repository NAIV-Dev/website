import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";

export interface ZSRegisterFormData {
  fullname: string
  email: string
  password: string
}

interface ZSRegisterFormModalProps {
  loading?: boolean
  open: boolean
  setOpen(open: boolean): void
  value: ZSRegisterFormData
  setValue(value: ZSRegisterFormData): void
  onSubmit(): void
}

export function ZSRegisterFormModal(props: ZSRegisterFormModalProps) {
  const [show_password, setShowPassword] = useState<boolean>(false);

  return (
    <Modal className="dark" isOpen={props.open} onOpenChange={props.setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Register New Account
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                value={props.value.fullname}
                onChange={e => props.setValue({ ...props.value, fullname: e.target.value })}
                label={'Full Name'}
                labelPlacement={'outside'}
                placeholder="Full Name" />
              <Input
                value={props.value.email}
                onChange={e => props.setValue({ ...props.value, email: e.target.value })}
                label={'Email'}
                labelPlacement={'outside'}
                placeholder="Email" />
              <Input
                value={props.value.password}
                onChange={e => props.setValue({ ...props.value, password: e.target.value })}
                label={'Password'}
                type={show_password ? 'text' : 'password'}
                endContent={(
                  <Button 
                    color="warning"
                    variant={show_password ? 'bordered' : 'solid'}
                    onPress={() => setShowPassword(!show_password)}
                    className="!h-7 !rounded-lg !text-[12px] mr-[-5px] !min-w-auto">
                    { show_password ? 'Hide': 'Show' }
                  </Button>
                )}
                labelPlacement={'outside'}
                placeholder="Password" />
            </ModalBody>
            <ModalFooter>
              <Button 
                isLoading={props.loading}
                color="danger"
                onPress={props.onSubmit}>
                Register
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
