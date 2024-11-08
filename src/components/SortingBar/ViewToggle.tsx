import { ButtonGroup, Button } from '@chakra-ui/react';

interface ViewToggleProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const handleChangeToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onChange(e.currentTarget.value);
  };

  return (
    <ButtonGroup isAttached variant="ghost">
      {options.map((option) => (
        <Button
          key={option.value}
          value={option.value}
          onClick={handleChangeToggle}
          isActive={selectedValue === option.value}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ViewToggle;
