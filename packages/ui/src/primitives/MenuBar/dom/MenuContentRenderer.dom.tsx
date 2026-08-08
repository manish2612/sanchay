'use client';

import React from 'react';
import { MenuItem } from '../schema';
import { MenuBarItem } from './MenuBarItem.dom';
import { MenuBarCheckboxItem } from './MenuBarCheckboxItem.dom';
import { MenuBarRadioGroup } from './MenuBarRadioGroup.dom';
import { MenuBarRadioItem } from './MenuBarRadioItem.dom';
import { MenuBarSeparator } from './MenuBarSeparator.dom';
import { MenuBarLabel } from './MenuBarLabel.dom';
import { MenuBarSub, MenuBarSubTrigger, MenuBarSubContent } from './MenuBarSub.dom';
import { MenuBarShortcut } from './MenuBarShortcut.dom';
import { UniversalLink } from '../../Link'; // Updated import to point to primitives/Link/index
import { Icon } from '../../Icon/Icon.dom'; // Assuming Icon usage needs standardizing, checking imports

export const MenuContentRenderer = ({ items }: { items: MenuItem[] }) => {
  return (
    <>
      {items.map((item, index) => {
        switch (item.kind) {
          case 'item': {
            // Logic for Link vs Action
            const content = (
              <>
                {item.label}
                {item.shortcut && <MenuBarShortcut>{item.shortcut}</MenuBarShortcut>}
              </>
            );

            // If it's a link using routing strategy
            if (item.href) {
              // We use UniversalLink but we need to ensure the MenuBarItem acts as the child
              // Since UniversalLink expects to render an anchor, and MenuBarItem usually renders a div/stateless div
              // We will wrap MenuBarItem. However, Radix primitives often expect direct event handling.
              // The 'asChild' pattern is best here if supported by UniversalLink, otherwise we wrap.
              // Assuming UniversalLink renders an <a> or similar.
              return (
                <UniversalLink key={index} href={item.href} className="contents">
                  <MenuBarItem inset={item.inset} disabled={item.disabled}>
                    {content}
                  </MenuBarItem>
                </UniversalLink>
              );
            }

            return (
              <MenuBarItem
                key={index}
                inset={item.inset}
                disabled={item.disabled}
                onSelect={item.onSelect}
              >
                {content}
              </MenuBarItem>
            );
          }

          case 'checkbox':
            return (
              <MenuBarCheckboxItem
                key={index}
                checked={item.checked}
                onCheckedChange={item.onCheckedChange}
                disabled={item.disabled}
              >
                {item.label}
                {item.shortcut && <MenuBarShortcut>{item.shortcut}</MenuBarShortcut>}
              </MenuBarCheckboxItem>
            );

          case 'radio-group':
            return (
              <MenuBarRadioGroup key={index} value={item.value} onValueChange={item.onValueChange}>
                {item.items.map((radio, rIndex) => (
                  <MenuBarRadioItem key={rIndex} value={radio.value}>
                    {radio.label}
                  </MenuBarRadioItem>
                ))}
              </MenuBarRadioGroup>
            );

          case 'sub':
            return (
              <MenuBarSub key={index}>
                <MenuBarSubTrigger inset={item.inset} disabled={item.disabled}>
                  {item.label}
                </MenuBarSubTrigger>
                <MenuBarSubContent>
                  <MenuContentRenderer items={item.content} />
                </MenuBarSubContent>
              </MenuBarSub>
            );

          case 'separator':
            return <MenuBarSeparator key={index} />;

          case 'label':
            return (
              <MenuBarLabel key={index} inset>
                {item.label}
              </MenuBarLabel>
            );

          default:
            return null;
        }
      })}
    </>
  );
};
