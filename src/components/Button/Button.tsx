import React from "react";
import "./Button.styles.scss";
import { ButtonProps, ButtonTheme } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  disabled,
  theme = ButtonTheme.BLUE,
}) => {
  return (
    <button
      className={`button button--${theme}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
