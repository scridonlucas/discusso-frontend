import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { FormItemProp } from '../types';

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
  const validateField = (value: FormItemProp['value']): boolean => {
    if (value.length === 0) {
      return false;
    }
    return true;
  };
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      isInvalid={validateField(value)}
    >
      <FormLabel>{labelName}</FormLabel>
      <Input name={name} type={type} value={value} onChange={handleChange} />
      {validateField(value) && <FormErrorMessage>error</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
