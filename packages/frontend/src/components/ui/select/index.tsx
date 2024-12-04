import { useState, forwardRef, useImperativeHandle } from "react";
import { DropdownIcon, Option, OptionsList, SelectButton, Wrapper } from "./styled";
import { ReactNode } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
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

const Select = forwardRef<SelectRef, SelectProps>(
  ({ options, onChange, placeholder = "Seleccionar opcion" }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

    const handleOptionClick = (option: SelectOption) => {
      setSelectedOption(option);
      setIsOpen(false);
      if (onChange) onChange(option.value);
    };

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }));

    return (
      <Wrapper>
        <SelectButton onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption.label : placeholder}
          <DropdownIcon>▼</DropdownIcon>
        </SelectButton>
        {isOpen && (
          <OptionsList>
            {options.map((option) => (
              <Option
                key={option.value}
                selected={selectedOption?.value === option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </Option>
            ))}
          </OptionsList>
        )}
      </Wrapper>
    );
  }
);

Select.displayName = "Select";

export { Select };
