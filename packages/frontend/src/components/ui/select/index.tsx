import { useState, forwardRef, useImperativeHandle } from "react";
import { DropdownIcon, Option, OptionsList, SelectButton, Wrapper } from "./styled";
import { ReactNode } from "react";

export interface SelectProps extends React.HTMLAttributes<HTMLInputElement> {
  options: string[];
  onChange?: (value: string) => void;
  icon?: boolean;
  iconComponent?: ReactNode;
  placeholder?: string;
}

export interface SelectRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Select = forwardRef<SelectRef, SelectProps>(({ options, onChange }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  // Expose methods to control the dropdown via ref
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  }));

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
});

Select.displayName = "Select"; // Necesario para forwardRef

export { Select };
