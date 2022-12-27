import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SWRConfig } from 'swr';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { _swr } from './libs/swr';
import Navigation from './navigation';
import nativeBaseTheme from './theme/nativeBaseTheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider config={config} theme={nativeBaseTheme}>
        <SWRConfig
          value={{
            fetcher: _swr,
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SWRConfig>
      </NativeBaseProvider>
    );
  }
}
