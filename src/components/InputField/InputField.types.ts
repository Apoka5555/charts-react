export type SelectOption = {
  label: string;
  value: string | number;
};

export enum InputType {
  TEXT = "text",
  SELECT = "select",
  COLOR = "color",
}

export type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type: InputType;
  options?: SelectOption[];
};
