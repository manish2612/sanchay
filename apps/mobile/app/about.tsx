import {
  View,
  Image,
  Linking,
  StyleSheet,
  Pressable,
  Share,
} from "react-native";
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

  const onShare = async () => {
    try {
      await Share.share({
        message:
          "One tap to your office entry QR—no more searching, just scanning. Get Ruby Tower: https://rubytower.app",
      });
    } catch (error) {
      console.error(error);
    }
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

        <Button variant="primary" size="lg" onPress={onShare} iconLeft="share">
          Share
        </Button>
        <Button
          variant="outline"
          size="lg"
          onPress={() => router.back()}
          iconLeft="chevron-left"
          style={{ marginTop: 32 }}
        >
          Back
        </Button>

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
    flexDirection: "row",
    gap: 6,
    position: "absolute",
    bottom: 40,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 8,
  },
  footer: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 40, // Extra padding for bottom safety
  },
});
