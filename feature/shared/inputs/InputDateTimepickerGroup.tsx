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

type InputDateTimepickerGroupProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  rules?: any;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
  mode: string;
};

function InputDateTimepickerGroup({
  name,
  label,
  placeholder,
  description,
  control,
  rules,
  setValue,
  clearErrors,
  watch,
  mode,
}: InputDateTimepickerGroupProps) {
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
            {label && (
              <FormControl.Label mb={0} _text={{ fontFamily: 'NotoSansThaiRegular' }}>
                {label}
              </FormControl.Label>
            )}
            <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
              <Box pointerEvents="none" position="relative">
                {mode === 'date' ? (
                  <Input
                    placeholder={placeholder}
                    px={0}
                    value={selectedDateValue ? dayjs(selectedDateValue).format('D MMM YYYY') : ''}
                  />
                ) : (
                  <Input
                    placeholder={placeholder}
                    pl={2}
                    value={selectedDateValue ? dayjs(selectedDateValue).format('HH:mm') : ''}
                    bgColor="white"
                  />
                )}
              </Box>
            </TouchableOpacity>
            {description && <FormControl.HelperText>{description}</FormControl.HelperText>}
            {errors[name]?.message && (
              <FormControl.ErrorMessage>{errors[name]?.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name={name}
        rules={rules}
      />
      {mode === 'date' ? (
        <DateTimePickerModal
          isVisible={datePickerShown}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
          onConfirm={datePickerSelectedHandle}
          onCancel={hideDatePickerHandle}
          locale="th-TH"
          cancelTextIOS="ยกเลิก"
          confirmTextIOS="ตกลง"
          minimumDate={new Date()}
        />
      ) : (
        <DateTimePickerModal
          isVisible={datePickerShown}
          mode="time"
          display="spinner"
          onConfirm={datePickerSelectedHandle}
          onCancel={hideDatePickerHandle}
          locale="th-TH"
          neutralButtonLabel="clear"
          cancelTextIOS="ยกเลิก"
          confirmTextIOS="ตกลง"
          is24Hour
        />
      )}
    </>
  );
}

export default InputDateTimepickerGroup;
