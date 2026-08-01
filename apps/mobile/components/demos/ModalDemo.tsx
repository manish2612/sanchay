import React from "react";
import { View } from "react-native";
import {
  Text,
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
  useResponsiveValues,
} from "@prime/ui";
import { useTheme } from "@prime/theme-provider";

export function ModalDemo() {
  const { theme } = useTheme();
  const t = theme as any;
  const { width } = useResponsiveValues({
    width: { base: "100%", xl: "48%" } as const,
  });

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: t.colors.background,
        borderRadius: 8,
        borderColor: "#222222",
        borderWidth: 1,
      }}
    >
      <View style={{ width, margin: 0 }}>
        <Text size="sm" color="mutedForeground" style={{ marginBottom: 8 }}>
          Modal
        </Text>
        <View style={{ gap: 12 }}>
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Edit Profile</ModalTitle>
                <ModalDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </ModalDescription>
              </ModalHeader>
              <View style={{ gap: 16, marginVertical: 16 }}>
                <View>
                  <Text style={{ marginBottom: 8 }}>Name</Text>
                  <TextInput placeholder="Pedro Duarte" />
                </View>
                <View>
                  <Text style={{ marginBottom: 8 }}>Username</Text>
                  <TextInput placeholder="@peduarte" />
                </View>
              </View>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </ModalClose>
                <Button>Save Changes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </View>
      </View>
    </View>
  );
}
