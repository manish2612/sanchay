import { View, Text, ScrollView } from 'react-native';
import { APP_NAME } from '@sanchay/config';
import { Button } from '@sanchay/ui';
import { useTheme } from '@sanchay/theme-provider';
import { Density } from '@sanchay/design-tokens';

export default function Home() {
  const { mode, setMode, density, setDensity, theme } = useTheme();
  const t = theme as any;

  return (
    <ScrollView contentContainerStyle={{ 
      flexGrow: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: t.colors.background,
      padding: t.spacing[6] || 24
    }}>
      <Text style={{ 
          color: t.colors.foreground, 
          fontSize: 24, 
          fontWeight: 'bold',
          marginBottom: t.spacing[2],
          textAlign: 'center'
      }}>
        {APP_NAME} Mobile
      </Text>
      
      <Text style={{ color: t.colors.foreground, opacity: 0.7, marginBottom: 30 }}>
        Density & Theme Demo
      </Text>
      
      <View style={{ 
          width: '100%', 
          padding: t.spacing[6], 
          backgroundColor: t.colors.surface || '#eee', 
          borderRadius: t.radii.lg || 12 
      }}>
        
        {/* Theme Controls */}
        <Text style={{ color: t.colors.foreground, fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
          Theme Mode
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            <Button onClick={() => setMode('light')}>Light</Button>
            <Button onClick={() => setMode('dark')}>Dark</Button>
        </View>

        {/* Density Controls */}
        <Text style={{ color: t.colors.foreground, fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
          Density ({density})
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {(['comfortable', 'compact', 'spacious'] as Density[]).map(d => (
                <Button key={d} onClick={() => setDensity(d)}>
                    {d}
                </Button>
            ))}
        </View>

         {/* Stats */}
         <View style={{ padding: t.spacing[4], backgroundColor: t.colors.background, borderRadius: 8 }}>
            <Text style={{ color: t.colors.foreground, fontWeight: 'bold', marginBottom: 5 }}>
                Resolved Tokens:
            </Text>
            <Text style={{ color: t.colors.foreground }}>
                Button Height: {t.sizes.buttonHeight}px
            </Text>
            <Text style={{ color: t.colors.foreground }}>
                Base Spacing (4): {t.spacing[4]}px
            </Text>
         </View>
      </View>
    </ScrollView>
  );
}
