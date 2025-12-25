import { View, ScrollView, DimensionValue } from "react-native";
import { APP_NAME } from "@sanchay/config";
import {
  Button,
  TextInput,
  Text,
  useResponsiveValues,
  NavDemo,
} from "@sanchay/ui";
import { useRouter } from "expo-router";
import { useTheme } from "@sanchay/theme-provider";
import { Density } from "@sanchay/design-tokens";

export default function Home() {
  const { mode, setMode, density, setDensity, theme, setBrand, brand } =
    useTheme();
  const t = theme as any;
  const router = useRouter();

  const {
    contentDirection,
    contentAlign,
    panelWidth,
    controlItemWidth,
    brandWidth,
    componentsSubDirection,
    componentsSubWidth,
    rootPadding,
  } = useResponsiveValues({
    contentDirection: { base: "column", lg: "row" } as const,
    contentAlign: { base: "stretch", lg: "flex-start" } as const,
    panelWidth: { base: "100%", lg: "48%" } as const,
    // Controls: XL=3col, MD/LG=2col, Base=1col
    controlItemWidth: { base: "100%", md: "48%", xl: "32%" } as const,
    brandWidth: { base: "100%", md: "100%", xl: "32%" } as const, // Brand takes full row in 2-col mode
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

        <Text style={{ marginBottom: 30 }} variant="body">
          Density & Theme Demo 12345
        </Text>

        <View
          style={{
            width: "100%",
            padding: t.spacing[6],
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
                {(["comfortable", "compact", "spacious"] as Density[]).map(
                  (d) => (
                    <Button
                      key={d}
                      onPress={() => setDensity(d)}
                      variant={density === d ? "primary" : "outline"}
                    >
                      {d}
                    </Button>
                  )
                )}
              </View>
            </View>
          </View>
          {/* End Controls Grid */}

          {/* Responsive Content Container */}
          <View
            style={{
              flexDirection: contentDirection,
              gap: 24,
              alignItems: contentAlign,
              width: "100%",
            }}
          >
            <View style={{ width: panelWidth, gap: 20 }}>
              {/* Stats */}
              <View
                style={{
                  padding: t.spacing[4],
                  backgroundColor: t.colors.background,
                  borderRadius: 8,
                }}
              >
                <Text weight="bold" style={{ marginBottom: 5 }}>
                  Resolved Tokens:
                </Text>
                <Text>Button Height: {t.sizes.buttonHeight}px</Text>
                <Text>Base Spacing (4): {t.spacing[4]}px</Text>
              </View>

              {/* Font Demo */}
              <View
                style={{
                  padding: t.spacing[4],
                  backgroundColor: t.colors.background,
                  borderRadius: 8,
                  marginTop: 20,
                }}
              >
                <Text weight="bold" style={{ marginBottom: 10 }}>
                  Font Demo:
                </Text>

                <Text
                  size="xs"
                  color="mutedForeground"
                  style={{ marginBottom: 4 }}
                >
                  IBM Plex Sans (Body)
                </Text>
                <Text weight="light" style={{ marginBottom: 2 }}>
                  Light 300
                </Text>
                <Text
                  weight="light"
                  style={{ marginBottom: 2, fontStyle: "italic" }}
                >
                  Light Italic 300
                </Text>
                <Text weight="regular" style={{ marginBottom: 2 }}>
                  Regular 400
                </Text>
                <Text
                  weight="regular"
                  style={{ marginBottom: 2, fontStyle: "italic" }}
                >
                  Regular Italic 400
                </Text>
                <Text weight="medium" style={{ marginBottom: 2 }}>
                  Medium 500
                </Text>
                <Text
                  weight="medium"
                  style={{ marginBottom: 15, fontStyle: "italic" }}
                >
                  Medium Italic 500
                </Text>

                <Text
                  size="xs"
                  color="mutedForeground"
                  style={{ marginBottom: 4 }}
                >
                  Work Sans (Heading)
                </Text>
                <Text
                  variant="heading"
                  weight="regular"
                  style={{ marginBottom: 2 }}
                >
                  Regular 400
                </Text>
                <Text
                  variant="heading"
                  weight="medium"
                  style={{ marginBottom: 2 }}
                >
                  Medium 500
                </Text>
                <Text
                  variant="heading"
                  weight="semibold"
                  style={{ marginBottom: 2 }}
                >
                  SemiBold 600
                </Text>
                <Text
                  variant="heading"
                  weight="bold"
                  style={{ marginBottom: 2 }}
                >
                  Bold 700
                </Text>
              </View>

              <View style={{ marginBottom: 24 }}>
                <NavDemo onLoginPress={() => router.push("/login")} />
              </View>
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
                  <View style={{ width: componentsSubWidth, margin: 0 }}>
                    <Text
                      size="sm"
                      color="mutedForeground"
                      style={{ marginBottom: 8 }}
                    >
                      Buttons
                    </Text>
                    <View style={{ gap: 8 }}>
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button size="sm">Small</Button>
                      <Button size="lg">Large</Button>
                      <Button loading>Loading</Button>
                    </View>
                  </View>

                  {/* Text Inputs */}
                  <View style={{ width: componentsSubWidth, margin: 0 }}>
                    <Text
                      size="sm"
                      color="mutedForeground"
                      style={{ marginBottom: 8 }}
                    >
                      TextInput
                    </Text>
                    <View style={{ gap: 12 }}>
                      {/* Default */}
                      <TextInput.Root>
                        <TextInput.Input placeholder="Default Input" />
                      </TextInput.Root>

                      {/* With Icon Left */}
                      <TextInput.Root>
                        <TextInput.Slot side="left">
                          <Text>🔍</Text>
                        </TextInput.Slot>
                        <TextInput.Input placeholder="Search..." />
                      </TextInput.Root>

                      {/* Error State */}
                      <TextInput.Root variant="error">
                        <TextInput.Input placeholder="Error State" />
                        <TextInput.Slot side="right">
                          <Text>⚠️</Text>
                        </TextInput.Slot>
                      </TextInput.Root>
                    </View>
                  </View>
                </View>
                {/* End Components Sub-Grid */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
