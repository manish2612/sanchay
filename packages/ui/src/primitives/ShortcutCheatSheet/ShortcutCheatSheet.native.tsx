import React, { useMemo } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "../Modal";
import { TextInput } from "../TextInput";
import { ShortcutCheatSheetProps } from "./types";
import { createStyles } from "./styles";
import { useTheme } from "@sanchay/theme-provider";

export const ShortcutCheatSheet = ({
  open,
  onOpenChange,
  categories,
}: ShortcutCheatSheetProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCategories = useMemo(() => {
     if (!searchQuery) return categories;

    const lowerQuery = searchQuery.toLowerCase();

    return categories
      .map((category) => {
        const categoryTitleMatches = category.title
          .toLowerCase()
          .includes(lowerQuery);
        
        if (categoryTitleMatches) {
           return category;
        }

        const filteredItems = category.items.filter((item) =>
          item.label.toLowerCase().includes(lowerQuery)
        );

        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery]);


  // Transform keys for native display (symbols map)
  // For now, we render strings directly, but could add mapping if needed

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Keyboard Shortcuts</ModalTitle>
          <ModalDescription>
            List of available keyboard shortcuts.
          </ModalDescription>
        </ModalHeader>

        <ScrollView style={styles.container}>
          <TextInput.Root style={{ marginBottom: theme.spacing[4] }}>
             <TextInput.Input
                placeholder="Search shortcuts..."
                placeholderTextColor={theme.colors.muted.foreground}
                value={searchQuery}
                onChangeText={setSearchQuery}
             />
          </TextInput.Root>
          
          {filteredCategories.length === 0 ? (
             <Text style={[styles.itemLabel, { textAlign: 'center', marginVertical: 20, color: theme.colors.muted.foreground }]}>
               No shortcuts found.
             </Text>
          ) : (
             filteredCategories.map((category) => (
            <View key={category.title} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.title}</Text>

              {category.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemLabel}>{item.label}</Text>

                  <View style={styles.keysContainer}>
                    {item.keys.map((key, index) => (
                      <View
                        key={`${item.id}-key-${index}`}
                        style={styles.keyCap}
                      >
                        <Text style={styles.keyText}>{key}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </ModalContent>
    </Modal>
  );
};
