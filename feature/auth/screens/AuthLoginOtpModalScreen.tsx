import { faAngleLeft } from '@fortawesome/pro-regular-svg-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  Heading,
  HStack,
  ScrollView,
  Text,
  Button,
  Center,
  Image
} from 'native-base';
import SharedFontAwesome from 'plawarn-rn/feature/shared/SharedFontAwesome';
import useUser from 'plawarn-rn/hooks/useUser';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { RootStackParamList } from 'types';
import AuthOtpInput from '../components/components/AuthOtpInput';

type AuthLoginOtpModalScreenRouteProp = RouteProp<
  RootStackParamList,
  'AuthLoginOtpModalScreen'
>;

type OtpFormValues = {
  otp: string;
};

function AuthLoginOtpModalScreen() {
  // initialize use navigation hook
  const navigation = useNavigation();

  // initialize use route hook
  const route = useRoute<AuthLoginOtpModalScreenRouteProp>();

  // initialize use react-hook-form hook
  const { handleSubmit } = useForm<OtpFormValues>({
    mode: 'onChange',
  });

  // initialize otp input value state
  const [otpInputValue, setOtpInputValue] = useState<string>('');

  // initialize loading state
  const [loading, setLoading] = useState<boolean>(false);

  // handle otp input change
  const handleOtpInputChange = (otp: string) => {
    // log otp
    console.log('otp', otp);
    setOtpInputValue(otp);
  };

  // handle otp submit with usecallback
  const handleOtpSubmit = useCallback(async () => {
    // check otpInputValue
    if (otpInputValue) {
      navigation.goBack();
      navigation.navigate('ProfileFormNameScreen');
      try {
      } catch (err) {
      } finally {
        // set loading false
        setLoading(false);
      }
    }
  }, [otpInputValue]);


  return (
    <ScrollView>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Box px={4} py={6}>
        <HStack mb={6}>
          <Button variant="link" px={0} onPress={() => navigation.goBack()}>
            <SharedFontAwesome
              icon={faAngleLeft}
              size={28}
              color="gray.900"
            ></SharedFontAwesome>
          </Button>
        </HStack>
        <Heading fontSize="2xl" mb={4}>
          ยืนยันรหัส 4 หลัก
        </Heading>
        <Box>
          <Box mb={4}>
            <Text>โปรดกรอกรหัสยืนยัน 4 หลักที่ส่งไปยังหมายเลข</Text>
            <Box flexDirection="row">
              <Image
                width="22"
                height="22"
                source={require('../../../assets/images/flags/th.png')}
                alt="flags img"
                mt={1}
              />
              <Text color="primary.500" pl={1}>{route.params.mobileNumber}</Text>
            </Box>
          </Box>
          <Center mb={6}>
            <AuthOtpInput onChange={handleOtpInputChange} inputCount={4} />
          </Center>
          <Button
            colorScheme="orange"
            onPress={handleSubmit(handleOtpSubmit)}
            isLoading={loading}
          >
            เข้าสู่ระบบ
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default AuthLoginOtpModalScreen;
