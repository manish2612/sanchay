"use client";

import { LoginScreen } from "@sanchay/modules";

export default function LoginPage() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <LoginScreen
        onLogin={(data) => console.log("Login", data)}
        onForgotPassword={() => console.log("Forgot Password")}
      />
    </div>
  );
}
