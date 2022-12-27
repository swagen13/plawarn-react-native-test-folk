import { HStack, Input } from 'native-base';
import React, { useEffect, useState } from 'react';

type AuthOtpInputProps = {
  inputCount?: number;
  inputLength?: number;
  defaultValue?: string;
  onChange: (text: string) => void;
};

const AuthOtpInput = React.forwardRef(
  (
    {
      inputCount = 4,
      inputLength = 1,
      defaultValue = '',
      onChange,
    }: AuthOtpInputProps,
    ref
  ) => {
    const [otpValue, setOtpValue] = useState<RegExpMatchArray | any>([]);
    const [focusedInput, setFocusedInput] = useState(0);

    let inputs: any = [];

    useEffect(() => {
      const otpText =
        defaultValue.match(new RegExp('.{1,' + inputLength + '}', 'g')) || [];

      const newOtpText = otpText.slice(0, inputCount);

      setOtpValue(newOtpText);
    }, [inputCount, inputLength, defaultValue]);

    const basicValidation = (text: string) => {
      const validText = /^[0-9]+$/;
      return text.match(validText);
    };

    const textChangeHandle = (text: string, i: number) => {
      console.log('text1', text, i);

      if (text && !basicValidation(text)) {
        return;
      }

      console.log('text2', text);

      otpValue[i] = text;

      setOtpValue([...otpValue]);
      onChange(otpValue.join(''));

      if (text.length === inputLength && i !== inputCount - 1) {
        inputs[i + 1].focus();
      }
    };

    const inputFocusHandle = (i: number) => {
      const prevIndex = i - 1;

      if (prevIndex > -1 && !otpValue[prevIndex] && !otpValue.join('')) {
        inputs[prevIndex].focus();
        return;
      }

      setFocusedInput(i);
    };

    const keyPressHandle = (e: any, i: number) => {
      const val = otpValue[i] || '';

      if (e.nativeEvent.key === 'Backspace' && i !== 0 && !val.length) {
        inputs[i - 1].focus();
      }
    };

    useEffect(() => {
      if (defaultValue === '') {
        setOtpValue([]);
        onChange('');

        if (inputs.length > 0) {
          inputs[0].focus();
        }
      }
    }, [defaultValue]);

    const render = () => {
      const Inputs = [];

      for (let i = 0; i < inputCount; i += 1) {
        Inputs.push(
          <Input
            ref={(e) => {
              inputs.push(e);
            }}
            width="60px"
            height="60px"
            fontSize="xl"
            textAlign="center"
            key={i}
            autoCorrect={false}
            keyboardType="number-pad"
            autoFocus={false}
            backgroundColor="white"
            value={otpValue[i] || ''}
            maxLength={inputLength}
            onFocus={() => inputFocusHandle(i)}
            onChangeText={(text) => textChangeHandle(text, i)}
            multiline={false}
            variant="underlined"
            onKeyPress={(e) => keyPressHandle(e, i)}
          />
        );
      }

      return Inputs;
    };

    return <HStack space={2}>{render()}</HStack>;
  }
);

export default AuthOtpInput;
