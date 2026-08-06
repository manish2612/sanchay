import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
} from './index';
import { Button } from '../Button';
import { TextInput } from '../TextInput';
import { Text } from '../Text/Text.dom';

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'The open state of the modal when it is initially rendered.',
    },
    modal: {
      control: 'boolean',
      description: 'The modality of the dialog.',
    },
  },
  args: {
    defaultOpen: false,
    modal: true,
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => (
    <Modal {...args}>
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
  )
};
