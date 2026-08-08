# Layout and Scrolling Strategy

## The Global App Shell Layout

This ERP application is designed with a strict, bounding "App Shell" architecture.

In `apps/web/app/components/AppLayout.tsx`, the root container is strictly constrained to the viewport height using `h-screen w-screen overflow-hidden`.

### Why do we do this?

In heavily data-dense applications (like ERPs, IDEs, and Dashboards), you almost never want the _entire browser window_ to scroll natively.

If the global app was allowed to expand (`min-h-screen`), any large data tables or grids (like the Ledger Entry or Voucher tables) would infinitely expand their height as rows were added. This would push the footer off the screen, cause the entire page to scroll, and break the pinned layout of sidebars, headers, and footers.

By strictly bounding the app to `h-screen overflow-hidden`, we force all internal flex columns to absorb the remaining space (using `flex-1 min-h-0`). This ensures that large data components **scroll internally** while the global shell remains perfectly pinned to the screen.

---

## How to Implement Scrolling for Specific Modules

While `h-screen` is perfect for dense data-entry screens, you will eventually build modules that **should** feel like traditional scrolling web pages (for example: a long `Settings` form, a long `Marketing Dashboard`, or a `Report` view).

Because the global `AppLayout` has `overflow-hidden`, these long pages will be cut off by default.

### The Solution: Localized Overflow

You do not need to (and should not) change the global `AppLayout`.

Instead, simply re-enable vertical scrolling on the root container of that specific module's page (`page.tsx`).

**Example of a scrolling page module:**

```tsx
// apps/web/app/settings/page.tsx
export default function SettingsPage() {
  return (
    // We add `overflow-y-auto` to allow this specific module to scroll its content.
    // `flex-1` ensures it fills the bounded area provided by the AppLayout.
    <div className="flex-1 overflow-y-auto p-8 bg-background">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {/* Long content goes here. The page will scroll smoothly inside the app shell! */}
        <ProfileSettings />
        <BillingSettings />
        <NotificationSettings />
      </div>
    </div>
  );
}
```

By adding `overflow-y-auto` to the specific page wrapper, the main content area will scroll smoothly, while your global Sidebar and Top Headers remain completely unaffected and perfectly pinned.
