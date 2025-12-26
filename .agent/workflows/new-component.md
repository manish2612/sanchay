---
description: Development rules and workflow for UI components.
---

# Core Development Rules

1. **Platform Extensions**: Start with `.dom.tsx` for Web and `.native.tsx` for Mobile.
2. **Styling**: Use a separate `styles.ts` file accessing the current theme.
3. **Composition**: Always follow the composition pattern (e.g. `Component.Root`, `Component.Item`).
4. **Icons**: Use the app-level Material Icons setup wherever icons are required.
5. **Simpler Extensions**: If files are moved to `dom/` and `native/` folders, DROP the platform specifics. Use standard `.ts` and `.tsx` extensions inside those folders.

---

# Execution Steps

1. **Plan & Approve (Mandatory)**:
   - Create a plan in `implementation_plan.md` detailing the component structure and files.
   - **STOP** and ask the user for approval using `notify_user`.
   - PROCEED only after specific user approval.

2. **Analyze Requirements**:
   - Does this component need Icons? (Triggers Rule 4/Rule 2 exception).
   - Will this be a complex composition? (Triggers Rule 5 check).

3. **Draft Implementation**:
   - Create `packages/ui/src/[Component]/`.
   - Create `index.ts`.
   - Create initial files: `[Component].dom.tsx` and `[Component].native.tsx`.

4. **Refactor Check (Rule 5)**:
   - Count the total `.dom.tsx` and `.native.tsx` files.
   - **IF (count > 3)**:
     - Create folders: `[Component]/dom/` and `[Component]/native/`.
     - Move web files to `dom/` and RENAME `*.dom.tsx` to `*.tsx`.
     - Move native files to `native/` and RENAME `*.native.tsx` to `*.tsx`.
     - Update `index.ts` to export from the new locations (e.g., `export * from './dom'`).
   - **ELSE**:
     - Keep files as `[Component].dom.tsx` and `[Component].native.tsx` in the root.