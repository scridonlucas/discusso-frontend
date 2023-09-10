export interface FormItemProp {
  id: string;
  isRequired: boolean;
  labelName: string;
  name: string;
  type: string;
  value: string;
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
