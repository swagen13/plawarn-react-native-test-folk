import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import SharedLanguageSwitcher from 'plawarn-rn/feature/shared/languages/LanguageSwitcher';
import React from 'react';

const logoImage = require('../../../assets/images/logo.png');

function OnboardScreen() {
  // initialize use navigation hook
  const navigation = useNavigation();

  return (
    <Scaffold>
      <Flex px={4} pt={4} pb={1} height="100%" justifyContent="space-between">
        <HStack alignItems="center" justifyContent="space-between">
          <Box>
            <Image source={logoImage} alt="Plawarn" />
          </Box>
          <Box>
            <SharedLanguageSwitcher />
            
          </Box>
        </HStack>
        <Box>
          <Center mb={2}>
            <Image
              width="80%"
              height="210px"
              resizeMode="contain"
              source={require('../../../assets/images/onboard/onboard.png')}
              alt="Onboard Icon"
            />
          </Center>
          <Heading mb={1}>ยินดีต้อนรับสู่ ปลาวาฬ</Heading>
          <Text mb={4}>
            เราเป็นตลาดกลางแรงงานเพื่อเชื่อมต่อระหว่างผู้ใช้แรงงานและนายจ้าง
          </Text>
          <Box py={3}>
            <Button
              colorScheme="orange"
              onPress={() => navigation.navigate('AuthLoginScreen')}
            >
              เข้าใช้งาน
            </Button>
          </Box>
        </Box>
      </Flex>
    </Scaffold>
  );
}

export default OnboardScreen;
