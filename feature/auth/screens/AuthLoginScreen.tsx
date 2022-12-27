import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faAngleLeft } from '@fortawesome/pro-regular-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import InputMobileNumber, {
  ILocaleOption,
} from 'plawarn-rn/feature/shared/inputs/InputMobileNumber';
import SharedFontAwesome from 'plawarn-rn/feature/shared/SharedFontAwesome';
import useUser from 'plawarn-rn/hooks/useUser';
import React, { useCallback, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function AuthLoginScreen() {
  // initialize react-hook-form hook
  const { control, handleSubmit } = useForm();

  // initialize useAsyncStorage
  const { getItem, setItem } = useAsyncStorage('User');

  // initialize use navigation hook
  const navigation = useNavigation();

  // initialize locale selected state
  const [localeSelected, setLocaleSelected] = useState<ILocaleOption | null>(
    null
  );

  const [errorMessage, setErrorMessage] = useState('');

  // initialize loading
  const [loading, setLoading] = useState<boolean>(false);

  // initialize use transition hook
  const { t } = useTranslation();

  // handle local change
  const handleLocaleChange = (locale: ILocaleOption) => {
    setLocaleSelected(locale);
  };

  // handle form submit
  const handleFormSubmit = useCallback(
    async (payload: any) => {
      const value = await getItem();
      const result = JSON.parse(value)      

      if (result.mobileNumber) {
        // log payload
        var mobileNumber = localeSelected?.value + payload.mobileNumber;
        if (mobileNumber === result.mobileNumber) {

          // try catch error
          try {
            const data = {
              mobileNumber: mobileNumber,
              locale: localeSelected?.code,
            }
            // check localeSelected
            if (localeSelected?.code) {              
              // await AsyncStorage.setItem('User', JSON.stringify(data));
              navigation.navigate('AuthLoginOtpModalScreen', {
                mobileNumber: mobileNumber,
                serviceSid: 'asdasda',
                locale: localeSelected.code,
              });
            } else {
              // show error
              Alert.alert('กรุณาเลือกประเทศ');
            }
          } catch (error) {
          } finally {
            // set loading false
            setLoading(false);
          }
        } else {
          Alert.alert('กรุณาตรวจสอบเบอร์โทรศัพท์อีกครั้ง')
        }
      }
    },
    [localeSelected]
  );

  return (
    <Scaffold>
      <StatusBar style="light"></StatusBar>
      <ScrollView contentContainerStyle={{ height: '100%' }} bounces={false}>
        <Box height="100%">
          <Button
            position="absolute"
            top={10}
            left={4}
            px={0}
            variant="unstyled"
            onPress={() => navigation.goBack()}
            zIndex={9}
          >
            <SharedFontAwesome icon={faAngleLeft} color="white" size={28} />
          </Button>
          <Center pt={20} pb={10} bg="primary.500">
            <Image
              width="120px"
              height="120px"
              source={require('../../../assets/images/logo-square.png')}
              alt="Logo"
            />
          </Center>
          <Flex
            flexDirection="column"
            flex={1}
            justifyContent="space-between"
            px={4}
            pt={6}
          >
            <Box>
              <Heading fontSize="xl" mb={2}>
                เข้าสู่ระบบโดยใช้เบอร์โทรศัพท์
              </Heading>

              <Box>
                <Box mb={4}>
                  <InputMobileNumber
                    name="mobileNumber"
                    placeholder="เบอร์โทรศัพท์"
                    control={control}
                    rules={{
                      required: t('กรุณากรอกเบอร์โทรศัพท์'),
                    }}
                    onLocaleChange={handleLocaleChange}
                  ></InputMobileNumber>
                </Box>
                <Button
                  colorScheme="orange"
                  onPress={handleSubmit(handleFormSubmit)}
                  isLoading={loading}
                >
                  ดำเนินการต่อ
                </Button>

                <Text mt={3} fontSize="md" textAlign="center">
                  โดยระบบจะส่ง SMS เพื่อยืนยันในขั้นตอนถัดไป
                </Text>
              </Box>
            </Box>

            <VStack space={4} mb={6}>
              {/* ------------------------ หรือ ---------------------------- */}
              <Flex
                textAlign="center"
                mt={10}
                position="relative"
                justifyContent="center"
                flexDirection="row"
              >
                <Box
                  position="absolute"
                  height="1px"
                  width="100%"
                  backgroundColor="gray.100"
                />
                <Flex
                  position="relative"
                  px={2}
                  backgroundColor="white"
                  marginTop={-3}
                  justifyContent="center"
                  _text={{ textAlign: 'center' }}
                >
                  หรือ
                </Flex>
              </Flex>

              {/* facebook login button */}
              <Box position="relative">
                <Button
                  _text={{ color: 'white' }}
                  backgroundColor="#267DFD"
                  paddingLeft={12}
                  leftIcon={
                    <SharedFontAwesome
                      icon={faFacebook}
                      size={20}
                      color="white"
                    ></SharedFontAwesome>
                  }
                >
                  เข้าสู่ระบบโดยใช้ Facebook
                </Button>
              </Box>
            </VStack>

            <Center>
              <Text>เพิ่งเริ่มใช้ ปลาวาฬ ใช่ไหม</Text>
              <Button variant="link">สมัครสมาชิก</Button>
            </Center>
          </Flex>
        </Box>
      </ScrollView>
    </Scaffold>
  );
}

export default AuthLoginScreen;
