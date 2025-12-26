import React from "react";
import { LoginScreenProps } from "./types";
import { LoginLayout } from "./components/LoginLayout.dom";
import { BrandPanel } from "./components/BrandPanel.dom";
import { FormPanel } from "./components/FormPanel.dom";

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  return (
    <LoginLayout>
      <BrandPanel />
      <FormPanel onLogin={onLogin} onForgotPassword={onForgotPassword} />
    </LoginLayout>
  );
}
