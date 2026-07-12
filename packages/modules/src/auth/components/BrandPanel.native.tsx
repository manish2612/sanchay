import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { Text, useResponsiveValue } from "@prime/ui";
import { useTheme } from "@prime/theme-provider";
import { getBrandPanelStyles } from "./styles";

interface BrandPanelProps {
  style?: StyleProp<ViewStyle>;
}

export function BrandPanel({ style }: BrandPanelProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = theme as any;

  const isLargeScreen = useResponsiveValue({
    base: false,
    lg: true,
  });

  const styles = useMemo(() => getBrandPanelStyles(t), [t]);

  // Responsive overrides
  const responsiveContainerStyle: ViewStyle = isLargeScreen
    ? { flex: 1, minHeight: "100%" }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "38%",
      };

  return (
    <View style={[styles.container, responsiveContainerStyle, style]}>
      <View>
        <Text
          style={styles.title}
          align={"center"}
          weight={"bold"}
          variant={"heading"}
          size={"2xl"}
        >
          Prime
        </Text>
        <Text
          style={styles.welcome}
          align={"center"}
          variant={"heading"}
          size={"4xl"}
          weight="bold"
        >
          Welcome Back!
        </Text>
        {/* <Text style={styles.subtitle}>Your business, better managed.</Text>
        <Text style={styles.text}>
          Experience the power of a unified platform designed to bring absolute
          precision to every stage of your accounting workflow.
        </Text>
        <Text style={styles.textLast}>
          Beyond simple bookkeeping—our ERP empowers your business to master the
          flow of buying and selling. Streamline every service transaction and
          optimize your revenue streams in one cohesive system.
        </Text> */}
      </View>
    </View>
  );
}
