import React, { createContext, useContext, useState } from "react";
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { styles } from "./styles";
import { Icon } from "../../Icon";
import { useTheme } from "@sanchay/theme-provider";

interface ModalContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal compound components must be used within a Modal");
  }
  return context;
};

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Modal = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  defaultOpen = false,
  children,
}: ModalProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  return (
    <ModalContext.Provider value={{ open, onOpenChange }}>
      {children}
    </ModalContext.Provider>
  );
};

const ModalTrigger = ({
  asChild,
  children,
  onPress,
  ...props
}: {
  asChild?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  const { onOpenChange } = useModalContext();

  const handlePress = () => {
    onOpenChange(true);
    if (onPress) onPress();
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onPress: handlePress,
      ...props,
    });
  }

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const ModalContent = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  const { open, onOpenChange } = useModalContext();
  const theme = useTheme();

  if (!open) return null;

  return (
    <RNModal
      transparent
      visible={open}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
      {...props}
    >
      <TouchableWithoutFeedback onPress={() => onOpenChange(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.content,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                },
                style,
              ]}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onOpenChange(false)}
              >
                {/* Explicitly using a known icon for close */}
                <Icon name="x" size={20} color={theme.colors.foreground} />
              </TouchableOpacity>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const ModalHeader = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
};

const ModalFooter = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

const ModalTitle = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[styles.title, { color: theme.colors.foreground }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const ModalDescription = ({
  children,
  style,
  ...props
}: {
  children: React.ReactNode;
  style?: TextStyle;
}) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        styles.description,
        { color: theme.colors.mutedForeground },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// No-op for Native since close button is built-in to Content, or explicit component
const ModalClose = ({ children }: { children?: React.ReactNode }) => {
  const { onOpenChange } = useModalContext();
  // If children provided, wraps them to trigger close
  if (children) {
    return (
      <TouchableOpacity onPress={() => onOpenChange(false)}>
        {children}
      </TouchableOpacity>
    );
  }
  return null;
};

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
