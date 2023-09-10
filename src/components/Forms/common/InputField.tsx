import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { FormItemProp } from '../types';

const InputField = ({
  id,
  isRequired,
  labelName,
  name,
  type,
  value,
  handleChange,
}: FormItemProp) => {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{labelName}</FormLabel>
      <Input name={name} type={type} value={value} onChange={handleChange} />
    </FormControl>
  );
};

export default InputField;
