import React from "react";
import { Input, Wrapper } from "./styled";

interface InputDateProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}

const InputDate: React.FC<InputDateProps> = ({ value, onChange, placeholder = "mm/dd/yyyy" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Wrapper>
      <Input
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export { InputDate };
