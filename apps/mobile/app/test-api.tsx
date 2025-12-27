import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { apiClient } from "@sanchay/services";
import { Stack } from "expo-router";

export default function TestApiScreen() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleRequest = async (
    method: string,
    operation: () => Promise<any>
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await operation();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getList = () =>
    handleRequest("GET List", () => apiClient.get("/posts"));
  const getDetail = () =>
    handleRequest("GET Detail", () => apiClient.get("/posts/1"));

  const postCreate = () =>
    handleRequest("POST Create", () =>
      apiClient.post("/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      })
    );

  const putUpdate = () =>
    handleRequest("PUT Update", () =>
      apiClient.put("/posts/1", {
        id: 1,
        title: "foo updated",
        body: "bar updated",
        userId: 1,
      })
    );

  const patchUpdate = () =>
    handleRequest("PATCH Update", () =>
      apiClient.patch("/posts/1", {
        title: "foo patched",
      })
    );

  const deleteItem = () =>
    handleRequest("DELETE", () => apiClient.delete("/posts/1"));

  const postMultipart = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      // In React Native, file objects are slightly different, but FormData polyfill handles { uri, type, name }
      formData.append("test-file", {
        uri: "file:///path/to/test.txt",
        type: "text/plain",
        name: "test.txt",
      } as any);

      const res = await apiClient.post("https://httpbin.org/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res);
    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "API Test" }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>API Utility Test</Text>

        <View style={styles.buttonContainer}>
          <Button
            label="GET List"
            onPress={getList}
            color="#3b82f6"
            disabled={loading}
          />
          <Button
            label="GET Detail"
            onPress={getDetail}
            color="#3b82f6"
            disabled={loading}
          />
          <Button
            label="POST Create"
            onPress={postCreate}
            color="#22c55e"
            disabled={loading}
          />
          <Button
            label="PUT Update"
            onPress={putUpdate}
            color="#eab308"
            disabled={loading}
          />
          <Button
            label="PATCH Update"
            onPress={patchUpdate}
            color="#eab308"
            disabled={loading}
          />
          <Button
            label="DELETE"
            onPress={deleteItem}
            color="#ef4444"
            disabled={loading}
          />
          <Button
            label="POST Multipart"
            onPress={postMultipart}
            color="#a855f7"
            disabled={loading}
          />
        </View>

        <View style={styles.resultContainer}>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {result && (
            <ScrollView style={styles.jsonContainer} nestedScrollEnabled>
              <Text style={styles.jsonText}>
                {JSON.stringify(result, null, 2)}
              </Text>
            </ScrollView>
          )}
          {!loading && !error && !result && (
            <Text style={styles.placeholderText}>
              Select an operation to see results
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Button({
  label,
  onPress,
  color,
  disabled,
}: {
  label: string;
  onPress: () => void;
  color: string;
  disabled: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: color,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1f2937",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: "45%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f9fafb",
    minHeight: 200,
  },
  jsonContainer: {
    maxHeight: 400,
  },
  jsonText: {
    fontFamily: "monospace",
    fontSize: 12,
  },
  errorText: {
    color: "#ef4444",
  },
  placeholderText: {
    color: "#9ca3af",
  },
});
