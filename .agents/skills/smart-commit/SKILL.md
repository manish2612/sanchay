---
name: smart-commit
description: Analyzes staged/unstaged git changes and groups them into logical, segregated commits.
---

# Smart Commit Grouper

When this skill is triggered, your goal is to analyze the user's current git workspace and group modified files into logical, atomic commits.

## Workflow

1. **Check Git Status**:
   - Run `git status` to identify modified, added, and deleted files.
   - Run `git diff --cached --stat` (for staged files) or `git diff --stat` (for unstaged files) to understand the scope of changes.
   - If necessary, read specific diffs using `git diff <file>` to understand the context of the changes.

2. **Group the Changes**:
   - Identify files that belong together (e.g., UI component + its styles, a feature + its tests, backend route + frontend API call).
   - Segregate distinct features, bug fixes, or refactors into their own groups.
   - Give each group a concise, descriptive title (e.g., `Feature: Add Godown Allocation Table`, `Fix: Leave Prompt Modal z-index`).

3. **Output the Plan**:
   Present the groups to the user in a clear Markdown format. Provide the proposed commit message and the exact list of files for each group.
   
   Example format:
   ### Group 1: [Commit Message/Type]
   **Reasoning**: Brief explanation of why these files belong together.
   **Files**:
   - `path/to/file1.ts`
   - `path/to/file2.tsx`

4. **Provide Executable Commands**:
   Provide a single block of bash script that the user can run (or that you can run for them) to apply these separated commits. 
   
   *Best Practice for the script:*
   ```bash
   # Reset all staged changes first
   git reset

   # Group 1
   git add path/to/file1.ts path/to/file2.tsx
   git commit -m "feat: [description of group 1]"

   # Group 2
   git add path/to/file3.ts
   git commit -m "fix: [description of group 2]"
   ```

5. **Ask for Approval**:
   Ask the user if they want you to execute the provided commit script or if they would like to adjust the groupings.
