import { LabelContainer } from "./styled";
import { LabelProps } from "./types";
import { forwardRef } from "react";

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (({ children, ...props }, ref) => {
    return (
        <LabelContainer ref={ref} {...props}>
            { children }
        </LabelContainer>
    )
  })
);
