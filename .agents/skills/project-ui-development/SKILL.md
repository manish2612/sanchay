---
name: project-ui-development
description: Project specific UI development guidelines. Extends react-best-practices-M2 with rules for Lucide icons, responsive design, and accessibility. Trigger for any UI development.
---

# UI Development Guidelines for ERP-FE

This skill extends the core React rules (`react-best-practices-M2`) with project-specific UI directives. ALWAYS adhere to these rules when developing or modifying UI components.

## Core Directives
- **Inherit React Best Practices**: Always follow all architectural, styling, component structure, and composition rules defined in the `react-best-practices-M2` skill.

## 1. Iconography (Lucide Icons)
- Use **Lucide React** icons correctly wherever required.
- Do NOT change icon names randomly unless the task explicitly asks for it. 
- Ensure the exact requested icon name is used to maintain consistency.

## 2. Design System and Density
- UI must be designed according to the existing design system and density guidelines of the project.
- Match existing components' padding, margins, font sizes, colors, and layout density to ensure a cohesive look.

## 3. Responsive Design Support
- **Tablet and Above**: Tablet and larger screens MUST always be supported. Responsive UI is mandatory.
- **Mobile Support**: Mobile should be supported where complexity is medium (e.g., login screens, simple forms, screens displaying up to 4-column tables, changing a sidebar to a drawer on smaller screens).
- **Mobile Exceptions**: Mobile is NOT expected to support overly complex UI layouts that will break or become unusable (e.g., data tables with too many columns, highly complex multi-panel views).
- **Doubt Escalation**: If there is any doubt about whether a specific UI element should be responsive on mobile, you MUST specifically ASK or INFORM the user before proceeding.

## 4. Accessibility (a11y)
- **Keyboard Navigation**: Everything MUST be fully usable with a keyboard.
- Ensure proper focus states are visible.
- Use semantic HTML elements properly (e.g., `<button>` for actions, `<a>` for navigation).
- Add necessary ARIA attributes to custom interactive elements to support keyboard and screen reader users fully.
