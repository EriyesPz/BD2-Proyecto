import { ButtonContainer } from "./styled";
import { ButtonProps } from "./types";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }) => {
    return <ButtonContainer {...props}>{children}</ButtonContainer>;
  }
);
