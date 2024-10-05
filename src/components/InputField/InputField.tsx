import React, { memo, useId } from "react";
import "./InputField.styles.scss";
import { InputFieldProps, InputType } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type,
  options,
}) => {
  const id = useId();

  return (
    <div className="input-field">
      <label className="input-label" htmlFor={id}>
        {label}
      </label>

      {type === InputType.SELECT && (
        <select
          id={id}
          className="input-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {(type === InputType.TEXT || type === InputType.COLOR) && (
        <input
          id={id}
          className={
            type === InputType.COLOR ? "input-color-picker" : "input-text"
          }
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default memo(InputField);
