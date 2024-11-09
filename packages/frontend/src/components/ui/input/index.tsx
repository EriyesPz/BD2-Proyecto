import { Container, IconContainer, Input } from "./styled";
import { InputProps } from "./types";
import { forwardRef } from "react";

export const InputText = forwardRef<HTMLInputElement, InputProps>(
  ({ icon = true, iconComponent, ...inputProps }, ref) => {
    return (
      <Container>
        {icon && <IconContainer>{iconComponent}</IconContainer>}
        <Input ref={ref} {...inputProps}></Input>
      </Container>
    );
  }
);

InputText.displayName = "InputText";
