import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FormItemProp } from '../types';
import { useState } from 'react';

const InputField = ({
  id,
  isRequired,
  labelName,
  name,
  type,
  value,
  errorMessage,
  handleChange,
}: FormItemProp) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      onBlur={handleFocus}
      isInvalid={focused && errorMessage !== ''}
    >
      <FormLabel>{labelName}</FormLabel>
      <Input name={name} type={type} value={value} onChange={handleChange} />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
