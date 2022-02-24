import React from "react";
import { ErrorMessage, useField } from "formik";

interface Props {
  type: string;
  name: string;
}

export const TextField: React.FC<Props> = ({ ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <div className="form">
        <input
          className="form__input"
          autoComplete="off"
          placeholder=" "
          {...field}
          {...props}
        />
        <label htmlFor={field.name} className="form__label">
          {field.name}
        </label>
      </div>
      <div
        style={{
          height: "25px",
          width: "100%",
          color: "red",
          fontSize: "0.8rem",
          display: "flex",
          alignItems: "center",
          marginBottom: "5px",
        }}
        className="f"
      >
        <ErrorMessage name={field.name} />
      </div>
    </>
  );
};
