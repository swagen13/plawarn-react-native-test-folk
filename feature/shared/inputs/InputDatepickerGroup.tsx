import dayjs from 'dayjs';
import { Box, FormControl, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AsyncStorage } from 'react-native';


type InputDatePickerGroupProp = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  rules: any;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
};

function InputDatePickerGroup({
  name,
  label,
  placeholder,
  description,
  control,
  rules,
  setValue,
  clearErrors,
  watch,
}: InputDatePickerGroupProp) {
  const [datePickerShown, setDatePickerShown] = useState<boolean>(false);
  const [selectedDateValue, setSelectedDateValue] = useState<string>('');


  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerShown(true);
  };

  const hideDatePickerHandle = () => {
    setDatePickerShown(false);
  };

  const datePickerSelectedHandle = (date: Date) => {    
    setSelectedDateValue(date.toISOString());
    setValue(name, date.toISOString());
    clearErrors([name]);
    hideDatePickerHandle();
  };

  const fieldWatch = watch(name);

  useEffect(() => {
    if (fieldWatch) {
      setSelectedDateValue(fieldWatch);
    }
  }, [fieldWatch]);

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <FormControl isInvalid={name in errors}>
            {label && <FormControl.Label mb={0}>{label}</FormControl.Label>}
            <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
              <Box pointerEvents="none" position="relative">
                <Input
                  bg="white"
                  placeholder={placeholder}
                  pl={3}
                  value={
                    selectedDateValue
                      ? dayjs(selectedDateValue).format('D MMM YYYY')
                      : ''
                  }
                />
              </Box>
            </TouchableOpacity>
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
      <DateTimePickerModal
        isVisible={datePickerShown}
        mode="date"
        display={Platform.OS === 'ios' ? 'default' : 'spinner'}
        onConfirm={datePickerSelectedHandle}
        onCancel={hideDatePickerHandle}
        locale="th-TH"
        neutralButtonLabel="clear"
        cancelTextIOS="ยกเลิก"
        confirmTextIOS="ตกลง"
      />
    </>
  );
}

export default InputDatePickerGroup;
