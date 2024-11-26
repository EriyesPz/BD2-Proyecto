import React, { useState } from "react";
import { DropdownIcon, Option, OptionsList, SelectButton, Wrapper } from "./styled";

interface SelectProps {
  options: string[];
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <Wrapper>
      <SelectButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <DropdownIcon>▼</DropdownIcon>
      </SelectButton>
      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <Option
              key={option}
              selected={option === selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </Option>
          ))}
        </OptionsList>
      )}
    </Wrapper>
  );
};

export { Select };
