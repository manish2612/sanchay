import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Text,
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarSub,
  MenuBarSubTrigger,
  MenuBarSubContent,
  MenuBarCheckboxItem,
  MenuBarRadioGroup,
  MenuBarRadioItem,
  MenuBarShortcut,
} from '../../../index';

const meta = {
  title: 'Primitives/MenuBar',
  component: MenuBar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof MenuBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full flex justify-center mt-10">
      <MenuBar>
        <MenuBarMenu>
          <MenuBarTrigger>File</MenuBarTrigger>
          <MenuBarContent>
            <MenuBarItem>
              New Tab <MenuBarShortcut>⌘T</MenuBarShortcut>
            </MenuBarItem>
            <MenuBarItem>
              New Window <MenuBarShortcut>⌘N</MenuBarShortcut>
            </MenuBarItem>
            <MenuBarItem disabled>New Incognito Window</MenuBarItem>
            <MenuBarSeparator />
            <MenuBarSub>
              <MenuBarSubTrigger>Share</MenuBarSubTrigger>
              <MenuBarSubContent>
                <MenuBarItem>Email link</MenuBarItem>
                <MenuBarItem>Messages</MenuBarItem>
                <MenuBarItem>Notes</MenuBarItem>
              </MenuBarSubContent>
            </MenuBarSub>
            <MenuBarSeparator />
            <MenuBarItem>
              Print... <MenuBarShortcut>⌘P</MenuBarShortcut>
            </MenuBarItem>
          </MenuBarContent>
        </MenuBarMenu>

        <MenuBarMenu>
          <MenuBarTrigger>Edit</MenuBarTrigger>
          <MenuBarContent>
            <MenuBarItem>
              Undo <MenuBarShortcut>⌘Z</MenuBarShortcut>
            </MenuBarItem>
            <MenuBarItem>
              Redo <MenuBarShortcut>⇧⌘Z</MenuBarShortcut>
            </MenuBarItem>
            <MenuBarSeparator />
            <MenuBarItem>Cut</MenuBarItem>
            <MenuBarItem>Copy</MenuBarItem>
            <MenuBarItem>Paste</MenuBarItem>
          </MenuBarContent>
        </MenuBarMenu>

        <MenuBarMenu>
          <MenuBarTrigger>View</MenuBarTrigger>
          <MenuBarContent>
            <MenuBarCheckboxItem checked>Always Show Bookmarks Bar</MenuBarCheckboxItem>
            <MenuBarCheckboxItem checked={false}>Always Show Full URLs</MenuBarCheckboxItem>
            <MenuBarSeparator />
            <MenuBarItem inset>Toggle Fullscreen</MenuBarItem>
            <MenuBarSeparator />
            <MenuBarItem inset>Hide Sidebar</MenuBarItem>
          </MenuBarContent>
        </MenuBarMenu>

        <MenuBarMenu>
          <MenuBarTrigger>Profiles</MenuBarTrigger>
          <MenuBarContent>
            <MenuBarRadioGroup value="benoit">
              <MenuBarRadioItem value="andy">Andy</MenuBarRadioItem>
              <MenuBarRadioItem value="Luis">Luis</MenuBarRadioItem>
              <MenuBarRadioItem value="benoit">Benoit</MenuBarRadioItem>
            </MenuBarRadioGroup>
            <MenuBarSeparator />
            <MenuBarItem inset>Edit...</MenuBarItem>
            <MenuBarSeparator />
            <MenuBarItem inset>Add Profile...</MenuBarItem>
          </MenuBarContent>
        </MenuBarMenu>
      </MenuBar>
    </div>
  ),
};
