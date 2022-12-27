import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          NotoSansThaiRegular: require('../assets/fonts/noto-thai-sans/NotoSansThai-Regular.ttf'),
          NotoSansThaiLight: require('../assets/fonts/noto-thai-sans/NotoSansThai-Light.ttf'),
          NotoSansThaiMedium: require('../assets/fonts/noto-thai-sans/NotoSansThai-Medium.ttf'),
          NotoSansThaiSemiBold: require('../assets/fonts/noto-thai-sans/NotoSansThai-SemiBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
