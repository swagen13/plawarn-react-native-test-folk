import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
    Box,
    Heading,
    ScrollView,
    Text,
    Button,
    Center,
    VStack,
    Flex,
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import { useForm } from 'react-hook-form';
import React, { useCallback, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import InputSelect from '../../shared/inputs/InputSelect';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import moment from 'moment';






function ProfileFormAgeAndGender() {

    // initialize date state
    const [days, setDays] = useState<{ label: string; value: string; }[]>([])
    const [months, setMonths] = useState<{ label: string; value: string; }[]>([])
    const [years, setYears] = useState<{ label: string; value: string; }[]>([])

    // initialize navigation
    const navigation = useNavigation();

    // initialize use react-hook-form hook
    const { control, handleSubmit, watch, clearErrors, setValue } = useForm();

    // initialize loading state
    const [loading, setLoading] = useState<boolean>(false);

    //set date to state
    function setDatetoState() {
        //set day to state
        let dayArray = [];
        for (let i = 1; i < 32; i++) {
            const newItem = { label: `${i}`, value: `${i}` };
            dayArray.push(newItem);
        }
        setDays(dayArray);

        //set month to state
        let monthArray = [];
        let currentDate = moment().startOf('year');
        for (let i = 0; i < 12; i++) {
            const newItem = { label: `${currentDate.format('MMMM')}`, value: `${currentDate.format('MM')}` };
            monthArray.push(newItem);
            currentDate = currentDate.add(1, 'month');
        }
        setMonths(monthArray);

        //set year to state
        let yearArray = [];
        let currentYear = moment().format('YYYY');
        let startYear = parseInt(currentYear) - 100;
        for (let i = parseInt(currentYear); i > startYear; i--) {
            const newItem = { label: `${i}`, value: `${i}` };
            yearArray.push(newItem);
        }
        setYears(yearArray);
    }


    //handle birthday & gander submit 
    const handleFormSubmit = useCallback(

        async (payload: any) => {
            // initialize use mergeItem from useAsyncStorage
            const { mergeItem } = useAsyncStorage('User');

            try {

                //get data from payload
                var date = new Date(payload.date)
                const formattedDate = moment(date).format('MM/DD/YYYY');
                const data = {
                    BDay: payload.day,
                    BMonth: payload.month,
                    BYear: payload.year,
                    Gender: payload.gender
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
            // initialize use getItems from useAsyncStorage
            const { getItem } = useAsyncStorage('User');
            try {
                const value = await getItem();
                const result = value ? JSON.parse(value) : null;
                if (result) {
                    // setValue to input form
                    setValue('day', result.BDay);
                    setValue('month', result.BMonth);
                    setValue('year', result.BYear);
                    setValue('gender', result.Gender);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getValueFromAsyncStorage()
        setDatetoState()
    }, []);


    return (
        <Scaffold edge={['top']}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <ScrollView contentContainerStyle={{ height: '100%', backgroundColor: "#FAFFFE" }} bounces={false}  >
                <Box height="100%" >
                    <Center>
                        <Heading fontSize={25} >มาเริ่มสร้างโปรไฟล์กันเถอะ</Heading>
                        <Text >วันเกิดและเพศ</Text>
                    </Center>
                    <Flex
                        flexDirection="column"
                        flex={1}
                        px={4}
                        pt={4}>
                        <VStack space={3} mt={5}>
                            <Box
                                justifyContent="space-between"
                                flexDirection={'row'}
                            >
                                <Box width={20}>
                                    <Text>วันเกิด</Text>
                                    <InputSelect
                                        name='day'
                                        placeholder='วัน'
                                        options={days}
                                        control={control}
                                        rules={{
                                            required: '*',
                                        }}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        watch={watch}
                                    />
                                </Box>
                                <Box width={150}>
                                    <Text> </Text>
                                    <InputSelect                                    
                                        name='month'
                                        placeholder='เดือน'
                                        options={months}
                                        control={control}
                                        rules={{
                                            required: '*',
                                        }}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        watch={watch}
                                    />
                                </Box>
                                <Box width={100}>
                                    <Text> </Text>
                                    <InputSelect
                                        name='year'
                                        placeholder='ปี'
                                        options={years}
                                        control={control}
                                        rules={{
                                            required: '*',
                                        }}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        watch={watch}
                                    // description="* กรุณาเลือกเพศของคุณ"
                                    />
                                </Box>
                            </Box>
                            <Box mt={3}>
                                <Text>เพศ</Text>
                                <InputSelect
                                    name='gender'
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
                                        required: 'กรุณาเลือกเพศของคุณ',
                                    }}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                    watch={watch}
                                />
                            </Box>
                        </VStack>
                    </Flex>
                    <Flex
                        px={4}
                        py={8}
                        justifyContent={"flex-end"}
                    >
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
