import React from "react";
import { View, Pressable, Text } from "react-native";
import { useTheme } from "@sanchay/theme-provider";
import { MaterialIcons } from "@expo/vector-icons";
import { getMenuBarStyles } from "./styles";

export function MenuBarRadioItem({ children, checked, ...props }: any) {
  const { theme } = useTheme();
  const t = theme as any;
  const styles = getMenuBarStyles(theme);

  return (
    <Pressable style={[styles.item, props.style]}>
      <View style={{ width: 20, alignItems: "center" }}>
        {checked && (
          <MaterialIcons
            name="radio-button-checked"
            size={14}
            color={t.colors.foreground}
          />
        )}
      </View>
      <Text style={styles.itemText}>{children}</Text>
    </Pressable>
  );
}
