import React from "react";
import { View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Text, useResponsiveValues, GridBackground } from "@sanchay/ui";
import { APP_NAME } from "@sanchay/config";
import { useTheme } from "@sanchay/theme-provider";

import { ThemeControls } from "./demos/ThemeControls";
import { StatsDemo } from "./demos/StatsDemo";
import { FontDemo } from "./demos/FontDemo";
import { ButtonDemo } from "./demos/ButtonDemo";
import { TextInputDemo } from "./demos/TextInputDemo";
import { MenuBarDemo } from "./demos/MenuBarDemo";
import { ModalDemo } from "./demos/ModalDemo";
import { NavDemoWrapper } from "./demos/NavDemoWrapper";
import { ShortcutDemo } from "./demos/ShortcutDemo";
import { DropdownDemo } from "./demos/DropdownDemo";
import { Button } from "@sanchay/ui";

export function ComponentDemos() {
  const router = useRouter();
  const { theme } = useTheme();
  const t = theme as any;

  const {
    contentDirection,
    contentAlign,
    panelWidth,
    componentsSubDirection,
    componentsSubWidth,
    rootPadding,
  } = useResponsiveValues({
    contentDirection: { base: "column", lg: "row" } as const,
    contentAlign: { base: "stretch", lg: "flex-start" } as const,
    panelWidth: { base: "100%", lg: "48%" } as const,
    // Components: XL=SideBySide, LG=Stacked
    componentsSubDirection: { base: "column", xl: "row" } as const,
    componentsSubWidth: { base: "100%", xl: "48%" } as const,
    rootPadding: { base: t.spacing[16], md: t.spacing[2] } as const,
  });

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: t.colors.background,
        padding: t.spacing[6] || 24,
        paddingVertical: rootPadding,
      }}
    >
      <View style={{ width: "100%", maxWidth: 1200, alignSelf: "center" }}>
        <Text
          variant="heading"
          size="2xl"
          weight="bold"
          align="center"
          style={{ marginBottom: t.spacing[2] }}
        >
          Welcome to {APP_NAME} Mobile
        </Text>

        <View style={{ marginBottom: 20, width: "100%", alignItems: "center" }}>
          <Button
            variant="primary"
            size="lg"
            onPress={() => router.push("/image-picker-demo")}
            style={{ width: "100%", maxWidth: 300 }}
          >
            Open Ruby Tower Image Picker
          </Button>
        </View>

        <Text style={{ marginBottom: 30 }} variant="body">
          Density & Theme Demo
        </Text>

        <ThemeControls />

        {/* Responsive Content Container */}
        <View
          style={{
            flexDirection: contentDirection,
            gap: 24,
            alignItems: contentAlign,
            width: "100%",
            marginTop: 24,
          }}
        >
          <View style={{ width: panelWidth, gap: 20 }}>
            {/* Stats */}
            <StatsDemo />

            {/* Nav */}
            <NavDemoWrapper />

            {/* Shortcut */}
            <ShortcutDemo />

            {/* Font Demo */}
            <FontDemo />
          </View>

          <View style={{ width: panelWidth }}>
            {/* Components Showcase */}
            <View style={{ marginTop: 0, width: "100%" }}>
              <Text
                variant="heading"
                size="lg"
                weight="bold"
                style={{ marginBottom: 10 }}
              >
                Components
              </Text>
              <View
                style={{
                  flexDirection: componentsSubDirection,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                {/* Buttons */}
                <ButtonDemo />

                {/* Text Inputs */}
                <TextInputDemo />
              </View>

              {/* MenuBar Section */}
              <View
                style={{ width: componentsSubWidth, margin: 0, marginTop: 16 }}
              >
                <MenuBarDemo />
              </View>

              {/* Modal Section */}
              <View style={{ marginTop: 16 }}>
                <ModalDemo />
              </View>

              {/* Dropdown Section */}
              <View style={{ marginTop: 16 }}>
                <DropdownDemo />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
