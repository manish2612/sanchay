import { View } from "react-native";
import { LoginScreen } from "@sanchay/modules";

export default function LoginScreenPage() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen
        onLogin={(data) => console.log("Login Native", data)}
        onForgotPassword={() => console.log("Forgot Password Native")}
      />
    </View>
  );
}
