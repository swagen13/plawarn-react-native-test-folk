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
    Flex,
    Input
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import { useForm, useWatch } from 'react-hook-form';
import React, { useCallback, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import InputDatePickerGroup from '../shared/inputs/InputDatepickerGroup';
import InputSelect from '../shared/inputs/InputSelect';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment';




function ProfileFormAgeAndGender() {
    // initialize use useAsyncStorage
    const { getItem, setItem, mergeItem } = useAsyncStorage('User');

     // initialize navigation
    const navigation = useNavigation();

    // initialize use react-hook-form hook
    const { control, handleSubmit, watch, clearErrors, setValue } = useForm();

    // initialize loading state
    const [loading, setLoading] = useState<boolean>(false);

    //handle birthday & gander submit 
    const handleFormSubmit = useCallback(
        async (payload: any) => {
            try {

                //get data from payload
                var date = new Date(payload.date)
                const formattedDate = moment(date).format('MM/DD/YYYY');
                const data = {
                    BirthDay: formattedDate,
                    Gender : payload.gender
                }

                //mergeItem to AsyncStorage ('User)
                await mergeItem(JSON.stringify(data));

                navigation.navigate('ProfileFormImageScreen');
            } catch (e) {
                // saving error
            } finally {
                setLoading(false);
            }
        },
        []
    );
    
    //get data from AsyncStorage
    useEffect(() => {
        async function getValueFromAsyncStorage() {
            try {
                const value = await getItem();
                const result = value ? JSON.parse(value) : null;
                if (result) {
                    //setValue to input form
                    setValue('date', result.BirthDay);
                    setValue('gender', result.Gender);
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
                        <VStack>
                            <InputDatePickerGroup
                                name='date'
                                label='วันเกิด'
                                placeholder='วัน/เดือน/ปี'
                                control={control}
                                rules={{
                                    required: 'This field is required',
                                }}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                watch={watch}
                            ></InputDatePickerGroup>
                            <InputSelect
                                name='gender'
                                label='เพศ'
                                placeholder='เลือกเพศ'
                                labelVisibility={true}
                                options={[
                                    {
                                        label: 'ชาย',
                                        value: 'M',
                                    },
                                    {
                                        label: 'หญิง',
                                        value: 'F',
                                    },
                                ]}
                                control={control}
                                rules={{
                                    required: 'This field is required',
                                }}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                watch={watch}
                            >
                            </InputSelect>

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

export default ProfileFormAgeAndGender;
