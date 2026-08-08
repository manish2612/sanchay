import React from 'react';
import { StyleSheet } from 'react-native';
import { useResponsiveValue } from '@prime/ui';
import { LoginScreenProps } from './types';
import { LoginLayout } from './components/LoginLayout.native';
import { BrandPanel } from './components/BrandPanel.native';
import { FormPanel } from './components/FormPanel.native';

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  const isSplit = useResponsiveValue({
    base: false,
    lg: true,
  });

  // We still pass this to prompt child components if needed, but they also have internal logic now
  const panelStyle = isSplit ? styles.splitPanel : undefined;

  return (
    <LoginLayout>
      <BrandPanel style={panelStyle} />
      <FormPanel onLogin={onLogin} onForgotPassword={onForgotPassword} style={panelStyle} />
    </LoginLayout>
  );
}

const styles = StyleSheet.create({
  splitPanel: {
    flex: 1,
    // On web/desktop, we want full height if container is flex:row
    height: '100%',
  },
});
