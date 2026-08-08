import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    maxHeight: '80%', // Avoid overflow
  },
  item: {
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
  shortcut: {
    fontSize: 12,
    opacity: 0.6,
  },
  label: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.7,
  },
  separator: {
    height: 1,
    marginVertical: 4,
  },
  searchInput: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
  },
  searchContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
});

export const getDropdownThemeStyles = (theme: any) => ({
  content: {
    backgroundColor: theme.colors.popover,
    borderColor: theme.colors.border,
  },
  itemText: {
    color: theme.colors.foreground,
  },
  shortcut: {
    color: theme.colors.mutedForeground,
  },
  label: {
    color: theme.colors.mutedForeground,
  },
  separator: {
    backgroundColor: theme.colors.border,
  },
  pressedItem: {
    backgroundColor: theme.colors.muted,
  },
  searchContainer: {
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    color: theme.colors.foreground,
  },
});
