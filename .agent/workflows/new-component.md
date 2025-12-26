---
description: Development rules and workflow for UI components.
---

# Core Development Rules

1. **Platform Extensions**: Start with `.dom.tsx` for Web and `.native.tsx` for Mobile.
2. **Styling**: Use a separate `styles.ts` file accessing the current theme.
3. **Composition & File Separation**: When implementing the composition pattern, create SEPARATE files for each sub-component (e.g., `[Component]Root.dom.tsx`, `[Component]Item.dom.tsx`). Do NOT bundle multiple sub-components into a single file.
4. **Icons**: Use the app-level Material Icons setup wherever icons are required.
5. **Simpler Extensions**: If files are moved to `dom/` and `native/` folders, DROP the platform specifics. Use standard `.ts` and `.tsx` extensions inside those folders.

---

# Execution Steps

1. **Plan & Approve (Mandatory)**:
   - Create a plan in `implementation_plan.md` detailing the component structure and files.
   - **Ensure the plan lists separate files for each sub-component (Root, Item, etc.)**.
   - **STOP** and ask the user for approval using `notify_user`.
   - PROCEED only after specific user approval.

2. **Analyze Requirements**:
   - Does this component need Icons? (Triggers Rule 4/Rule 2 exception).
   - Will this be a complex composition? (Triggers Rule 5 check).

3. **Draft Implementation**:
   - Create `packages/ui/src/[Component]/`.
   - Create `index.ts`.
   - Create separate files for each part of the composition:
     - `[Component]Root.dom.tsx`, `[Component]Root.native.tsx`
     - `[Component]Item.dom.tsx`, `[Component]Item.native.tsx`
     - etc.

4. **Refactor Check (Rule 5)**:
   - Count the total `.dom.tsx` and `.native.tsx` files.
   - **IF (count > 3)**:
     - Create folders: `[Component]/dom/` and `[Component]/native/`.
     - Move web files to `dom/` and RENAME `*.dom.tsx` to `*.tsx` (e.g., `Root.tsx`).
     - Move native files to `native/` and RENAME `*.native.tsx` to `*.tsx` (e.g., `Root.tsx`).
     - Update `index.ts` to export from the new locations (e.g., `export * from './dom'`).
   - **ELSE**:
     - Keep files as `[Component].dom.tsx` and `[Component].native.tsx` in the root.