import React from "react";
import { View } from "react-native";
import { NavDemo } from "@prime/ui";
import { useRouter } from "expo-router";

export function NavDemoWrapper() {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 24 }}>
      <NavDemo onLoginPress={() => router.push("/login")} />
    </View>
  );
}
