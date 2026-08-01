"use client";
import React from "react";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  Button,
  TextInput,
  Text,
} from "@prime/ui";

export function ModalDemo() {
  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        Modal Primitive:
      </strong>
      <div className="flex gap-4">
        <Modal>
          <ModalTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </ModalTrigger>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit Profile</ModalTitle>
              <ModalDescription>
                Make changes to your profile here. Click save when you're done.
              </ModalDescription>
            </ModalHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Text className="text-right">Name</Text>
                <TextInput className="col-span-3" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Text className="text-right">Username</Text>
                <TextInput className="col-span-3" defaultValue="@peduarte" />
              </div>
            </div>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="ghost">Cancel</Button>
              </ModalClose>
              <Button type="submit">Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
