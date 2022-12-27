import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetHandle,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { Box, FormControl, Heading, HStack, IInputProps, Input, Text } from 'native-base';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { InputSelectOption } from './InputSelect';

type InputSelectFloatingLabelGroupProps = {
  name: string;
  label?: string;
  labelVisibility?: boolean;
  placeholder?: string;
  description?: string;
  options: InputSelectOption[];
  control: Control<any>;
  rules: any;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch?: UseFormWatch<any>;
  errors: any;
};

function InputSelectFloatingLabelGroup({
  name,
  label,
  labelVisibility = true,
  placeholder,
  description,
  options,
  control,
  rules,
  setValue,
  clearErrors,
  errors,
  watch,
}: InputSelectFloatingLabelGroupProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // initialize selected picker
  const [selectedPicker, setSelectedPicker] = useState<InputSelectOption | null>(null);

  // initialize selected picker value
  const [selectedPickerValue, setSelectedPickerValue] = useState<string>('');

  // initialize selected picker index
  const [selectedPickerIndex, setSelectedPickerIndex] = useState<number>(0);

  // initialize boottom sheet modal snappoint
  const snapPoints = useMemo(() => {
    if (Platform.OS === 'ios') {
      return ['40%'];
    } else {
      return ['50%'];
    }
  }, []);

  // open bottom sheet modal
  const openPickerModalHandle = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  // close bottom sheet modal
  const closePickerModalHandle = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  // render bottom sheet modal backdrop
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );

  // ios picker submit handler
  const handlePickerSubmit = useCallback(() => {
    let selectedItem = options.find((_item) => _item.value === selectedPickerValue);

    // if selectedItem is undefined, set selectedPicker using first options
    if (selectedItem === undefined) {
      selectedItem = options[0];
    }

    setSelectedPicker(selectedItem);

    setValue(name, selectedItem.value);
    clearErrors([name]);
    closePickerModalHandle();
  }, [name, selectedPickerValue]);

  // picker submit handle
  const pickerSelectHandle = (value: string) => {
    // log value
    console.log('pickerSelectHandle', value);

    setSelectedPickerValue(value);

    const selectedItem = options.find((_item) => _item.value === value);
    if (selectedItem) {
      setSelectedPicker(selectedItem);
    } else {
      setSelectedPicker({ label: value, value: value });
    }

    setValue(name, value);
    clearErrors([name]);
    closePickerModalHandle();
  };

  const fieldWatch = watch ? watch(name) : null;

  useEffect(() => {
    if (fieldWatch) {
      const selectedItem = options.find((_item) => _item.value === fieldWatch);

      if (selectedItem) {
        setSelectedPicker(selectedItem);
        setSelectedPickerValue(fieldWatch);
      } else {
        setSelectedPicker({ label: fieldWatch, value: fieldWatch });
        setSelectedPickerValue(fieldWatch);
      }
    }
  }, [fieldWatch, options]);

  // log selectedIndex
  useEffect(() => {
    console.log(`selectedPickerIndex ${name}`, selectedPickerIndex);
  }, [selectedPickerIndex]);

  // handleBottomSheetChange
  const handleBottomSheetChange = useCallback(
    (_index: number) => {
      // log bottom sheet change _index
      console.log(`handleBottomSheetChange ${name}`, _index);

      if (selectedPicker && _index > -1) {
        // get index of selectedPicker in options
        const _selectedPickerIndex = options.findIndex(
          (_item) => _item.value === selectedPicker.value,
        );

        // set selectedPicker index
        setSelectedPickerIndex(_selectedPickerIndex);
      }
    },
    [setSelectedPickerIndex, selectedPicker],
  );

  const renderFlatListItem = useCallback(
    ({ item }: { item: any }) => (
      <Box px={2}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#eee"
          style={{ borderRadius: 4 }}
          onPress={() => pickerSelectHandle(item.value)}>
          <Box
            px={4}
            py={3}
            backgroundColor={item.value === selectedPickerValue ? '#eee' : 'transparent'}
            borderRadius="4px">
            <Text>{item.label}</Text>
          </Box>
        </TouchableHighlight>
      </Box>
    ),
    [selectedPickerValue],
  );

  return (
    <FormControl isInvalid={name in errors}>
      {label && (
        <Text position="absolute" zIndex={99} px={4} pt={1} fontSize={14} color="gray.500">
          {label}
        </Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <FormControl isInvalid={name in errors}>
            <TouchableOpacity activeOpacity={0.8} onPress={openPickerModalHandle}>
              <Box pointerEvents="none" position="relative">
                <Input
                  pt={5}
                  pb={0}
                  bg="white"
                  placeholder={placeholder}
                  value={selectedPicker ? selectedPicker.label : ''}
                />
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
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose={Platform.OS === 'ios' ? false : false}
        backdropComponent={renderBackdrop}
        onChange={handleBottomSheetChange}
        handleComponent={(props) => {
          return Platform.OS === 'ios' ? (
            <HStack
              alignItems="center"
              justifyContent="space-between"
              py={4}
              px={4}
              borderBottomWidth={2}
              borderBottomColor="#eee">
              <Box>
                <TouchableOpacity activeOpacity={0.8} onPress={closePickerModalHandle}>
                  <Text>ยกเลิก</Text>
                </TouchableOpacity>
              </Box>
              <Box>
                <TouchableOpacity activeOpacity={0.8} onPress={handlePickerSubmit}>
                  <Text color="primary.500">ตกลง</Text>
                </TouchableOpacity>
              </Box>
            </HStack>
          ) : (
            <Box>
              <BottomSheetHandle {...props}>
                <Heading px={3} pt={1}>
                  {label}
                </Heading>
              </BottomSheetHandle>
            </Box>
          );
        }}>
        {Platform.OS === 'ios' ? (
          <Picker
            selectedValue={selectedPickerValue}
            onValueChange={(itemValue) => setSelectedPickerValue(itemValue)}>
            {options.map((item, index) => (
              <Picker.Item label={item.label} key={index} value={item.value} />
            ))}
          </Picker>
        ) : (
          <BottomSheetFlatList
            data={options}
            keyExtractor={(i: any) => i.value}
            initialScrollIndex={selectedPickerIndex > 0 ? selectedPickerIndex : 0}
            renderItem={renderFlatListItem}
          />
        )}
      </BottomSheetModal>

      {description && <FormControl.HelperText>{description}</FormControl.HelperText>}
      {errors[name]?.message && (
        <FormControl.ErrorMessage>{errors[name]?.message}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}

export default InputSelectFloatingLabelGroup;
