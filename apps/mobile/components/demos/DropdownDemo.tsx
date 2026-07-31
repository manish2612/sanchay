import { View, StyleSheet, ViewStyle, TextStyle, Alert } from "react-native";

import { DropdownMenu, Text } from "@prime/ui";
import { useTheme } from "@prime/theme-provider";

export const DropdownDemo = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text variant="heading" size="md" weight="semibold">
        Dropdown Menu
      </Text>
      <View style={styles.section}>
        <View style={styles.demoBlock}>
          <Text variant="body" size="sm" style={styles.label}>
            Basic Dropdown
          </Text>
          <DropdownMenu
            triggerLabel="Options"
            items={[
              {
                id: "1",
                label: "Edit Profile",
                icon: "Pencil",
                onSelect: () => Alert.alert("Edit Profile"),
              },
              {
                id: "2",
                label: "Preferences",
                icon: "Settings",
                onSelect: () => Alert.alert("Preferences"),
              },
            ]}
          />
        </View>

        <View style={styles.demoBlockZ}>
          <Text variant="body" size="sm" style={styles.label}>
            Searchable Dropdown
          </Text>

          <DropdownMenu
            triggerLabel="Select User"
            searchable
            items={[
              {
                id: "1",
                label: "Alice Johnson",
                icon: "User",
                onSelect: () => Alert.alert("Selected Alice"),
              },
              {
                id: "2",
                label: "Bob Smith",
                icon: "User",
                onSelect: () => Alert.alert("Selected Bob"),
              },
              {
                id: "3",
                label: "Charlie Brown",
                icon: "User",
                onSelect: () => Alert.alert("Selected Charlie"),
              },
              {
                id: "4",
                label: "David Williams",
                icon: "User",
                onSelect: () => Alert.alert("Selected David"),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 16,
      gap: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
    },
    section: {
      gap: 16,
    },
    demoBlock: {
      zIndex: 10,
    },
    demoBlockZ: {
      zIndex: 9,
    },
    label: {
      marginBottom: 8,
    },
  });
