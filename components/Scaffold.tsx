import { Box } from 'native-base';
import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

function Scaffold({
  children,
  edge = ['top', 'left', 'right', 'bottom'],
}: {
  children: React.ReactNode;
  edge?: Edge[];
}) {
  return (
    <SafeAreaView edges={edge}>
      <Box height="100%">{children}</Box>
    </SafeAreaView>
  );
}

export default Scaffold;
