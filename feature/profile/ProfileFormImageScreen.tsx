import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
    Box,
    Heading,
    ScrollView,
    Text,
    Button,
    Center,
    Flex,
    ZStack,
    Image,
} from 'native-base';
import Scaffold from 'plawarn-rn/components/Scaffold';
import { useForm } from 'react-hook-form';
import React, { useCallback, useState, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';




function ProfileFormImageScreen() {
    // initialize use react-hook-form hook
    const { handleSubmit } = useForm();

    // initialize use useAsyncStorage
    const { getItem, mergeItem } = useAsyncStorage('User');

    // const [image, setImage] = useState();
    const [image, setImage] = useState<string>("");

    // initialize loading state
    const [loading, setLoading] = useState<boolean>(false);

    // No permissions request is necessary for launching the image library
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            await mergeItem(JSON.stringify(result));
            setImage(result.assets[0].uri);
        } else {
        }
    };

    //handle profile image submit 
    const handleFormSubmit = useCallback(
        async () => {
            try {
                Alert.alert("สร้างโปรไฟล์สำเร็จ");
            } catch (e) {
                // saving error
            } finally {
                setLoading(false);
            }
        },
        []
    );

    //get data from AsyncStorage ('User)
    useEffect(() => {
        async function getValueFromAsyncStorage() {
            try {
                //get uri image from AsyncStorage ('User)
                const value = await getItem();
                const result = value ? JSON.parse(value) : null;
                if (result) {
                    //set value to image state
                    setImage(result.assets[0].uri);
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
                            <Text >รูปภาพโปรไฟล์(ไม่บังคับ)</Text>
                        </Center>
                        <TouchableOpacity onPress={pickImageAsync}>
                            <ZStack pt="60%" alignItems="center" justifyContent="center" >
                                <Box>
                                    {image && <Image source={{ uri: image }} size={150} borderRadius={100} alt="description of image" />}
                                </Box>
                                <Box>
                                    <Image size={160} alt="add profile image" source={
                                        require('../../assets/images/semicircle.png')
                                    } opacity={0.5} />
                                </Box>
                                <Box pt={70}>
                                    <Image size={10} borderRadius={5} alt="add profile image" source={
                                        require('../../assets/images/camera.png')
                                    } />
                                </Box>
                            </ZStack>
                        </TouchableOpacity>
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

export default ProfileFormImageScreen;

