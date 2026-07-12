"use client";

import { ApiService } from "@prime/services";
import { ReactNode, useEffect, useRef } from "react";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export function ApiProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    try {
      ApiService.initialize({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const clientInstance = ApiService.getInstance();

      clientInstance.registerRequestInterceptor((config) => {
        console.log(
          `[Web API Request] ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      });

      clientInstance.registerResponseInterceptor(
        (response) => {
          console.log(
            `[Web API Response] ${response.status} from ${response.config.url}`
          );
          return response;
        },
        (error) => {
          console.error("[Web API Error]", error);
          return Promise.reject(error);
        }
      );
      initialized.current = true;
    } catch (e) {
      // Ignroe if already initialized
    }
  }

  return <>{children}</>;
}
