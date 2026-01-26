import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { UniversalLink } from "@sanchay/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useTheme } from "@sanchay/theme-provider";
import { Text, Button, Icon } from "@sanchay/ui";

const PROFILE_IMAGE_FILENAME = "user_profile_image.jpg";

export default function ImagePickerDemo() {
  const [image, setImage] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isDebugVisible, setIsDebugVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const { theme, setMode, mode } = useTheme();
  const t = theme as any;

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  useEffect(() => {
    loadSavedImage();
  }, []);

  const loadSavedImage = async () => {
    try {
      if (!FileSystem.documentDirectory) {
        console.warn("FileSystem.documentDirectory is null");
        return;
      }
      const destinationUri =
        FileSystem.documentDirectory + PROFILE_IMAGE_FILENAME;
      setDebugInfo(`Checking: ${destinationUri}`);
      const fileInfo = await FileSystem.getInfoAsync(destinationUri);
      if (fileInfo.exists) {
        setImage(`${destinationUri}?t=${Date.now()}`);
        setDebugInfo((prev) => prev + `\nLoaded: ${destinationUri}`);
      } else {
        setDebugInfo((prev) => prev + `\nFile does not exist`);
      }
    } catch (e) {
      console.error("Failed to load image", e);
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
      try {
        if (!FileSystem.documentDirectory) {
          throw new Error("FileSystem.documentDirectory is null");
        }

        const sourceUri = result.assets[0].uri;
        const destinationUri =
          FileSystem.documentDirectory + PROFILE_IMAGE_FILENAME;

        // Check if file exists and delete to ensure overwrite works cleanly
        const fileInfo = await FileSystem.getInfoAsync(destinationUri);
        if (fileInfo.exists) {
          await FileSystem.deleteAsync(destinationUri, { idempotent: true });
        }

        await FileSystem.copyAsync({ from: sourceUri, to: destinationUri });

        // Add timestamp to force reload
        const newUri = `${destinationUri}?t=${Date.now()}`;
        setImage(newUri);
        setDebugInfo(
          `Source: ${sourceUri}\nSaved to: ${destinationUri}\nTimestamp: ${Date.now()}`,
        );
      } catch (e) {
        console.error("Failed to save/copy image", e);
      }
    }
  };

  const isDark = mode === "dark";
  const footerBg = "#f5f5f5";
  const footerText = "#666666";

  const handleDebugToggle = () => {
    if (isDebugVisible) {
      setIsDebugVisible(false);
      setTapCount(0);
    } else {
      const newCount = tapCount + 1;
      setTapCount(newCount);
      if (newCount >= 5) {
        setIsDebugVisible(true);
        setTapCount(0);
      }
    }
  };

  console.log(">>>> debugInfo ", debugInfo || "NA");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.colors.background }}>
      {/* Custom Header */}
      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: "#f5f5f5",
            flex: 1,
            borderRadius: 12,
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
      </View>

      <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
        <View style={styles.content}>
          {/* Image Container */}
          <Pressable
            onPress={handleDebugToggle}
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
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text color="#cccccc">Upload Image</Text>
            )}
          </Pressable>

          {/* Selection Button */}
          <View style={styles.buttonContainer}>
            <Button
              onPress={pickImage}
              variant="primary"
              size="lg"
              style={{ borderRadius: 8 }} // Subtle rounded corners
              iconLeft="image"
            >
              {image ? "Change Image" : "Select Image"}
            </Button>
          </View>

          {/* Debug Info */}
          {isDebugVisible && (
            <View style={{ padding: 10, width: "100%" }}>
              <Text size="xs" color="#999">
                Debug Info:
              </Text>
              <Text size="xs" color="#333" style={{ fontFamily: "monospace" }}>
                {debugInfo}
              </Text>
            </View>
          )}
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
