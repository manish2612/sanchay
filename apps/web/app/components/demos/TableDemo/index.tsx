"use client";

import { cn, Button } from "@prime/ui";
import * as React from "react";
import { TableBare60 } from "./TableBare60";
import { TableFull1000 } from "./TableFull1000";
import { TableFull5 } from "./TableFull5";
import { TableNoChrome1000 } from "./TableNoChrome1000";
import { TableNoChrome6 } from "./TableNoChrome6";
import { TableNoData } from "./TableNoData";

import { TableEditable } from "./TableEditable";

// Re-export individual components
export {
  TableBare60,
  TableFull1000,
  TableFull5,
  TableNoChrome1000,
  TableNoChrome6,
  TableNoData,
  TableEditable,
};

// --- Main Demo Component with Toggle ---

type Scenario =
  | "full-1000"
  | "full-5"
  | "no-chrome-1000"
  | "no-chrome-6"
  | "bare-60"
  | "no-data"
  | "editable";

const SCENARIOS: {
  id: Scenario;
  label: string;
  Component: React.ComponentType;
}[] = [
  { id: "editable", label: "Editable Rows", Component: TableEditable },
  { id: "full-1000", label: "Full (1000 rows)", Component: TableFull1000 },
  { id: "full-5", label: "Full (5 rows)", Component: TableFull5 },
  {
    id: "no-chrome-1000",
    label: "No Chrome (1000)",
    Component: TableNoChrome1000,
  },
  { id: "no-chrome-6", label: "No Chrome (6)", Component: TableNoChrome6 },
  { id: "bare-60", label: "Bare (60 rows)", Component: TableBare60 },
  { id: "no-data", label: "No Data", Component: TableNoData },
];

export function TableDemo() {
  const [activeScenarioId, setActiveScenarioId] =
    React.useState<Scenario>("editable");
  const ActiveComponent = SCENARIOS.find(
    (s) => s.id === activeScenarioId,
  )!.Component;

  return (
    <div className="w-full p-4 border border-[#222222] rounded-lg bg-surface shadow-sm text-card-foreground space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Advanced Virtual Table Demo</h2>

        {/* Scenario Toggles */}
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((scenario) => (
            <Button
              key={scenario.id}
              onClick={() => setActiveScenarioId(scenario.id)}
              variant={activeScenarioId === scenario.id ? "primary" : "outline"}
              size="sm"
            >
              {scenario.label}
            </Button>
          ))}
        </div>
      </div>

      <ActiveComponent />

      <p className="text-xs text-muted-foreground">
        Current Mode:{" "}
        <span className="font-mono font-medium">
          {SCENARIOS.find((s) => s.id === activeScenarioId)?.label}
        </span>
        . Use Up/Down Arrow keys to navigate.
      </p>
    </div>
  );
}
