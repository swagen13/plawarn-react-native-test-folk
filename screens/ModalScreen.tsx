import { StatusBar } from 'expo-status-bar';
import { Box } from 'native-base';
import { Platform, StyleSheet } from 'react-native';

export default function ModalScreen() {
  return <Box></Box>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
