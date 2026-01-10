import { View, Image, Linking, StyleSheet, Pressable } from "react-native";
import { Text, Button, Icon } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const { theme } = useTheme();
  const t = theme as any;
  const router = useRouter();

  const openGithub = () => {
    Linking.openURL("https://github.com/manish2612");
  };

  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}>
      <View style={styles.content}>
        {/* App Logo */}
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text
          variant="heading"
          size="2xl"
          weight="bold"
          style={{ marginBottom: 12, textAlign: "center" }}
        >
          Ruby Tower
        </Text>

        {/* Description */}
        <Text
          variant="body"
          size="lg"
          style={{
            textAlign: "center",
            marginBottom: 32,
            lineHeight: 24,
            opacity: 0.8,
            maxWidth: 300,
          }}
        >
          One tap to your office entry QR—no more searching, just scanning.
        </Text>

        {/* GitHub Link */}
        <Pressable onPress={openGithub} style={styles.githubContainer}>
          <Text variant="body" size="md" style={{ opacity: 0.6 }}>
            Built by
          </Text>
          <Text
            variant="body"
            size="md"
            weight="medium"
            style={{ color: t.colors.primary, marginTop: 4 }}
          >
            @manish2612
          </Text>
        </Pressable>
      </View>

      {/* Footer / Back Navigation */}
      <View style={styles.footer}>
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingHorizontal: 32,
          }}
        >
          <View style={{ transform: [{ translateY: 3 }, { translateX: -3 }] }}>
            <Icon name="home" size={20} color="#ffffff" />
          </View>
          <Text
            variant="body"
            size="md"
            color="#ffffff"
            weight="medium"
            style={{ includeFontPadding: false, textAlignVertical: "center" }}
          >
            Home
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 24, // Matches standard iOS icon curvature approx
  },
  githubContainer: {
    alignItems: "center",
    padding: 12,
  },
  footer: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 40, // Extra padding for bottom safety
  },
});
