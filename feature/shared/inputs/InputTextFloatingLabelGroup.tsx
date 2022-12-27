import { FormControl, IInputProps, Input, Text } from 'native-base';
import React, { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';

const numeral = require('numeral');

type InputTextFloatingLabelGroupProps = {
  name: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  errors: any;
  control: Control<any>;
  rules: any;
  isNumeral?: boolean;
} & IInputProps;

const InputTextFloatingLabelGroup = forwardRef(
  (props: InputTextFloatingLabelGroupProps, ref: any) => {
    const {
      name,
      label,
      placeholder,
      desc,
      leftElement,
      rightElement,
      errors,
      control,
      rules,
      isNumeral,
      ...rest
    } = props;

    return (
      <FormControl isInvalid={name in errors}>
        {label && (
          <Text position="absolute" zIndex={99} px={4} pt={1} fontSize={14} color="gray.500">
            {label}
          </Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              InputLeftElement={leftElement}
              paddingLeft={leftElement ? 2 : 4}
              InputRightElement={rightElement}
              placeholder={placeholder}
              onChangeText={(val) => onChange(isNumeral ? numeral(val).format('0,0') : val)}
              value={value}
              bgColor="white"
              fontSize="xl"
              alignItems="center"
              display="flex"
              pt={5}
              pb={0}
              ref={ref}
              {...rest}
            />
          )}
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
  },
);

export default InputTextFloatingLabelGroup;
