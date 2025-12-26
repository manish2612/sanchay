import { StyleSheet } from 'react-native';
import { Theme } from '@sanchay/design-tokens';

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    padding: theme.spacing[4],
  },
  title: {
    marginBottom: theme.spacing[4],
    color: theme.colors.foreground,
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  categoryContainer: {
    marginBottom: theme.spacing[6],
  },
  categoryTitle: {
    marginBottom: theme.spacing[3],
    color: theme.colors.muted.foreground,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemLabel: {
    color: theme.colors.foreground,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.sm,
  },
  keysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  keyCap: {
    backgroundColor: theme.colors.muted.DEFAULT,
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing[1.5],
    paddingVertical: 2, // slightly less vertical padding for keycaps
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: theme.colors.muted.foreground,
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: 'center',
  },
});
