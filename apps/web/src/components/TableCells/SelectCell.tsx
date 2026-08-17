import React from "react";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  Icon,
} from "@prime/ui";

export interface SelectCellOption {
  label: string;
  value: string;
}

export const SelectCell = ({ getValue, row, column, table, options }: any) => {
  const meta = table.options.meta || ({} as any);
  const updateData = meta?.actions?.updateData;
  const error = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];

  const externalValue = getValue() as string;

  // Local display state — avoids RHF re-renders during selection so the
  // trigger DOM node stays intact while Radix is managing focus restoration.
  const [localValue, setLocalValue] = React.useState(externalValue);

  // Pending value to flush to RHF only after the dropdown has fully closed.
  const pendingRef = React.useRef<string | null>(null);

  // Keep in sync when external data changes (e.g. row reset / external update)
  React.useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  const selectedOpt = (options as SelectCellOption[]).find(
    (o) => o.value === localValue
  );

  return (
    <DropdownRoot
      modal={false}
      onOpenChange={(isOpen) => {
        if (!isOpen && pendingRef.current !== null) {
          // Dropdown is fully closed. Radix has already restored focus to the trigger.
          // Safe to commit to RHF now — re-render won't disturb focus.
          updateData?.(row.index, column.id, pendingRef.current);
          pendingRef.current = null;
        }
      }}
    >
      <DropdownTrigger
        className={`h-8 w-full px-2 rounded-md bg-transparent border-0 outline-none text-sm text-left flex justify-between items-center group data-[state=open]:bg-primary/5 hover:bg-surface-variant/50 transition-all ${
          error
            ? "ring-2 ring-danger ring-offset-0"
            : "focus:ring-1 focus:ring-primary"
        }`}
      >
        <span className={!selectedOpt ? "text-muted-foreground" : ""}>
          {selectedOpt ? selectedOpt.label : "Select..."}
        </span>
        <Icon
          name="ChevronDown"
          size={14}
          className="opacity-50 group-data-[state=open]:rotate-180 transition-transform shrink-0"
        />
      </DropdownTrigger>
      <DropdownContent align="start" className="min-w-[120px]">
        {(options as SelectCellOption[]).map((opt) => (
          <DropdownItem
            key={opt.value}
            onSelect={() => {
              // Only update local state here — no RHF mutation, trigger DOM stays intact.
              // Radix closes naturally → onOpenChange(false) → RHF update fires safely.
              setLocalValue(opt.value);
              pendingRef.current = opt.value;
            }}
          >
            {opt.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
};
