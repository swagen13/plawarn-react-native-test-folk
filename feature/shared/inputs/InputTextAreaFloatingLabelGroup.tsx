import { FormControl, Text } from 'native-base';
import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

type InputTextAreaFloatingLabelGroupProps = {
  name: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  control: Control<any>;
  rules?: any;
  watch?: UseFormWatch<any>;
  errors: any;
};

function InputTextAreaFloatingLabelGroup({
  name,
  label,
  placeholder,
  desc,
  leftElement,
  rightElement,
  errors,
  control,
  rules,
  watch,
  ...rest
}: InputTextAreaFloatingLabelGroupProps) {
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
          <AutoGrowingTextInput
            placeholder={placeholder}
            placeHolderTextSize={14}
            onChangeText={(val: string) => onChange(val)}
            value={value}
            placeholderTextColor="#A4A4A4"
            style={{
              backgroundColor: 'white',
              paddingTop: 24,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 12,
              fontSize: 20,
              fontFamily: 'NotoSansThaiRegular',
              borderWidth: 1,
              borderColor: name in errors ? '#dc2626' : '#ccd1db',
              borderRadius: 8,
            }}
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
}

export default InputTextAreaFloatingLabelGroup;
