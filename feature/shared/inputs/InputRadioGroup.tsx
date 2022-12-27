import { Box, FormControl, Heading, Input, Modal, Radio } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type InputRadioGroupOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type InputRadioGroupProp = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: InputRadioGroupOption[];
  control: Control<any>;
  rules: any;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  watch: UseFormWatch<any>;
};

function InputRadioGroup({
  name,
  label,
  placeholder,
  description,
  options,
  control,
  rules,
  setValue,
  clearErrors,
  watch,
}: InputRadioGroupProp) {
  const [modalShown, setModalShown] = useState<boolean>(false);
  const [selectedRadio, setSelectedRadio] = useState<InputRadioGroupOption | null>(null);
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>('');

  const openModalHandle = () => {
    Keyboard.dismiss();
    setModalShown(true);
  };

  const radioGroupChangeHandle = (item: string) => {
    setSelectedRadioValue(item);
    const selectedItem = options.find((_item) => _item.value === item);
    if (selectedItem) {
      setSelectedRadio(selectedItem);
    } else {
      setSelectedRadio({ label: item, value: item });
    }
    setValue(name, item);
    clearErrors([name]);
    setModalShown(false);
  };

  const fieldWatch = watch(name);

  useEffect(() => {
    if (fieldWatch) {
      const selectedItem = options.find((_item) => _item.value === fieldWatch);
      if (selectedItem) {
        setSelectedRadio(selectedItem);
      } else {
        setSelectedRadio({ label: fieldWatch, value: fieldWatch });
      }
    }
  }, [fieldWatch]);

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => (
          <FormControl isInvalid={name in errors}>
            {label && <FormControl.Label mb={0}>{label}</FormControl.Label>}
            <TouchableOpacity activeOpacity={0.8} onPress={openModalHandle}>
              <Box pointerEvents="none" position="relative">
                <Input
                  placeholder={placeholder}
                  px={0}
                  value={selectedRadio ? selectedRadio.label : ''}
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
      <Modal
        isOpen={modalShown}
        onClose={() => setModalShown(false)}
        size="lg"
        _backdrop={{
          bg: 'gray.900',
        }}>
        <Modal.Content>
          <Modal.Header borderBottomWidth={0} pb={0}>
            <Heading fontSize="lg">{label}</Heading>
          </Modal.Header>
          <Modal.Body px={4} py={4}>
            <Radio.Group
              name={name}
              value={selectedRadioValue}
              size="lg"
              onChange={radioGroupChangeHandle}>
              {options.map((item, index) => (
                <Radio value={item.value} key={index} size="lg" my={2}>
                  {item.label}
                </Radio>
              ))}
            </Radio.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default InputRadioGroup;
