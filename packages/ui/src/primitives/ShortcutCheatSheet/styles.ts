import { StyleSheet } from 'react-native';
import { Theme } from '@sanchay/design-tokens';

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    padding: theme.space[4] as any,
  },
  title: {
    marginBottom: theme.space[4] as any,
    color: theme.colors.foreground,
    fontFamily: theme.fonts.heading,
    fontSize: theme.fontSizes.xl as any,
    fontWeight: theme.fontWeights.bold as any,
  },
  categoryContainer: {
    marginBottom: theme.space[6] as any,
  },
  categoryTitle: {
    marginBottom: theme.space[3] as any,
    color: (theme.colors as any).mutedForeground || '#71717a',
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.sm as any,
    fontWeight: theme.fontWeights.medium as any,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.space[2] as any,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemLabel: {
    color: theme.colors.foreground,
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.sm as any,
  },
  keysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[1] as any,
  },
  keyCap: {
    backgroundColor: (theme.colors as any).muted || '#f4f4f5',
    borderRadius: theme.radii.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: (theme.space as any)[1.5] || 6,
    paddingVertical: 2, // slightly less vertical padding for keycaps
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: (theme.colors as any).mutedForeground || '#71717a',
    fontFamily: theme.fonts.body,
    fontSize: theme.fontSizes.xs as any,
    fontWeight: theme.fontWeights.medium as any,
    textAlign: 'center',
  },
});
