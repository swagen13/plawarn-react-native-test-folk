import { faCheck } from '@fortawesome/pro-regular-svg-icons';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  IInputProps,
  Input,
  Modal,
  Text,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SharedFontAwesome from '../SharedFontAwesome';

export interface ILocaleOption {
  label: string;
  code: string;
  value: string;
  image: any;
}

type InputTextGroupProp = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  rules: any;
  watch?: UseFormWatch<any>;
  onLocaleChange: (locale: ILocaleOption) => void;
};

function InputMobileNumber({
  name,
  label,
  placeholder,
  description,
  control,
  rules,
  watch,
  onLocaleChange,
  ...rest
}: InputTextGroupProp & IInputProps) {
  // initialize use transition hook
  const { t, i18n } = useTranslation();

  // initialize modal visibility state
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [localeList] = useState<ILocaleOption[]>([
    {
      label: 'ไทย',
      code: 'th',
      value: '+66',
      image: require('../../../assets/images/flags/th.png'),
    },
    {
      label: 'ลาว',
      code: 'la',
      value: '+856',
      image: require('../../../assets/images/flags/la.png'),
    },
    {
      label: 'พม่า',
      code: 'mm',
      value: '+95',
      image: require('../../../assets/images/flags/mm.png'),
    },
    {
      label: 'กัมพูชา',
      code: 'kh',
      value: '+855',
      image: require('../../../assets/images/flags/kh.png'),
    },
    {
      label: 'เวียดนาม',
      code: 'vn',
      value: '+84',
      image: require('../../../assets/images/flags/vn.png'),
    },
    {
      label: 'มาเลเซีย',
      code: 'my',
      value: '+60',
      image: require('../../../assets/images/flags/my.png'),
    },
    {
      label: 'มาเลย',
      code: '',
      value: '+60',
      image: require('../../../assets/images/flags/my.png'),
    },
  ]);

  // initialize locale selected state
  const [localeSelected, setLocaleSelected] = useState<ILocaleOption>(
    localeList[0]
  );
  

  useEffect(() => {
    // find current language
    const _localeSelected = localeList.find(
      (item) => item.code === i18n.language
    );       

    // if current language is found, set it
    // else set default language by index 0
    if (_localeSelected) {      
      setLocaleSelected(_localeSelected);
    } else {
      setLocaleSelected(localeList[0]);
    }

  }, [localeList, i18n.language]);

  // listen localeSelected change
  useEffect(() => {
    // call onLocaleChange callback
    onLocaleChange(localeSelected);
  }, [localeSelected, onLocaleChange]);

  // handle locale list item selected
  const handleLocaleSelected = useCallback(
    (item: ILocaleOption) => {
      setLocaleSelected(item);
      setModalVisible(false);
    },
    [setLocaleSelected, setModalVisible]
  );

  return (
    <Box>
      <Controller
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <FormControl isInvalid={name in errors}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <HStack>
              <Button
                backgroundColor="white"
                borderWidth="1px"
                borderColor="gray.100"
                borderRightWidth={0}
                borderRightRadius={0}
                _text={{ color: 'gray.600' }}
                onPress={() => setModalVisible(true)}
              >
                <HStack flexDirection="row" alignItems="center" space={1}>
                  <Image
                    style={{ width: 22, height: 22 }}
                    source={localeSelected.image}
                  />
                  <Text>{localeSelected.value}</Text>
                </HStack>
              </Button>
              <Box flex={1}>
                <Input
                  {...rest}
                  placeholder={placeholder}
                  onChangeText={(val) => onChange(val)}
                  value={value}
                  borderTopLeftRadius="none"
                  borderBottomLeftRadius="none"
                />
              </Box>
            </HStack>
            {description && (
              <FormControl.HelperText>{description}</FormControl.HelperText>
            )}
            {errors[name]?.message && (
              <FormControl.ErrorMessage>
                {errors[name]?.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name={name}
        rules={rules}
      />

      <Modal
        isOpen={modalVisible}
        closeOnOverlayClick={true}
        onClose={() => setModalVisible(false)}
      >
        <Modal.Content bg="white">
          <Modal.Header mb={0}>
            <Heading fontSize="2xl">ประเทศ</Heading>
          </Modal.Header>
          <Modal.Body px={0}>
            {localeList.map((item, index) => (
              <Box
                key={index}
                px={4}
                backgroundColor={
                  localeSelected.code === item.code ? 'gray.50' : 'white'
                }
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleLocaleSelected(item)}
                >
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    py={3}
                  >
                    <HStack alignItems="center" space={3}>
                      <Image
                        source={item.image}
                        style={{ width: 28, height: 28 }}
                      />
                      <Text>{item.label}</Text>
                    </HStack>
                    <Center
                      width={6}
                      height={6}
                      backgroundColor={
                        localeSelected.code === item.code
                          ? 'green.500'
                          : 'gray.100'
                      }
                      borderRadius="full"
                    >
                      <SharedFontAwesome
                        icon={faCheck}
                        color="white"
                        size={14}
                      />
                    </Center>
                  </HStack>
                </TouchableOpacity>
              </Box>
            ))}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

export default InputMobileNumber;
