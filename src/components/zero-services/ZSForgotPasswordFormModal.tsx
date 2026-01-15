import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@heroui/react";
import { useState } from "react";

export interface ZSForgotPasswordFormData {
  email: string
}

interface ZSForgotPasswordFormModalProps {
  loading?: boolean
  open: boolean
  setOpen(open: boolean): void
  value: ZSForgotPasswordFormData
  setValue(value: ZSForgotPasswordFormData): void
  onSubmit(): void
}

export function ZSForgotPasswordFormModal(props: ZSForgotPasswordFormModalProps) {
  return (
    <Modal className="dark" isOpen={props.open} onOpenChange={props.setOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Forgot Your Password?
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <Input
                value={props.value.email}
                onChange={e => props.setValue({ ...props.value, email: e.target.value })}
                label={'Email'}
                labelPlacement={'outside'}
                placeholder="Email" />
              <div className="text-zinc-500">
                If your email is registered with us, you’ll receive a link to reset your password.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                isLoading={props.loading}
                color="danger"
                onPress={props.onSubmit}>
                Send Email
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
