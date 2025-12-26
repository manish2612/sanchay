"use client";

import React, { useState } from "react";
import { useShortcut, Button, Text } from "@sanchay/ui";

export const ShortcutDemo = () => {
  const [triggered, setTriggered] = useState<string | null>(null);
  const [scope, setScope] = useState("global");

  // Global shortcut
  useShortcut(
    "shift+g",
    () => {
      setTriggered("Global Shortcut (Shift+G)");
      alert("Global Shortcut Triggered!");
    },
    {
      description: "Trigger global alert",
    }
  );

  // Scoped shortcut - only active when simulated scope is active?
  // Note: changing 'scope' variable here doesn't actually change the context scope unless we use a Scope provider/manager.
  // For this demo, we'll just show basic triggering.

  useShortcut("meta+k", (e) => {
    e.preventDefault();
    setTriggered("Command Palette (Cmd+K)");
    console.log("Open Command Palette");
  });

  return (
    <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-md my-4">
      <Text className="mb-2 font-bold text-lg">Shortcut System Demo</Text>
      <Text className="mb-4">Try pressing the following keys:</Text>

      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
            Shift + G
          </code>
          : Triggers a global alert
        </li>
        <li>
          <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">
            Cmd + K
          </code>
          : Logs to console (Simulated Command Palette)
        </li>
      </ul>

      {triggered && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-2 rounded mt-2">
          Last triggered: {triggered}
        </div>
      )}

      <div className="mt-4">
        <Button onClick={() => setTriggered(null)}>Clear Log</Button>
      </div>
    </div>
  );
};
