export enum ButtonTheme {
  BLUE = "blue",
  RED = "red",
}

export type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  theme?: ButtonTheme;
};
