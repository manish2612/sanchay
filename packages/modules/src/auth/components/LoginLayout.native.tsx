import React, { useMemo } from 'react';
import { View, Platform } from 'react-native';
import { useResponsiveValue } from '@prime/ui';
import { useTheme } from '@prime/theme-provider';
import { getLoginLayoutStyles } from './styles';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = theme as any;

  const styles = useMemo(() => getLoginLayoutStyles(t), [t]);

  const isSplit = useResponsiveValue({
    base: false,
    lg: true,
  });

  return (
    <View
      style={[
        styles.container,
        isSplit && styles.splitLayout,
        // Critical for Web: Root view needs explicit height to fill window
        Platform.OS === 'web' && ({ height: '100vh' } as any),
      ]}
    >
      {children}
    </View>
  );
}
