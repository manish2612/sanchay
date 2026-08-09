import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../../../index';

const meta = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="heading" size="2xl" weight="bold">
        Heading 2XL
      </Text>
      <Text variant="heading" size="xl" weight="semibold">
        Heading XL
      </Text>
      <Text variant="heading" size="lg" weight="medium">
        Heading LG
      </Text>

      <div className="pt-4 border-t border-border">
        <Text variant="body" size="md">
          Body MD Regular Text. This is standard paragraph text that is used across the application
          for generic content.
        </Text>
      </div>

      <div className="pt-4 border-t border-border">
        <Text variant="body" size="sm" color="mutedForeground">
          Body SM Muted Text.
        </Text>
      </div>
    </div>
  ),
};
