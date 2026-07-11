"use client";

import React, { useState } from "react";
import { TextInput, Button, Icon } from "@sanchay/ui";
import { useTheme } from "@sanchay/theme-provider";
import { LoginData } from "../types";

interface FormPanelProps {
  onLogin?: (data: LoginData) => void;
  onForgotPassword?: () => void;
}

export function FormPanel({ onLogin, onForgotPassword }: FormPanelProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = theme as any;

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="absolute top-0 right-0 h-full w-full md:w-1/2 flex justify-center items-center p-6 z-20">
      <div className="bg-background rounded-xl p-10 w-full max-w-[440px] shadow-lg border border-border">
        {/* Company Footer */}
        <div className="bg-muted p-4 rounded-lg flex flex-row items-center gap-3 mb-8">
          <Icon name="business" size={24} className="text-foreground" />
          <div>
            <p className="text-[13px] text-muted-foreground m-0">Company</p>
            <p className="font-semibold text-foreground m-0">
              Egrow Tech Private limited
            </p>
          </div>
        </div>
        <h3 className="text-2xl mb-8 text-center text-foreground font-bold font-heading">
          Login to your account
        </h3>

        {/* Username/Email */}
        <div className="mb-5">
          <TextInput.Root>
            {/* @ts-ignore Web/Native type resolution conflict */}
            <TextInput.Input
              placeholder="Username"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </TextInput.Root>
        </div>

        {/* Password */}
        <div className="mb-8">
          <TextInput.Root>
            {/* @ts-ignore Web/Native type resolution conflict */}
            <TextInput.Input
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <TextInput.Slot side="right">
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="bg-transparent border-none cursor-pointer p-0 flex items-center"
              >
                <Icon
                  name={isVisible ? "visibility" : "visibility_off"}
                  size={20}
                  className="text-muted-foreground"
                />
              </button>
            </TextInput.Slot>
          </TextInput.Root>
        </div>

        {/* Actions */}
        <div className="flex flex-row gap-4 mb-8">
          {/* @ts-ignore Web/Native type resolution conflict */}
          <Button variant="secondary" className="flex-1" onClick={() => {}}>
            Cancel
          </Button>
          {/* @ts-ignore Web/Native type resolution conflict */}
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => onLogin?.({ email, password })}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}
