import { View, Text } from 'react-native';
import { APP_NAME } from '@sanchay/config';
import { Button } from '@sanchay/ui';
import { useTheme } from '@sanchay/theme-provider/native';

export default function Home() {
  const { mode, setMode, theme } = useTheme();

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.colors.background 
    }}>
      <Text style={{ color: theme.colors.foreground }}>
        Welcome to {APP_NAME} Mobile
      </Text>
      <Text style={{ color: theme.colors.primary, marginBottom: 20 }}>
        Current Mode: {mode}
      </Text>
      
      <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </Button>
      
      <View style={{ marginTop: 20 }}>
        <Button onClick={() => console.log('Mobile Click')}>
          Shared UI Button
        </Button>
      </View>
    </View>
  );
}
