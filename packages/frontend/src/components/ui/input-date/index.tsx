import React, { useState } from "react";
import { IconoCalendario, Input, Wrapper } from "./styled";

interface InputDateProps {
  placeholder?: string;
  onChange?: (date: string) => void;
}

const InputDate: React.FC<InputDateProps> = ({ placeholder = "mm/dd/yyyy", onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <Wrapper>
      <Input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <IconoCalendario></IconoCalendario>
    </Wrapper>
  );
};

export { InputDate };
