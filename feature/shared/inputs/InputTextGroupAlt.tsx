import { FormControl, IInputProps, Input } from 'native-base';
import React, { forwardRef } from 'react';
import { Control, Controller, UseFormSetError } from 'react-hook-form';

const numeral = require('numeral');

type InputTextGroupAlt = {
  name: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  control: Control<any>;
  rules: any;
  errors: any;
  InputLeftElement?: React.ReactNode;
  InputRightElement?: React.ReactNode;
  isNumeral?: boolean;
  fontSize?: string;
  shadow?: number;
} & IInputProps;

const InputTextGroupAlt = forwardRef((props: InputTextGroupAlt, ref: any) => {
  const {
    name,
    label,
    placeholder,
    desc,
    InputLeftElement,
    InputRightElement,
    errors,
    control,
    rules,
    isNumeral,
    fontSize = 'xl',
    shadow = 1,
    ...rest
  } = props;

  return (
    <FormControl
      isInvalid={name in errors}
      backgroundColor="white"
      px={4}
      py={4}
      shadow={shadow}
      borderRadius="lg">
      {label && (
        <FormControl.Label _text={{ color: 'blueGray.500' }} mb={1}>
          {label}
        </FormControl.Label>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Input
              InputLeftElement={InputLeftElement}
              paddingLeft={InputLeftElement ? 2 : 4}
              InputRightElement={InputRightElement}
              placeholder={placeholder}
              onChangeText={(val) => onChange(isNumeral ? numeral(val).format('0,0') : val)}
              value={value}
              variant="unstyled"
              px={0}
              py={0}
              height="auto"
              fontSize={fontSize}
              fontFamily="NotoSansThaiSemiBold"
              color="blueGray.500"
              // _textStyle={{
              //   color: 'blueGray.500',
              // }}
              ref={ref}
              {...rest}
            />
          );
        }}
        name={name}
        rules={rules}
        defaultValue=""
      />
      {desc && <FormControl.HelperText>{desc}</FormControl.HelperText>}
      {errors[name]?.message && (
        <FormControl.ErrorMessage>{errors[name]?.message}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
});

export default InputTextGroupAlt;
