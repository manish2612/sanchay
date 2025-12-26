import React, { useState, useMemo } from "react";
import { View, Pressable, StyleProp, ViewStyle } from "react-native";
import { Text, TextInput, Button, Icon } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider";
import { LoginData } from "../types";
import { getFormPanelStyles } from "./styles";

interface FormPanelProps {
  onLogin?: (data: LoginData) => void;
  onForgotPassword?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function FormPanel({
  onLogin,
  onForgotPassword,
  style,
}: FormPanelProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = theme as any;

  const styles = useMemo(() => getFormPanelStyles(t), [t]);

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // <View style={[styles.container, style]}>
    // </View>
    <View style={styles.card}>
      {/* Company Header */}
      <View style={styles.companyHeader}>
        <Icon name="business" size={24} color={t.colors.foreground} />
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerLabel}>Company</Text>
          <Text style={styles.footerName}>Egrow Tech Private limited</Text>
        </View>
      </View>

      {/* <Text variant="heading" style={styles.header}>
        Login to your account
      </Text> */}

      {/* Username/Email */}
      <View style={styles.inputGroup}>
        <TextInput.Root>
          <TextInput.Input
            placeholder="Username"
            value={email}
            onChangeText={setEmail}
          />
        </TextInput.Root>
      </View>

      {/* Password */}
      <View style={styles.inputGroupLast}>
        <TextInput.Root>
          <TextInput.Input
            placeholder="Password"
            secureTextEntry={!isVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput.Slot side="right">
            <Pressable
              onPress={() => setIsVisible(!isVisible)}
              style={styles.passwordToggle}
            >
              <Icon
                name={isVisible ? "visibility" : "visibility-off"}
                size={20}
                color={t.colors.mutedForeground}
              />
            </Pressable>
          </TextInput.Slot>
        </TextInput.Root>
      </View>

      {/* Actions */}
      <View style={styles.actionGroup}>
        {/* @ts-expect-error Web/Native type resolution conflict */}
        <Button
          variant="secondary"
          style={styles.actionButton}
          onPress={() => {}}
        >
          Cancel
        </Button>
        {/* @ts-expect-error Web/Native type resolution conflict */}
        <Button
          variant="primary"
          style={styles.actionButton}
          onPress={() => onLogin?.({ email, password })}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
}
