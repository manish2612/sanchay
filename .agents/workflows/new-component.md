---
description: Development rules and workflow for UI components.
---

# Core Development Rules

1. **Platform Extensions**: Start with `.dom.tsx` for Web and `.native.tsx` for Mobile.

2. **Styling Rules**:
   - **NO INLINE STYLES**: Inline styles are forbidden on all platforms.
   - **Web**:
     - Use **Tailwind CSS** classes.
     - **Refactor**: If an element has > 5 class names, move them to a separate `styles.dom.ts`.
   - **Native**:
     - Always use a separate `styles.ts` file.
     - Export a function (e.g., `getStyles(theme)`) that accepts the current theme and returns the styles.

3. **Composition & File Separation**: When implementing the composition pattern, create SEPARATE files for each sub-component (e.g., `[Component]Root.dom.tsx`, `[Component]Item.dom.tsx`). Do NOT bundle multiple sub-components into a single file.
4. **Icons**: Use the app-level Material Icons setup wherever icons are required.
5. **Simpler Extensions**: If files are moved to `dom/` and `native/` folders, DROP the platform specifics. Use standard `.ts` and `.tsx` extensions inside those folders.
6. **Primitive Usage**:
   - CHECK for existing primitives (in `packages/ui/src/primitives/`) before creating new ones.
   - USE existing primitives if available.
7. **Native Interactions**:
   - **ALWAYS** use `Pressable` from `react-native` instead of `TouchableOpacity` or `TouchableHighlight`.
   - **MANDATORY CHECK**: Inspect code for `TouchableOpacity` and replace with `Pressable` if found.

---

# Execution Steps

1. **Primitive & Plan Check (Mandatory)**:
   - **Scan Primitives**: Scan `packages/ui/src/primitives/` to identify ALL available primitives.
   - **Evaluate Reuse**: Explicitly check if any existing primitive can be used for the current task. Priority is ALWAYS to reuse.
   - **Plan**: Create `implementation_plan.md` detailing:
     - Component structure (separate files for Root, Item, etc.).
     - **Primitives Strategy**: Explicitly state which existing primitives will be used.
     - Any NEW primitives proposed (requires approval).
   - **Alert**: Stop and explicitly ask for approval via `notify_user`.

2. **Draft Implementation**:
   - Create `packages/ui/src/[Component]/`.
   - Create `index.ts`.
   - Create separate files for each part of the composition.
   - **Styling**:
     - For Web: Apply Tailwind. If classes > 5, create `styles.dom.ts`.
     - For Native: Create `styles.ts` with `getStyles(theme)` pattern immediately.
   - **Interactions**: Ensure `Pressable` is used for all tappable elements in Native files.

3. **Refactor Check (Rule 5)**:
   - Count the total `.dom.tsx` and `.native.tsx` files.
   - **IF (count > 3)**:
     - Create folders: `[Component]/dom/` and `[Component]/native/`.
     - Move web files to `dom/` and RENAME `*.dom.tsx` to `*.tsx`.
     - Move native files to `native/` and RENAME `*.native.tsx` to `*.tsx`.
     - Update `index.ts` to export from the new locations.
   - **ELSE**:
     - Keep files as `[Component].dom.tsx` and `[Component].native.tsx` in the root.

4. **Final Verification**:
   - Check all `import` / `export` statements in `index.ts` and component files are correct.
   - Verify no inline styles exist.
   - **Verify NO `TouchableOpacity`** is imported or used. Replacing it with `Pressable` is mandatory.