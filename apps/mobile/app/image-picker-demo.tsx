import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { UniversalLink } from "@sanchay/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@sanchay/theme-provider";
import { Text, Button, Icon } from "@sanchay/ui";

const STORAGE_KEY = "user_selected_image_uri";

export default function ImagePickerDemo() {
  const [image, setImage] = useState<string | null>(null);
  const { theme, setMode, mode } = useTheme();
  const t = theme as any;

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  useEffect(() => {
    loadSavedImage();
  }, []);

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedImage) {
        setImage(savedImage);
      }
    } catch (e) {
      console.error("Failed to load image", e);
    }
  };

  const saveImage = async (uri: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, uri);
    } catch (e) {
      console.error("Failed to save image", e);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      saveImage(uri);
    }
  };

  const isDark = mode === "dark";
  const footerBg = "#f5f5f5";
  const footerText = "#666666";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }}>
      {/* Custom Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: t.colors.border,
          backgroundColor: "#ffffff",
        }}
      >
        <Text variant="heading" size="lg" weight="bold" color={"#303030"}>
          Ruby Tower
        </Text>
        <Pressable onPress={toggleTheme} style={{ padding: 8 }}>
          <Icon
            name={isDark ? "wb-sunny" : "nightlight-round"}
            size={24}
            color={t.colors.text}
          />
        </Pressable>
      </View>

      <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
        <View style={styles.content}>
          {/* Image Container */}
          <View
            style={[
              styles.imageContainer,
              {
                borderColor: t.colors.border,
                borderWidth: 1,
                backgroundColor: "white",
              },
            ]}
          >
            {image ? (
              <Text color={t.colors.border}>
                Uploaded Image will be shown here
              </Text>
            ) : (
              <Text color="#cccccc">Upload Image</Text>
            )}
          </View>

          {/* Selection Button */}
          <View style={styles.buttonContainer}>
            <Button
              onPress={pickImage}
              variant="primary"
              size="lg"
              style={{ borderRadius: 12 }} // Subtle rounded corners
            >
              {image ? "Change Image" : "Select Image"}
            </Button>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          padding: 16,
          backgroundColor: footerBg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UniversalLink
          href="/about"
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <View style={{ transform: [{ translateY: 3 }, { translateX: -3 }] }}>
            <Icon name="info" size={18} color={footerText} />
          </View>
          <Text
            variant="body"
            size="md"
            color={footerText}
            weight="medium"
            style={{ includeFontPadding: false, textAlignVertical: "center" }}
          >
            About
          </Text>
        </UniversalLink>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
    gap: 30, // Spacing between image and button
  },
  imageContainer: {
    width: 360,
    height: 360,
    borderRadius: 48, // Squircle-ish
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    maxWidth: 250,
  },
});
