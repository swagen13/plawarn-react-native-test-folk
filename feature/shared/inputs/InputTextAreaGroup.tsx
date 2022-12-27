import { FormControl } from 'native-base';
import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

type InputTextAreaGroupProp = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  rules: any;
  watch?: UseFormWatch<any>;
};

function InputTextAreaGroup({
  name,
  label,
  placeholder,
  description,
  control,
  rules,
  watch,
}: InputTextAreaGroupProp) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <FormControl isInvalid={name in errors}>
          {label && <FormControl.Label mb={0}>{label}</FormControl.Label>}
          <AutoGrowingTextInput
            placeholder={placeholder}
            onChangeText={(val: string) => onChange(val)}
            value={value}
            placeholderTextColor="#A4A4A4"
            style={{
              backgroundColor: 'white',
              paddingTop: 8,
              paddingLeft: 0,
              paddingRight: 0,
              paddingBottom: 8,
              fontSize: 20,
              fontFamily: 'NotoSansThaiRegular',
              borderBottomWidth: 1,
              borderColor: name in errors ? '#dc2626' : '#e5e5e5',
              borderRadius: 0,
            }}
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

export default InputTextAreaGroup;
