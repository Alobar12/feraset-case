import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Regular: require('../../assets/fonts/Manrope-Regular.ttf'),
    ExtraBold: require('../../assets/fonts/Manrope-ExtraBold.ttf'),
    Bold: require('../../assets/fonts/Manrope-Bold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
