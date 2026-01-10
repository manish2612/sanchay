import * as Brightness from 'expo-brightness';
import { useFocusEffect } from 'expo-router';
import { AppState, type AppStateStatus } from 'react-native';
import { useCallback, useRef } from 'react';

export function useScreenBrightness() {
  // Use ref to track the brightness we should restore to
  const originalBrightness = useRef<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const setupBrightness = async () => {
        try {
          const { status } = await Brightness.requestPermissionsAsync();
          if (status !== 'granted') {
             console.log("Brightness permission denied");
             return;
          }

          // Capture current brightness to restore later
          // We only capture if we haven't already, or if we want to refresh on every focus.
          // Refreshing on every focus is safer in case user changed it while away.
          const current = await Brightness.getBrightnessAsync();
          if (isMounted) {
            originalBrightness.current = current;
            console.log("Saved original brightness:", current);
            
            // Maximize brightness
            await Brightness.setBrightnessAsync(1.0);
          }
        } catch (e) {
          console.error("Failed to setup brightness", e);
        }
      };

      setupBrightness();

      // Handle AppState changes while focused
      const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
        if (!isMounted) return;

        if (nextAppState === 'active') {
          // App came to foreground, maximize
          await Brightness.setBrightnessAsync(1.0);
        } else if (nextAppState.match(/inactive|background/)) {
          // App went to background, restore
          if (originalBrightness.current !== null) {
            await Brightness.setBrightnessAsync(originalBrightness.current);
          }
        }
      });

      return () => {
        isMounted = false;
        subscription.remove();
        // Left the screen (blur), restore
        if (originalBrightness.current !== null) {
            Brightness.setBrightnessAsync(originalBrightness.current).catch((e) => {
                console.error("Failed to restore brightness on blur", e);
            });
        }
      };
    }, [])
  );
}
