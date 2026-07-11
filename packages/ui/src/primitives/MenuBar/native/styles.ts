import { StyleSheet } from 'react-native';

export const getMenuBarStyles = (t: any) => StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: t.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: t.colors.border,
    paddingHorizontal: t.space[2],
    height: 40,
    alignItems: 'center',
    zIndex: 10,
  },
  menu: {
    position: 'relative',
    zIndex: 20,
  },
  trigger: {
    paddingHorizontal: t.space[3],
    paddingVertical: t.space[2],
    borderRadius: t.radii.md,
    backgroundColor: 'transparent',
  },
  triggerActive: {
    backgroundColor: t.colors.secondary,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: t.colors.foreground,
  },
  content: {
    position: 'absolute',
    top: 40,
    left: 0,
    minWidth: 200,
    backgroundColor: t.colors.popover || t.colors.background,
    borderRadius: t.radii.md,
    padding: t.space[1],
    borderWidth: 1,
    borderColor: t.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.space[2],
    paddingHorizontal: t.space[2],
    borderRadius: t.radii.sm,
  },
  itemPressed: {
    backgroundColor: t.colors.secondary,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
    color: t.colors.popoverForeground,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: t.colors.muted,
    marginVertical: t.space[1],
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  shortcut: {
    marginLeft: "auto",
    fontSize: 10,
    opacity: 0.6,
  },
  checkboxConfig: {
    // @ts-ignore - explicitly passing size/color numbers/strings not part of StyleSheet
     size: 16,
     color: t.colors.primary,
  }
});
