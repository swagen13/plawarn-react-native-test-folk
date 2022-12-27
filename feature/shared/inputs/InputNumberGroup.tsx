import { faMinus, faPlus } from '@fortawesome/pro-light-svg-icons';
import { Button, FormControl, HStack, IInputProps, Input } from 'native-base';
import React, { forwardRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import SharedFontAwesome from '../SharedFontAwesome';

type InputNumberGroupProps = {
  name: string;
  label?: string;
  placeholder?: string;
  desc?: string;
  leftElement?: React.ReactNode;
  errors: any;
  control: Control<any>;
  rules: any;
  setValue: (name: any, value: any) => void;
  max?: number;
  min?: number;
} & IInputProps;

const InputNumberGroup = forwardRef(
  (props: InputNumberGroupProps, ref: any) => {
    const {
      name,
      label,
      placeholder,
      desc,
      leftElement,
      errors,
      control,
      rules,
      setValue,
      max,
      min,
      ...rest
    } = props;

    const increasementHandle = (value: number) => {
      const valueFormatted = +value;
      if (max) {
        if (max === valueFormatted) {
          return;
        }
        if (max < valueFormatted) {
          setValue(name, max.toString());
        } else {
          const increase = valueFormatted + 1;
          setValue(name, increase.toString());
        }
      }
    };

    const decreasementHandle = (value: number) => {
      const valueFormatted = +value;
      if (min) {
        if (min === valueFormatted) {
          return;
        }
        if (min > valueFormatted) {
          setValue(name, min.toString());
        } else {
          const decrease = valueFormatted - 1;
          setValue(name, decrease.toString());
        }
      }
    };

    return (
      <FormControl isInvalid={name in errors}>
        {label && (
          <FormControl.Label _text={{ fontSize: 'lg', color: 'gray.500' }}>
            {label}
          </FormControl.Label>
        )}
        <Controller
          control={control}
          render={({ field }) => (
            <HStack width="100%">
              <Button
                bgColor="white"
                variant="outline"
                py={0}
                px={1}
                borderColor="gray.100"
                borderRightWidth={0}
                roundedLeft={6}
                roundedRight={0}
                width="50px"
                onPress={() => decreasementHandle(field.value)}
              >
                <SharedFontAwesome icon={faMinus} size={24} />
              </Button>
              <Input
                flex={1}
                rounded={0}
                textAlign="center"
                keyboardType="number-pad"
                onChangeText={(val) => {
                  let valueFormatted = +val as any;
                  if (max) {
                    if (+val > max) {
                      valueFormatted = max.toString();
                    }
                    field.onChange(valueFormatted);
                  }
                }}
                fontSize={20}
                defaultValue={min ? min.toString() : '1'}
                value={field.value ? field.value.toString() : null}
                {...rest}
              />
              <Button
                bgColor="white"
                variant="outline"
                py={0}
                px={1}
                borderColor="gray.100"
                width="50px"
                roundedRight={6}
                roundedLeft={0}
                borderLeftWidth={0}
                onPress={() => increasementHandle(field.value)}
              >
                <SharedFontAwesome icon={faPlus} size={24} />
              </Button>
            </HStack>
          )}
          name={name}
          rules={rules}
          defaultValue=""
        />
        {desc && <FormControl.HelperText>{desc}</FormControl.HelperText>}
        {errors[name]?.message && (
          <FormControl.ErrorMessage>
            {errors[name]?.message}
          </FormControl.ErrorMessage>
        )}
      </FormControl>
    );
  }
);

export default InputNumberGroup;
