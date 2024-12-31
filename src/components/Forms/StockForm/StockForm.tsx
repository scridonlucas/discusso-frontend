import { Button, HStack, Input, Stack } from '@chakra-ui/react';
import { useAddStockToFavorites } from '../../../hooks/useStock';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import validationSchema from './validationSchema';

const StockForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{ ticker: string }>();

  const addStock = useAddStockToFavorites();
  const onSubmit: SubmitHandler<{ ticker: string }> = (data) => {
    addStock.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Stack maxW={'sm'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4}>
          <FormControl id="ticker" isInvalid={!!errors.ticker}>
            <Input
              placeholder="Stock Symbol"
              size="md"
              {...register('ticker', validationSchema.ticker)}
            />
            <FormErrorMessage>
              {errors.ticker && errors.ticker.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            isLoading={addStock.isLoading}
            w={'80%'}
          >
            Add to Favorites
          </Button>
        </HStack>
      </form>
    </Stack>
  );
};

export default StockForm;
