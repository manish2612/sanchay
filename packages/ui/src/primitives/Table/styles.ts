import { cva } from 'class-variance-authority';
import { StyleSheet } from 'react-native';

export const tableStyles = {
    root: cva("relative flex flex-col w-full h-full overflow-hidden rounded-md border border-border bg-background"),
    header: cva("flex w-full bg-secondary text-secondary-foreground font-medium text-sm"), // Removed sticky top-0
    headerRow: cva("flex w-full items-center border-b border-border p-0"),
    headerCell: cva("flex-1 px-4 py-3 h-10 items-center justify-start text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"),
    body: cva("w-full h-full"), // Removed relative, ensured full height
    row: cva(
        "flex w-full items-center border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted data-[focused=true]:bg-accent data-[focused=true]:text-accent-foreground outline-none cursor-default",
        {
            variants: {
                variant: {
                    default: "",
                }
            },
            defaultVariants: {
                variant: "default"
            }
        }
    ),
    cell: cva("flex-1 px-4 py-2 text-sm text-foreground truncate items-center flex"),
    footer: cva("flex w-full border-t border-border bg-muted/50 font-medium text-sm"),
    statusBar: cva("flex w-full items-center justify-between px-4 py-1 text-xs text-muted-foreground bg-muted/20 border-y border-border/50 shrink-0"),
};

