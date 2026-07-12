"use client";

import { useState } from "react";
import { LoginScreen } from "@prime/modules";
import { createClient } from "@prime/api";

export default function LoginPage() {
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const handleLogin = async (data: any) => {
    console.log("Login", data);
    try {
      const client = createClient({
        baseURL: "http://202.51.1.109:4545",
        headers: {
          Authorization:
            "Bearer 8e2OYjVMvj8trriL4EDwQYUhHd0tHmlqI4gBfEKHuw+azv18A0zkarpJbCPCzBkgq57amVmtRn1g2Mf0LqiR3xWd5IOrEUgSh0o9Mnz9W9vuCSiDzwmMGH1HD9EG+3ub8Wh9KVD2smsy97CQrdjw9Iyl2Uu5KVHZ4GMD6/aHrxri0/lXjmYtBdrOnn7A/J5DjArzwOZ47y+bhOCC4koGcLlZrDJEqUQJOZ8SdYf4EVcXMxsy1dhwh3haIUXNmS/kY/l/aKc+LwXztI0b2CLLUjlB7SNVUExIw26ZATBOc4tEyi9V",
        },
      });
      // The user specified path: /GetDBConn/EGROW_TECH_PVT._LTD./Admin/Admin@321
      const res = await client.get<string>(
        "/GetDBConn/EGROW_TECH_PVT._LTD./Admin/Admin@321"
      );
      setResponseMsg(typeof res === "string" ? res : JSON.stringify(res));
    } catch (error: any) {
      console.error("Login API Error", error);
      setResponseMsg("Error: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <LoginScreen
        onLogin={handleLogin}
        onForgotPassword={() => console.log("Forgot Password")}
      />
      {responseMsg && (
        <div className="p-4 text-center text-sm font-medium text-green-600">
          Response: {responseMsg}
        </div>
      )}
    </div>
  );
}
