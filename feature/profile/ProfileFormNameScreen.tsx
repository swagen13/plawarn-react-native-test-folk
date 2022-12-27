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
  VStack,
  Flex
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import { useForm } from 'react-hook-form';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import InputTextGroup from 'plawarn-rn/feature/shared/inputs/InputTextGroup';
import { AsyncStorage } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


function ProfileFormNameScreen() {

  // initialize use transition hook
  const { getItem } = useAsyncStorage('User');

  // initialize navigation
  const navigation = useNavigation();

  // initialize use react-hook-form hook
  const { control, handleSubmit, watch, setValue } = useForm();

  // initialize loading state
  const [loading, setLoading] = useState<boolean>(false);

  //handle Name submit
  const handleFormSubmit = useCallback(
    async (payload: any) => {
      try {

        //mertItem to AsyncStorage ('User)
        const setData = JSON.stringify(payload)
        await AsyncStorage.mergeItem('User', setData)

        navigation.navigate('ProfileFormAgeAndGenderScreen');
      } catch (e) {
        // saving error
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    async function getValueFromAsyncStorage() {
      try {
        const value = await getItem();
        const result = value ? JSON.parse(value) : null;
        if (result) {
          setValue('Fname', result.Fname);
          setValue('Lname', result.Lname);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getValueFromAsyncStorage();
  }, []);

  return (
    <Scaffold edge={['right']}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <ScrollView contentContainerStyle={{ height: '100%', backgroundColor: "#FAFFFE" }} bounces={false}  >
        <Box height="100%" >
          <Flex
            flexDirection="column"
            flex={1}
            px={4}
            pt={6}
          >
            <Center>
              <Heading fontSize={25} >มาเริ่มสร้างโปรไฟล์กันเถอะ</Heading>
              <Text >ชื่อของคุณ</Text>
            </Center>
            <VStack space={3} mt="5">
              <Text> ชื่อ </Text>
              <InputTextGroup
                name='Fname'
                placeholder='ชื่อ'
                control={control}
                rules={{
                  required: ('กรุณากรอกชื่อ'),
                }}
                watch={watch}
              ></InputTextGroup>
              <Text> นามสกุล </Text>
              <InputTextGroup
                name='Lname'
                // label='นามสกุล'
                placeholder='นามสกุล'
                control={control}
                rules={{
                  required: ('กรุณากรอกนามสกุล'),
                }}
                watch={watch}
              ></InputTextGroup>
            </VStack>
          </Flex>
          <Flex
            px={4}
            py={8}
            justifyContent="flex-end">
            <Button
              colorScheme="orange"
              onPress={handleSubmit(handleFormSubmit)}
              isLoading={loading}
            >
              ดำเนินการต่อ
            </Button>
          </Flex>
        </Box>
      </ScrollView>
    </Scaffold>
  );
}

export default ProfileFormNameScreen;
