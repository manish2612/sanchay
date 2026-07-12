import React from "react";
import { View } from "react-native";
import { Button, Text, useResponsiveValues } from "@prime/ui";
import { useTheme } from "@prime/theme-provider";
import { Density } from "@prime/design-tokens";

export function ThemeControls() {
  const { mode, setMode, density, setDensity, brand, setBrand, theme } =
    useTheme();
  const t = theme as any;

  const { controlItemWidth, brandWidth } = useResponsiveValues({
    // Controls: XL=3col, MD/LG=2col, Base=1col
    controlItemWidth: { base: "100%", md: "48%", xl: "32%" } as const,
    brandWidth: { base: "100%", md: "100%", xl: "32%" } as const, // Brand takes full row in 2-col mode
  });

  return (
    <View
      style={{
        width: "100%",
        padding: t.space[6],
        backgroundColor: t.colors.surface || "#eee",
        borderRadius: t.radii.lg || 12,
      }}
    >
      {/* Controls Grid Container */}

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Theme Controls */}
        <View
          style={{
            width: controlItemWidth,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            backgroundColor: t.colors.background,
            borderRadius: 8,
          }}
        >
          <Text size="md" weight="semibold">
            Theme Mode
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              onPress={() => setMode("light")}
              variant={mode === "light" ? "primary" : "outline"}
            >
              Light
            </Button>
            <Button
              onPress={() => setMode("dark")}
              variant={mode === "dark" ? "primary" : "outline"}
            >
              Dark
            </Button>
          </View>
        </View>

        {/* Brand Controls */}
        <View
          style={{
            width: brandWidth,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            backgroundColor: t.colors.background,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <Text size="md" weight="semibold">
            Brand ({brand})
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button
              onPress={() => setBrand("default")}
              variant={brand === "default" ? "primary" : "outline"}
            >
              Default
            </Button>
            <Button
              onPress={() => setBrand("orange")}
              variant={brand === "orange" ? "primary" : "outline"}
            >
              Orange
            </Button>
          </View>
        </View>

        {/* Density Controls */}
        <View
          style={{
            width: controlItemWidth, // Uses responsive width
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            backgroundColor: t.colors.background,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <Text size="md" weight="semibold">
            Density ({density})
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {(["comfortable", "compact", "spacious"] as Density[]).map((d) => (
              <Button
                key={d}
                onPress={() => setDensity(d)}
                variant={density === d ? "primary" : "outline"}
              >
                {d}
              </Button>
            ))}
          </View>
        </View>
      </View>
      {/* End Controls Grid */}

      {/* Stats */}
      <View
        style={{
          padding: t.space[4],
          backgroundColor: t.colors.background,
          borderRadius: 8,
        }}
      >
        <Text weight="bold" style={{ marginBottom: 5 }}>
          Resolved Tokens:
        </Text>
        <Text>Button Height: {t.sizes.buttonHeight}px</Text>
        <Text>Base Spacing (4): {t.space[4]}px</Text>
      </View>
    </View>
  );
}
