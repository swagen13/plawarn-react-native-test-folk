import { Box } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({
  navigation,
}: RootStackScreenProps<'NotFound'>) {
  return <Box></Box>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
