import { FormControl, IInputProps, Input } from 'native-base';
import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';

type InputTextGroupProp = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  rules: any;
  watch?: UseFormWatch<any>;
};

function InputTextGroup({
  name,
  label,
  placeholder,
  description,
  control,
  rules,
  watch,
  ...rest
}: InputTextGroupProp & IInputProps) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <FormControl isInvalid={name in errors}>
          {label && <FormControl.Label mb={0}>{label}</FormControl.Label>}
          <Input
            {...rest}
            bg="white"
            placeholder={placeholder}
            onChangeText={(val) => onChange(val)}
            value={value}
          />
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
  );
}

export default InputTextGroup;
