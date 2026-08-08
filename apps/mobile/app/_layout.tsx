import { Slot } from 'expo-router';
import { ThemeProvider } from '@prime/theme-provider';
import { LinkProvider } from '@prime/ui';
import { ExpoLinkAdapter } from '../providers/ExpoLinkAdapter';
import { ApiProvider } from '../providers/ApiProvider';
import {
  useFonts,
  IBMPlexSans_300Light,
  IBMPlexSans_300Light_Italic,
  IBMPlexSans_400Regular,
  IBMPlexSans_400Regular_Italic,
  IBMPlexSans_500Medium,
  IBMPlexSans_500Medium_Italic,
} from '@expo-google-fonts/ibm-plex-sans';
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'IBM Plex Sans': IBMPlexSans_400Regular,
    'IBM Plex Sans-Italic': IBMPlexSans_400Regular_Italic,
    'IBM Plex Sans-Light': IBMPlexSans_300Light,
    'IBM Plex Sans-Light-Italic': IBMPlexSans_300Light_Italic,
    'IBM Plex Sans-Medium': IBMPlexSans_500Medium,
    'IBM Plex Sans-Medium-Italic': IBMPlexSans_500Medium_Italic,
    'Work Sans': WorkSans_500Medium,
    'Work Sans-Regular': WorkSans_400Regular,
    'Work Sans-SemiBold': WorkSans_600SemiBold,
    'Work Sans-Bold': WorkSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider initialBrand="classic" initialMode="system">
      <ApiProvider>
        <LinkProvider value={ExpoLinkAdapter}>
          <Slot />
        </LinkProvider>
      </ApiProvider>
    </ThemeProvider>
  );
}
