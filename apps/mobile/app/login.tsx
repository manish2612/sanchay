import { View, Text } from "react-native";
import { UniversalLink } from "@sanchay/ui";

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 32, marginBottom: 20 }}>
        Login Sanchay (Native)
      </Text>
      <Text style={{ marginBottom: 20 }}>This is a dummy login page.</Text>

      <UniversalLink
        href="/"
        style={{ color: "#007AFF", textDecorationLine: "underline" }}
      >
        &larr; Back to Home
      </UniversalLink>
    </View>
  );
}
